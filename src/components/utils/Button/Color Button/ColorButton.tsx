import { useEffect, useReducer } from 'react';
import { clsx } from 'clsx';
import { IoIosCheckmark } from "react-icons/io";

interface Props {
    color: string;
    selected: boolean;
    size?: 'sm' | 'md' | 'lg';
    onChangeColorIndex: (color: string) => void;
}

export default function ColorButton({ 
  color, 
  selected,
  size,
  onChangeColorIndex 
}: Props) {
  const [colorSize, dispatchColorSize] = 
    useReducer(handleButtonSize, { width: '16px', height: '16px' })

  useEffect(() => {
    if (size !== undefined) {
      dispatchColorSize({ type: size })
    }
  }, [dispatchColorSize, size])

  function handleButtonSize(
    state: { width: string, height: string }, 
    action: { type: string }
  ) {
    switch(action.type) {
      case 'sm': 
        return {
          ...state,
          width: '16px',
          height: '16px'
        }
      case 'md': 
        return {
          ...state,
          width: '24px',
          height: '24px'
        }
      case 'lg': 
        return {
          ...state,
          width: '38px',
          height: '38px'
        }
      default:
        throw Error(`Unknown type: ${action.type}`);
    }
  }

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
          `w-[${colorSize.width}] h-[${colorSize.height}]`,
          'rounded-full border-[0.5px] border-solid border-gray-200',
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