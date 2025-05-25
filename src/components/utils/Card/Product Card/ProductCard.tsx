import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { EcommerceProductImage } from '../../types';
import ColorButton from '../../Button/Color Button/ColorButton';
import './ProductCard.scss';

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
    <figure className='product-card'>
      <img 
        src={productImages[itemIndex].image_url}
        alt={description}
        loading="lazy"
        title={productName}/>
      <div className='product-card__info'>
        <div>
          <h4 className='product_card__info--color'>{productImages[itemIndex].color}</h4>
          <figcaption>{productName}</figcaption>
        </div>
        <div className='product_card__info--price'>
          <span>${salePrice}</span>
          {salePrice !== listPrice && 
            <span>${listPrice}</span>
          }
        </div>
        <div className='product_card__info__color-list'>
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