import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router';
import { clsx } from 'clsx';
import { useProductDetails } from '../../components/utils/hooks';
import ProductDetailImages from '../../components/Product Details/Images/ProductDetailImages';

export default function ProductDetails() {
  const { search } = useLocation();
  const productID = useMemo(() => {
    const queryParams = new URLSearchParams(search);
    return queryParams.get("productID");
  }, [search]);
  const productDetails = useProductDetails(productID);
  const [imageIndex, setImageIndex] = useState(0);


  return (
    <>
    {productDetails && (
      <figure className='flex flex-col gap-12 px-4 py-12'>
        <ProductDetailImages 
          images={productDetails.images}
          selectedIndex={imageIndex}
          onSelect={(index) => setImageIndex(index)}/>
        <div className='flex flex-col gap-5'>
          <figcaption className='font-semibold text-3xl text-neutral-900'>{productDetails.name}</figcaption>
          <div className='flex flex-col gap-3 self-stretch'>
            <div className='flex flex-col gap-2 justify-center self-stretch'>
              <div className='flex gap-2 items-end'>
                <span className='font-medium text-3xl text-neutral-600'>
                  ${productDetails.inventory[0].sale_price}
                </span>
                {productDetails.inventory[0].sale_price !== productDetails.inventory[0].list_price && 
                  <span className='font-medium text-lg line-through text-neutral-400'>
                    ${productDetails.inventory[0].list_price}
                  </span>
                }
              </div>
              <div>

              </div>
            </div>
            <div>

            </div>
          </div>
        </div>
      </figure>
    )}
    </>
  )
}