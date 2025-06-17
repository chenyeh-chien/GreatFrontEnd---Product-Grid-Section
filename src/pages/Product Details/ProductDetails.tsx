import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router';
import { clsx } from 'clsx';
import { v4 as uuidv4 } from 'uuid';
import { useProductDetails } from '../../components/utils/hooks';
import type { Options } from '../../components/Product Details/Options/Options';
import ProductDetailImages from '../../components/Product Details/Images/ProductDetailImages';
import DiscountBadge from '../../components/utils/Badge/Discount/DiscountBadge';
import RatingButton from '../../components/utils/Button/Rating/RatingButton';
import StyledLink from '../../components/utils/Link/StyledLink';
import OptionMain from '../../components/Product Details/Options/OptionMain';
import InfoMain from '../../components/Product Details/Infos/InfoMain';

export default function ProductDetails() {
  const { search } = useLocation();
  const productID = useMemo(() => {
    const queryParams = new URLSearchParams(search);
    return queryParams.get("productID");
  }, [search]);
  const productDetails = useProductDetails(productID);
  const [imageIndex, setImageIndex] = useState(0);
  const [options, setOptions] = useState<Options | null>(null)
  // TODO: fetch default options from productDetails

  useEffect(() => {
    if (productDetails !== null) {
      setOptions({
        colors: productDetails.colors.map(color => {
          return {
            id: uuidv4(),
            selected: false,
            color: color
          }
        }),
        sizes: productDetails.sizes.map(size => {
          return {
            id: uuidv4(),
            selected: false,
            name: size
          }
        }),
        quantity: {
          total: productDetails.inventory[0].stock,
          selected: 0
        }
      })
    }
  }, [productDetails, setOptions])

  // TODO: arrange selected option to cart

  return (
    <>
    {productDetails && (
      <figure 
        className='flex flex-col gap-12 px-4 py-12 xl:p-24 xl:flex-row'>
        <ProductDetailImages 
          images={productDetails.images}
          selectedIndex={imageIndex}
          onSelect={(index) => setImageIndex(index)}/>
        <div className='flex flex-col gap-10 self-stretch'>
          <div className='flex flex-col gap-8 self-stretch'>
            <div className='flex flex-col gap-5'>
              <h2 className='font-semibold text-3xl text-neutral-900'>{productDetails.name}</h2>
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
                  <div className='flex gap-2'>
                    <DiscountBadge 
                      display='percentage'
                      percentage={20}/>
                    <DiscountBadge 
                      display='currency'
                      currency={5}/>
                  </div>
                </div>
                <div className='flex gap-2 items-center'>
                  <span className='font-normal text-xl text-neutral-900'>
                  {productDetails.rating}
                  </span>
                  <RatingButton 
                    id={productDetails.product_id}
                    totalStar={5}
                    currStar={5}
                    selected={false}
                    onClick={(id) => console.log(id)}/>
                  <StyledLink 
                    text="See all 62 reviews"
                    url={`/product-reviews?productID=${productID}`}/>
                </div>
              </div>
            </div>
            <figcaption className='font-normal text-base text-neutral-600'>
              {productDetails.description}
            </figcaption>
            {options && (
              <OptionMain 
                options={options}/>
            )}            
            <button className={clsx(
              'grow px-5 py-3 rounded md:px-6 md:py-4',
              'bg-indigo-700 font-medium text-base text-white',
              'hover:cursor-pointer hover:bg-indigo-800',
              'focus:shadow-[0_0_0_4px_rgba(68,76,231,0.12)] focus:outline-none'
            )}>
              Add to Cart
            </button>
          </div>
          <InfoMain 
            infos={productDetails.info}/>
        </div>
      </figure>
    )}
    </>
  )
}