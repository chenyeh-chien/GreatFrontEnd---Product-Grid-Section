import { useState, useEffect, useReducer } from "react";
import { v4 as uuidv4 } from 'uuid';
import type { FilterOptions } from "./Filter/Filter Main/filterMain.ts";
import type { 
  QueryObject,
  EcommerceProductData,
  EcommerceFilterData,
  EcommerceProductItem
} from "./types";
import { 
  toQueryParams, 
  toQueryString, 
  fetchEcommerceProductData,
  fetchEcommerceCategories,
  fetchEcommerceCollections,
  fetchEcommerceInventory,
  fetchEcommerceProductByID
} from "./utilFunctions";

export function useProductInfo(queryObj?: QueryObject) {
  const [productInfo, setProductInfo] = 
    useState<EcommerceProductData | null>(null);

  useEffect(() => {
    let isCanceled = false;

    try {
      const fetchProductInfo = async () => {
        let queryStr: string | undefined;

        if (queryObj) {
          queryStr = toQueryString(toQueryParams(queryObj));
        }
        
        setProductInfo(await fetchEcommerceProductData(queryStr));
      }

      fetchProductInfo();
    } catch(error) {
      if (!isCanceled) {
        throw error;
      } 
    }

    return () => {
      isCanceled = true;
    }
  }, [queryObj])

  return [productInfo];
}

export function useProductDetails(productID: string | null) {
  const [productDetails, setProductDetails] = 
    useState<EcommerceProductItem | null>(null);

  useEffect(() => {
    let isCanceled = false;

    try {
      const fetchProductDetails = async () => {
        if (productID === null) {
          return;
        }

        setProductDetails(await fetchEcommerceProductByID(productID));
      }

      fetchProductDetails();
    } catch(error) {
      if (!isCanceled) {
        throw error;
      } 
    }

    return () => {
      isCanceled = true;
    }
  }, [productID])

  return productDetails;
}

export function useFilterData() {
  const [filterData, setFilterData] = useState<EcommerceFilterData | null>(null);

  useEffect(() => {
    let isCanceled = false;

    try {
      const fetchFilterData = async () => {
        const [collections, categories, inventory] = await Promise.all([
          fetchEcommerceCollections(),
          fetchEcommerceCategories(),          
          fetchEcommerceInventory(),
        ])

        setFilterData({ collections, categories, inventory })
      }
      
      fetchFilterData();
    } catch (error) {
      if (!isCanceled) {
        throw error;
      } 
    }
    
    return () => {
      isCanceled = true;
    }
  }, []);

  return [filterData]
}

export function useFilterOptions(): [FilterOptions | null, (options: FilterOptions) => void] {
  const [filterData] = useFilterData();
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);

  useEffect(() => {
    let isCanceled = false;

    try {
      if (filterData !== null) {
        const collections = filterData.collections.data.map(item => {
          return {
            id: item.collection_id,
            name: item.name,
            selected: false,
          }
        });
        const category = filterData.categories.data.map(item => {
          return {
            id: item.category_id,
            name: item.name,
            selected: false, 
          }
        });
        const colors = 
          Array.from(new Set(filterData.inventory.map(item => item.color)))
            .map(color => {
              return {
                id: uuidv4(),
                color: color,
                selected: false,
              }
            })
        const rating = Array.from({ length: 5 }).map((_, index) => {
          return {
            id: uuidv4(),
            totalStar: 5,
            currStar: 5 - index,
            selected: false,
          }
        })

        setFilterOptions({
          collections,
          category,
          colors,
          rating,
        })
      }
    } catch (error) {
      if (!isCanceled) {
        throw error;
      } 
    }
    
    return () => {
      isCanceled = true;
    }
  }, [filterData]);

  return [filterOptions, setFilterOptions];
}

export function useOverflowHidden(element: HTMLElement): 
  [boolean, (offset: boolean) => void] {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (hidden) {
      element.classList.add("overflow-hidden");
    } else {
      element.classList.remove("overflow-hidden");
    }
  
    function handleWindowResize(event: UIEvent) {
      event.preventDefault();
    
      if (hidden) {
      setHidden(false);
      }
    }
  
    window.addEventListener('resize', handleWindowResize);
  
    return () => {
      element.classList.remove("overflow-hidden");
      window.removeEventListener('resize', handleWindowResize);
    }
  }, [element, hidden, setHidden]);

  return [hidden, setHidden]
}

export function useSortOption(): 
  [QueryObject, (action: { type: string }) => void]  {
  const [state, dispatch] = useReducer(reducer, { sort: ["created"] });

  function reducer(_state: QueryObject, action: { type: string }) {
    switch (action.type) {
      case "Newest": 
        return { sort: ["created"], direction: [] }
      case "Best rating": 
        return { sort: ["rating"], direction: [] }
      case "Most popular": 
        return { sort: ["popularity"], direction: [] }
      case "Price: Low to high": 
        return { sort: ["price"], direction: ["asc"] }
      case "Price: High to low": 
        return { sort: ["price"], direction: [] }
      default: 
        throw Error(`Unknown type: ${action.type}`);
    }
  }

  return [state, dispatch];
}

export function useEscape(
  setIsOpen: (offset: React.SetStateAction<boolean>) => void
) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    }
  }, [setIsOpen])
}

export function useClickOutside(
  setIsOpen: (offset: React.SetStateAction<boolean>) => void,
  ref: React.RefObject<HTMLElement | null>
) {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [setIsOpen, ref])
}