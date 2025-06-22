import { useState } from 'react';
import { clsx } from 'clsx';
import { v4 as uuidv4 } from 'uuid';
import SubImage from './SubImage';
import type { EcommerceProductImage } from '../../utils/types';

interface Props {
  images: EcommerceProductImage[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export default function ProductDetailImages({ 
  images, 
  selectedIndex,
  onSelect 
}: Props) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={clsx(
      'flex flex-col gap-6 self-stretch flex-1 xl:w-[592px]'
    )}>
      {!imageLoaded && (
        <div className={clsx(
          'self-stretch h-[400px] bg-gray-200 rounded-lg animate-pulse',
          'md:h-[800px]'
        )}/>
      )}
      <img 
        className={clsx(
          'h-[400px] object-cover rounded-lg',
          'md:h-[800px]'
        )}
        src={images[selectedIndex].image_url}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}/>
      {images.length > 1 && (
        <div className={clsx(
          'flex gap-4 self-stretch h-[120px]',
          'md:h-[190px] overflow-x-auto'
        )}>
          {images.map((image, index) => {
            return (
              <SubImage 
                key={uuidv4()}
                src={image.image_url}
                selected={selectedIndex === index}
                onSelect={() => onSelect(index)}/>
            )
          })}
        </div>
      )}
    </div>
  )
}