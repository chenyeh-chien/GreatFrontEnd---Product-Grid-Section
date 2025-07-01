import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import { clsx } from "clsx";
import { v4 as uuidv4 } from 'uuid';
import type { EcommerceProductImage } from '../../types';
import { capitalize } from '../../utilFunctions';
import ColorButton from '../../Button/Color Button/ColorButton';

interface Props {
  productID: string;
  productName: string;
  description: string;
  colors: string[];
  productImages: EcommerceProductImage[];
  listPrice: number;
  salePrice: number;
}

type colorInfo = {
  color: string;
  id: string;
}

export default React.memo(function ProductCard({
  productID,
  productName, 
  description,
  colors,
  productImages, 
  listPrice,
  salePrice
}: Props) {
  const [itemIndex, setItemIndex] = useState(0);
  const [colorList, setColorList] = useState<colorInfo[]>([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setColorList(colors.map(item => {
      return {
        color: item,
        id: uuidv4()
      }
    }))
  }, [colors, setColorList]); 

  function handleSelectProduct(e: React.MouseEvent) {
    e.preventDefault();
    
    const tagName = (e.target as HTMLElement).tagName;
    if (tagName === 'IMG' || tagName === 'FIGCAPTION') {
      navigate(`/product-details?productID=${productID}`);
    }
  }

  function handleChangeColorIndex(color: string) {
    const index = productImages.findIndex((item) => item.color === color);
    if (index === -1) {
      return;
    }

    setItemIndex(index);
  }

  return (
    <figure
      className={clsx(
        'group flex flex-col flex-grow rounded-lg',
        'md:w-[336px] md:flex-grow-0 xl:w-[280px]',
        'focus:shadow-[0_0_0_4px_rgba(68,76,231,0.12)] focus:outline-none'
      )}
      tabIndex={0}
      onClick={handleSelectProduct}>
      <img 
        className={clsx(
          'self-stretch h-[300px] rounded-lg object-cover hover:cursor-pointer',
          !imageLoaded && 'bg-gray-200 animate-pulse' 
        )}
        src={productImages[itemIndex].image_url}
        alt={description}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
        title={productName}/>
      <div className='flex flex-col gap-3 self-stretch h-[168px] py-4'>
        <div>
          <h4 className='font-normal text-xs text-neutral-600'>
            {capitalize(productImages[itemIndex].color)}
          </h4>
          <figcaption 
            className={clsx(
              'font-medium text-lg text-neutral-900',
              'group-hover:text-indigo-700 hover:cursor-pointer'
            )}>
            {productName}
          </figcaption>
        </div>
        <div className='flex items-center gap-2 self-stretch'>
          <span className='font-normal text-lg text-neutral-500'>
            ${salePrice}
          </span>
          {salePrice !== listPrice && 
            <span className='font-normal text-xs line-through text-neutral-600'>
              ${listPrice}
            </span>
          }
        </div>
        <div className='flex gap-1'>
          {colorList.map(item => {
            return (
              <ColorButton 
                key={item.id}
                color={item.color}
                selected={productImages[itemIndex].color === item.color}
                onChangeColorIndex={(color) => handleChangeColorIndex(color)}/>
            )
          })}
        </div>
      </div>
    </figure>
  )
})