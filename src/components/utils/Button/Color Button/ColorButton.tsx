import { clsx } from 'clsx';
import { IoIosCheckmark } from "react-icons/io";

interface Props {
    color: string;
    selected: boolean;
    onChangeColorIndex: (color: string) => void;
}

export default function ColorButton({ 
  color, 
  selected,
  onChangeColorIndex 
}: Props) {
  function handleSelectColor(
    event: React.MouseEvent, 
    color: string
  ) {
    event.preventDefault();
    
    onChangeColorIndex(color);
  }

  function getCheckIconColor(color: string): 'white' | 'black' {
    const blackSet = new Set(["yellow", "white", "beige"]);
    
    return blackSet.has(color) ? 'black' : 'white';
  }

  return (
    <div className='flex justify-center items-center p-1'>
      <button 
        className={clsx(
          'flex justify-center items-center',
          'w-4 h-4 rounded-full border-[0.5px] border-solid border-gray-200',
          'focus:shadow-[0_0_0_4px_rgba(68,76,231,0.12)] focus:outline-none',
          'hover:cursor-pointer hover:shadow-[0_0_0_1px_rgba(68,76,231,0.12)]',
          selected && 'shadow-[0 0 0 1px rgba(68,76,231,1)]'
        )}
        style={{backgroundColor: color}}
        onClick={(e) => handleSelectColor(e, color)}>
        {selected && (
          <IoIosCheckmark 
            className={clsx(
              'text-base text-center',
              getCheckIconColor(color) === 'white' 
              ? 'text-white'
              : 'text-neutral-500'
            )}/>
          )
        }
      </button>
    </div>
  )
}

// , selected && 'border-gray-400'