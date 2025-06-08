import { useState, useEffect } from "react";
import { clsx } from 'clsx';
import { v4 as uuidv4 } from 'uuid';
import { 
  useProductInfo,
  useFilterOptions,
} from "../../components/utils/hooks";
import type { FilterOptions } from "../../components/utils/Filter/Filter Main/filterMain.ts";
import type { 
  QueryObject, 
  EcommerceProductImage 
} from "../../components/utils/types";
import { RiFilterLine } from "react-icons/ri";
import FilterMain from "../../components/utils/Filter/Filter Main/FilterMain.tsx";
import BaseButton from "../../components/utils/Button/BaseButton";
import ProductCard from "../../components/utils/Card/Product Card/ProductCard";

type ProductImages = {
  images: EcommerceProductImage[];
  id: string;
}

export default function ShopAll() {
  const [queryObj, setOueryObj] = useState<QueryObject | undefined>(undefined);
  const [productInfo] = useProductInfo(queryObj);
  const [productImages, setProductImages] = useState<ProductImages[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filterOptions] = useFilterOptions();

  // const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    if (productInfo !== null && productInfo.data.length > 0) {
      setProductImages(
        productInfo.data.map(item => {
          return {
            images: item.images,
            id: uuidv4()
          }
        })
      );
    }
  }, [productInfo]); 

  function handleChangeFilterOptions(options: FilterOptions) {
    // set queryObj from options
  }

  return (
    <div className={clsx(
      "flex gap-16 self-stretch px-3 py-12 ",
      "md:px-4 md:py-16 xl:p-24"
    )}>
      {showFilter && filterOptions !== null && (
        <FilterMain 
          options={filterOptions} 
          onChange={(options: FilterOptions) => handleChangeFilterOptions(options)}/>
      )}
      <div className={clsx(
        'flex flex-col grow gap-12 self-stretch',
        'md:gap-16'
      )}>
        <header 
          className="flex items-center gap-4 self-stretch justify-between">
          {
            !showFilter && 
            <BaseButton
              text="Filter"
              onClick={() => setShowFilter(true)}>
              <RiFilterLine />
            </BaseButton>
          }
        </header>
        <main className={clsx(
          'md:grid md:grid-cols-[repeat(auto-fit,336px)]',
          'xl:grid-cols-[repeat(auto-fit,280px)]',
          'gap-8 justify-between self-stretch'
        )}>
          {productImages.map((item, index) => {
            return (
            <ProductCard 
              key={item.id}
              productName={productInfo!.data[index].name}
              description={productInfo!.data[index].description}
              productImages={item.images}
              colors={productInfo!.data[index].colors}
              listPrice={productInfo!.data[index].inventory[0].list_price}
              salePrice={productInfo!.data[index].inventory[0].sale_price}/>
            )
          })}
        </main>
      </div>
    </div>
  )
}