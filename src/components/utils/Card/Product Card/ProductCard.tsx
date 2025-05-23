import React from 'react';
import type { EcommerceProductImage } from '../../types';
import './ProductCard.scss';

interface Props {
  productImage: EcommerceProductImage;
}

export default React.memo(function ProductCard({ productImage }: Props) {
  return (
    <article className='product-card'>
      {/* card main */}
      <figure>
        <img src={productImage.image_url}/>
        <p>
          <h4></h4>
          <figcaption></figcaption>
          <h4></h4>
        </p>
      </figure>
      {/* color */}
    </article>
  )
})