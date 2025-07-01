import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { clsx } from 'clsx';

interface Props {
  src: string;
  selected: boolean;
  onSelect: () => void;
}

export default function SubImage({ src, selected, onSelect }: Props) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <img 
      key={uuidv4()}
      className={clsx(
        'min-w-[80px] max-w-[288px] flex-1 object-cover rounded-lg', //w-[80px] basis-[80px] flex-1 
        'md:min-w-[188px] xl:min-w-40',
        'hover:cursor-pointer',
        selected && 'border-2 border-indigo-600',
        !imageLoaded && 'bg-gray-200 animate-pulse' 
      )}
      src={src}
      loading="lazy"
      onLoad={() => setImageLoaded(true)}
      onClick={onSelect} />
  )
}