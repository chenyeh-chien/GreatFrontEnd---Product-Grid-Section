import { useState, useMemo, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router';
import { clsx } from 'clsx';
import { v4 as uuidv4 } from 'uuid';
import { useCartStore } from '../../stores/useCartStore';
import { useProductDetails } from '../../components/utils/hooks';
import { getDateStr } from '../../components/utils/utilFunctions';
import type { Options } from '../../components/Product Details/Options/Options';
import type { EcommerceCartItem } from '../../components/utils/types';
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
  const [options, setOptions] = useState<Options | null>(null);
  const [inventoryIndex, setInventoryIndex] = useState(-1);
  const cartItems = useCartStore((state) => state.cartItems);
  const addCartItem = useCartStore((state) => state.addCartItem);

  const handleChangeOptions = useCallback((options: Options) => {
    if (productDetails === null) {
      return;
    }

    const selectedColors = options.colors.filter(item => item.selected);
    const selectedSizes = options.sizes.filter(item => item.selected);
    const color = selectedColors.length > 0 ? selectedColors[0].color : null;
    const size = selectedSizes.length > 0 ? selectedSizes[0].name : null;

    const index = 
      productDetails.inventory.findIndex(
        item => item.color === color && item.size === size
      );
    
    if (index === -1) {
      return;
    }

    if (index !== inventoryIndex) {
      setInventoryIndex(index);
    }

    setOptions({
      ...options,
      quantity: {
        total: productDetails.inventory[index].stock,
        selected: index !== inventoryIndex ? 0 : options.quantity.selected,
      }
    });
  }, [productDetails, inventoryIndex, setInventoryIndex, setOptions])

  useEffect(() => {
    if (productDetails !== null && options === null) {
      const colors = productDetails.colors.map(color => {
        return {
          id: uuidv4(),
          selected: false,
          color: color
        }
      })

      if (colors.length > 0) {
        colors[0].selected = true;
      }

      const sizes = productDetails.sizes.map(size => {
        return {
          id: uuidv4(),
          selected: false,
          name: size
        }
      });

      if (sizes.length > 0) {
        sizes[0].selected = true;
      }

      handleChangeOptions({
        colors: colors,
        sizes: sizes,
        quantity: {
          total: 0,
          selected: 0
        }
      })
    }
  }, [productDetails, options, setOptions, handleChangeOptions])

  function handleAddToCart() {
    if (
      productDetails === null ||
      options === null ||
      inventoryIndex === -1) {
      return;
    }

    console.log(cartItems);

    const listPrice = productDetails.inventory[inventoryIndex].list_price;
    const salePrice = productDetails.inventory[inventoryIndex].sale_price;
    const quantity = options.quantity.selected;

    const imageURL = 
      productDetails.images.filter(
        item => item.color === productDetails.inventory[inventoryIndex].color
      );

    // TODO: arrange selected option to cart
    const cartItem: EcommerceCartItem = {
      product: {
        product_id: productDetails.product_id,
        name: productDetails.name,
        description: productDetails.description
      },
      unit: {
        sku: productDetails.inventory[inventoryIndex].sku,
        list_price: listPrice,
        sale_price: salePrice,
        size: productDetails.inventory[inventoryIndex].size,
        color: productDetails.inventory[inventoryIndex].color,
        stock: productDetails.inventory[inventoryIndex].stock,
        image_url: imageURL.length > 0 ? imageURL[0].image_url : ""
      },
      total_list_price: listPrice * quantity,
      total_sale_price: salePrice * quantity,
      quantity,
      created_at: getDateStr(),
    }

    // Add to state management. ex: zustand
    addCartItem(cartItem);
  }

  return (
    <>
    {productDetails && (
      <figure 
        className='flex flex-col gap-12 px-4 py-12 xl:p-24 xl:flex-row'>
        <ProductDetailImages 
          images={productDetails.images}
          selectedIndex={imageIndex}
          onSelect={(index) => setImageIndex(index)}/>
        <div className='flex flex-col flex-1 gap-10 self-stretch'>
          <div className='flex flex-col gap-8 self-stretch'>
            <div className='flex flex-col gap-5'>
              <h2 className='font-semibold text-3xl text-neutral-900'>{productDetails.name}</h2>
              <div className='flex flex-col gap-3 self-stretch'>
                <div className='flex flex-col gap-2 justify-center self-stretch'>
                  {inventoryIndex >= 0 && (
                    <>
                      <div className='flex gap-2 items-end'>
                        <span className='font-medium text-3xl text-neutral-600'>
                          ${productDetails.inventory[inventoryIndex].sale_price}
                        </span>
                        {productDetails.inventory[inventoryIndex].sale_price !== productDetails.inventory[inventoryIndex].list_price && 
                          <span className='font-medium text-lg line-through text-neutral-400'>
                            ${productDetails.inventory[inventoryIndex].list_price}
                          </span>
                        }
                      </div>
                      <div className='flex gap-2'>
                        <>
                          {productDetails.inventory[inventoryIndex].discount !== null && (
                            <DiscountBadge 
                            display='currency'
                            currency={productDetails.inventory[inventoryIndex].discount}/>
                          )}
                          {productDetails.inventory[inventoryIndex].discount_percentage !== null && (
                            <DiscountBadge 
                              display='percentage'
                              percentage={productDetails.inventory[inventoryIndex].discount_percentage}/>
                          )}
                        </>
                      </div>
                    </>
                  )}
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
                options={options}
                onChange={handleChangeOptions}/>
            )}            
            <button 
              className={clsx(
                'grow px-5 py-3 rounded md:px-6 md:py-4',
                'bg-indigo-700 font-medium text-base text-white',
                'hover:cursor-pointer hover:bg-indigo-800',
                'focus:shadow-[0_0_0_4px_rgba(68,76,231,0.12)] focus:outline-none'
              )}
              onClick={handleAddToCart}
              disabled={false}>
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