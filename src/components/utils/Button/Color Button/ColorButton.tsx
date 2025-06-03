import { clsx } from 'clsx';
import { FaRegCheckCircle } from "react-icons/fa";

interface Props {
    color: string;
    isSelected: boolean;
    onChangeColorIndex: (color: string) => void;
}

export default function ColorButton({ 
  color, 
  isSelected,
  onChangeColorIndex 
}: Props) {
  function handleSelectColor(
    event: React.MouseEvent, 
    color: string
  ) {
    event.preventDefault();
    if (isSelected) {
        return;
    }

    onChangeColorIndex(color);
  }

  return (
    <div className='flex justify-center items-center p-1'>
      <button 
        className={clsx(
          'flex justify-center items-center',
          'w-4 h-4 rounded-full',
          'focus:shadow-[0_0_0_4px_rgba(68,76,231,0.12)] focus:outline-none',
          'hover:cursor-pointer hover:shadow-[0_0_0_1px_rgba(68,76,231,0.12)]',
          isSelected && 'shadow-[0 0 0 1px rgba(68,76,231,1)]'
        )}
        style={{backgroundColor: color}}
        onClick={(e) => handleSelectColor(e, color)}>
        {isSelected && <FaRegCheckCircle className='text-white text-base text-center'/>}
      </button>
    </div>
  )
}

// border-[0.5px] border-solid border-gray-200
// , isSelected && 'border-gray-400'