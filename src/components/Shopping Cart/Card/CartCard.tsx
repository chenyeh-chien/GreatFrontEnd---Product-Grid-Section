import { clsx } from 'clsx';
import type { EcommerceCartItem } from '../../utils/types';
import { capitalize } from '../../utils/utilFunctions';
import QuantityButton from '../../utils/Button/Quantity/QuantityButton';

interface Props {
  item: EcommerceCartItem;
}

const clothSizeMap: { [size: string]: string } = {
  xs: "Extra Small",
  sm: "Small",
  md: "Middle",
  lg: "Large",
  xl: "Extra Large"
}

export default function CartCard({ item }: Props) {

  function handleChangeQuantity(selected: number) {

  }

  return (
    <figure className={clsx(
      'flex flex-col gap-4 self-stretch',
      'md:flex-row md:gap-8'
    )}>
      <img 
        className={clsx(
          'h-[200px] object-cover rounded-lg',
          'md:min-w-[280px]'
        )}
        src={item.unit.image_url}/>
      <div className="flex flex-col gap-4 self-stretch">
        <h2 className='font-medium text-2xl text-neutral-900'>
          {item.product.name}
        </h2>
        <div className='font-medium text-base text-neutral-600'>
          <span>{capitalize(item.unit.color!)}</span>
          {item.unit.size !== null && (
            <span> &bull; {(
              clothSizeMap[item.unit.size] !== undefined
              ? clothSizeMap[item.unit.size]
              : item.unit.size
            )}</span>
          )}
        </div>
        <figcaption className='font-normal text-sm text-neutral-600'>
          {item.product.description}
        </figcaption>
        <div className='flex gap-4 self-stretch'>
          <QuantityButton 
            quantity={item.quantity}
            incrementDisabled={item.quantity >= item.unit.stock}
            decrementDisabled={item.quantity <= 0}
            onChange={handleChangeQuantity}/>
          <div className='flex items-center grow'>
            <button 
              className={clsx(
                'rounded px-0.5 font-medium text-sm text-neutral-600',
                'hover:text-neutral-900 hover:cursor-pointer',
                'focus:bg-white',
                'focus:shadow-[0_0_0_4px_rgba(68,76,231,0.12)] focus:outline-none',
                'disabled:text-neutral-400'
              )}>
              Remove
            </button>
          </div>
          <div className='flex justify-end items-center gap-2'>
            <span className='font-medium text-lg text-right text-neutral-900'>
              ${item.unit.sale_price}
            </span>
            {item.unit.sale_price !== item.unit.list_price && 
              <span className='font-normal text-xs line-through text-neutral-600'>
                ${item.unit.list_price}
              </span>
            }
          </div>
        </div>
      </div>
    </figure>
  )
}