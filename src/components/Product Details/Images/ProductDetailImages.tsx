import { clsx } from 'clsx';
import { v4 as uuidv4 } from 'uuid';
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
  return (
    <div className={clsx(
      'flex flex-col gap-6 self-stretch flex-1 xl:w-[592px]'
    )}>
      <img 
          className={clsx(
            'h-[400px] object-cover rounded-lg',
            'md:h-[800px]'
          )}
          src={images[selectedIndex].image_url}/>
      {images.length > 1 && (
        <div className={clsx(
          'flex gap-4 self-stretch h-[120px]',
          'md:h-[190px] overflow-x-auto'
        )}>
          {images.map((image, index) => {
            return (
              <img 
                key={uuidv4()}
                className={clsx(
                  'min-w-[80px] max-w-[288px] flex-1 object-cover rounded-lg', //w-[80px] basis-[80px] flex-1 
                  'md:min-w-[188px] xl:min-w-40',
                  'hover:cursor-pointer',
                  selectedIndex === index && 'border-2 border-indigo-600'
                )}
                src={image.image_url}
                onClick={() => onSelect(index)}/>
            )
          })}
        </div>
      )}
    </div>
  )
}