import { useState, useEffect } from "react";
import { clsx } from 'clsx';
import { v4 as uuidv4 } from 'uuid';
import { useProductInfo } from "../../components/utils/hooks";
import type { EcommerceProductImage } from "../../components/utils/types";
import ProductCard from "../../components/utils/Card/Product Card/ProductCard";

type ProductImages = {
  images: EcommerceProductImage[];
  id: string;
}

export default function ProductGridSection() {
  const [productInfo] = useProductInfo();
  const [productImages, setProductImages] = useState<ProductImages[]>([]);
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

  return (
    <div className={clsx(
      'flex flex-col gap-12 self-stretch',
      'px-3 py-12',
      'md:gap-16 md:px-4 md:py-16 xl:p-24'
    )}>
      <header className="flex items-center gap-4 self-stretch justify-between">
        <h1 className="font-semibold text-2xl text-neutral-900">
          Latest Arrivals
        </h1>
        <div>
          <button className={clsx(
            'font-medium bg-white border-[0.5px]',
            'border-solid border-neutral-200 rounded',
            'rounded px-4 py-2.5 hover:cursor-pointer'
          )}>
            View all
          </button>
        </div>
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
  )
}