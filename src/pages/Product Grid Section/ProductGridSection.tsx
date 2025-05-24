import { useState, useEffect, type ReactElement } from "react";
import { v4 as uuidv4 } from 'uuid';
import { usePoductInfo } from "../../components/utils/hooks";
import type { EcommerceProductImage } from "../../components/utils/types";
import ProductCard from "../../components/utils/Card/Product Card/ProductCard";
import './ProductGridSection.scss';

type ProductImages = {
  images: EcommerceProductImage[];
  id: string;
}

export default function ProductGridSection() {
  const [productInfo] = usePoductInfo();
  const [productImages, setProductImages] = useState<ProductImages[]>([]);
  const [pageIndex, setPageIndex] = useState(0);

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
    <div className="product-grid-section">
      <div className="product-grid-section__content">
        {productImages.map((item, index) => {
          return (
          <ProductCard 
            key={item.id}
            productName={productInfo!.data[index].name}
            productImages={item.images}
            colors={productInfo!.data[index].colors}
            listPrice={productInfo!.data[index].inventory[0].list_price}
            salePrice={productInfo!.data[index].inventory[0].sale_price}/>
          )
        })}
      </div>
    </div>
  )
}