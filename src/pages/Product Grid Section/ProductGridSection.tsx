import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { usePoductInfo } from "../../components/utils/hooks";
import type { EcommerceProductImage } from "../../components/utils/types";
import ProductCard from "../../components/utils/Card/Product Card/ProductCard";
import './ProductGridSection.scss';

export default function ProductGridSection() {
  const [productInfo] = usePoductInfo();
  const [productList, setProductList] = useState<EcommerceProductImage[]>([]);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    if (productInfo !== null && productInfo.data.length > 0) {
      setProductList(productInfo.data.map(item => {
        return {
            ...item.images[0],
            id: uuidv4()
        }
      }));
    }
  }, [productInfo]); 

  return (
    <div className="product-grid-section">
      <div className="product-grid-section__content">
        {productList.map(item => {
          return (
          <ProductCard 
            key={item.id}
            productImage={item}/>
          )
        })}
      </div>
    </div>
  )
}