import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { EcommerceProductImage } from '../../types';
import { capitalize } from '../../utilFunctions';
import ColorButton from '../../Button/Color Button/ColorButton';
import RatingButton from '../../Button/Rating/RatingButton';

interface Props {
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
  productName, 
  description,
  colors,
  productImages, 
  listPrice,
  salePrice
}: Props) {
  const [itemIndex, setItemIndex] = useState(0);
  const [colorList, setColorList] = useState<colorInfo[]>([]);

  useEffect(() => {
    setColorList(colors.map(item => {
      return {
        color: item,
        id: uuidv4()
      }
    }))
  }, []); 

  function handleChangeColorIndex(color: string) {
    const index = productImages.findIndex((item) => item.color === color);
    if (index === -1) {
      return;
    }

    setItemIndex(index);
  }

  return (
    <figure className='flex flex-col flex-grow md:w-[336px] md:flex-grow-0 xl:w-[280px]'>
      <img 
        className='self-stretch h-[300px] rounded-lg object-cover'
        src={productImages[itemIndex].image_url}
        alt={description}
        loading="lazy"
        title={productName}/>
      <div className='flex flex-col gap-3 self-stretch h-[168px] py-4'>
        <div>
          <h4 className='font-normal text-xs text-neutral-600'>
            {capitalize(productImages[itemIndex].color)}
          </h4>
          <figcaption className='font-medium text-lg text-neutral-900'>
            {productName}
          </figcaption>
          <RatingButton 
            totalStar={5}
            currStar={5}
            selected={false}/>
          <RatingButton 
            totalStar={5}
            currStar={4}
            selected={false}/>
          <RatingButton 
            totalStar={5}
            currStar={3}
            selected={false}/>
          <RatingButton 
            totalStar={5}
            currStar={2}
            selected={false}/>
          <RatingButton 
            totalStar={5}
            currStar={1}
            selected={false}/>
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
                isSelected={productImages[itemIndex].color === item.color}
                onChangeColorIndex={(color) => handleChangeColorIndex(color)}/>
            )
          })}
        </div>
      </div>
    </figure>
  )
})