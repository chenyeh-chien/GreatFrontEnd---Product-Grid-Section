import { useEffect, useState, useMemo } from "react";
import { clsx } from 'clsx';
import { 
  useProductInfo,
  useFilterOptions,
  useOverflowHidden,
  useSortOption
} from "../../components/utils/hooks";
import type { FilterOptions } from "../../components/utils/Filter/Filter Main/filterMain.ts";
import type { DropdownInfo } from "../../components/utils/Dropdown/dropdown.ts";
import type { 
  QueryObject,
} from "../../components/utils/types";
import { RiFilterLine } from "react-icons/ri";
import { RiTShirt2Line } from "react-icons/ri";
import FilterMain from "../../components/utils/Filter/Filter Main/FilterMain.tsx";
import BaseButton from "../../components/utils/Button/BaseButton";
import Dropdown from "../../components/utils/Dropdown/Dropdown.tsx";
import ProductCard from "../../components/utils/Card/Product Card/ProductCard";
import Fallback from "../../components/utils/Fallback/Fallback.tsx";

const initialSortOptions = [{
  id: "1",
  text: "Newest",
  selected: true,
},
{
  id: "2",
  text: "Best rating",
  selected: false,
},
{
  id: "3",
  text: "Most popular",
  selected: false,
},
{
  id: "4",
  text: "Price: Low to high",
  selected: false,
},
{
  id: "5",
  text: "Price: High to low",
  selected: false,
}]

const initialQueryObj = {}

export default function ShopAll() {
  const [filterQueryObj, setFilterOueryObj] = useState<QueryObject | undefined>(initialQueryObj);
  const [sortQueryObj, dispatchSortOption] = useSortOption();
  const [showFilter, setShowFilter] = useState(false);
  const [initialFilterOptions] = useFilterOptions();
  const [filterOptions, setFilterOptions] = useState(initialFilterOptions);
  const [sortOptions, setSortOptions] = useState<DropdownInfo[]>(initialSortOptions)
  const [mobileFilter, setMobileFilter] = useOverflowHidden(document.body);

  const queryObj = useMemo(() => {
    return {
      ...filterQueryObj,
      ...sortQueryObj
    }
  }, [filterQueryObj, sortQueryObj])
  const [productInfo] = useProductInfo(queryObj);

  // const [pageIndex, setPageIndex] = useState(0);
  useEffect(() => {
    if (initialFilterOptions !== null) {
      setFilterOptions(initialFilterOptions);
    }
  }, [initialFilterOptions, setFilterOptions])

  function handleChangeFilterOptions(options: FilterOptions) {
    setFilterOptions(options);
    setFilterOueryObj({
      collection: options.collections.filter(item => item.selected).map(item => item.id),
      category: options.category.filter(item => item.selected).map(item => item.id),
      color: options.colors.filter(item => item.selected).map(item => item.color),
      rating: options.rating.filter(item => item.selected).map(item => item.currStar)
    })
  }

  function resetFilterOptions() {
    if (initialFilterOptions === null) {
      return;
    }

    handleChangeFilterOptions(initialFilterOptions);
  }

  function handleSelectSortOption(id: string) {
    const updatedOptions = structuredClone(sortOptions.map(option => {
      return {
        ...option,
        selected: false
      }
    }));
    const index = updatedOptions.findIndex(item => item.id === id);

    if (index === -1) {
      return;
    }
    

    updatedOptions[index].selected = true;
    dispatchSortOption({ type: updatedOptions[index].text });
    setSortOptions(updatedOptions);
  }

  return (
    <div className={clsx(
      "flex gap-16 self-stretch px-3 py-12 ",
      "md:px-4 md:py-16 xl:p-24"
    )}>
      {showFilter && filterOptions !== null && (
        <div className="hidden xl:block">
          <FilterMain 
            options={filterOptions} 
            onChange={(options: FilterOptions) => handleChangeFilterOptions(options)}
            onReset={resetFilterOptions}
            onClose={() => setShowFilter(false)}/>
        </div>
      )}
      <div className={clsx(
        'flex flex-col grow gap-12 self-stretch',
        'md:gap-16'
      )}>
        <header 
          className="flex items-center gap-4 self-stretch justify-between">
          <div className="hidden xl:block">
          {
            !showFilter && 
            <BaseButton
              text="Filter"
              onClick={() => setShowFilter(true)}>
              <RiFilterLine />
            </BaseButton>
          }
          </div>
          <div className="block xl:hidden">
          {
            !mobileFilter && 
            <BaseButton
              text="Filter"
              onClick={() => setMobileFilter(true)}>
              <RiFilterLine />
            </BaseButton>
          }
          </div>
          <Dropdown 
            text="Sort by"
            options={sortOptions}
            onSelect={handleSelectSortOption}/>
        </header>
        {productInfo && (
          productInfo.data.length > 0
          ? (
              <main className={clsx(
                'md:grid md:grid-cols-[repeat(auto-fit,336px)]',
                'xl:grid-cols-[repeat(auto-fit,280px)]',
                'gap-8 justify-between self-stretch'
              )}>
                {productInfo && productInfo.data && productInfo.data.map(item => {
                  return (
                  <ProductCard 
                    key={item.product_id}
                    productID={item.product_id}
                    productName={item.name}
                    description={item.description}
                    productImages={item.images}
                    colors={item.colors}
                    listPrice={item.inventory[0].list_price}
                    salePrice={item.inventory[0].sale_price}/>
                  )
                })}
              </main>)
          : (
            <Fallback 
              Icon={RiTShirt2Line}
              mainDesc="Nothing found just yet"
              subDesc="Adjust your filters a bit, and let's see what we can find!"
              button={{ text: "Reset filters" }}
              onClick={resetFilterOptions}/>
          )
        )}
      </div>
      <div className={clsx(
        'fixed top-0 left-0 bg-white w-full h-full',
        'opacity-0 duration-300 ease-in-out -translate-x-full',
        mobileFilter && 'opacity-100 translate-x-0',
        'p-6 flex justify-center z-30 overflow-y-auto'
      )}>
        {mobileFilter && filterOptions !== null && (
          <FilterMain 
            options={filterOptions} 
            onChange={(options: FilterOptions) => handleChangeFilterOptions(options)}
            onReset={resetFilterOptions}
            onClose={() => setMobileFilter(false)}/>
        )}
      </div>
    </div>
  )
}