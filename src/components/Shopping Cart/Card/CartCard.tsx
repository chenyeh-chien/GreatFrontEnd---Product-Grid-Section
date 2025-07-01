import { clsx } from 'clsx';
import type { EcommerceCartItem } from '../../utils/types';
import QuantityButton from '../../utils/Button/Quantity/QuantityButton';

interface Props {
  item: EcommerceCartItem;
}

export default function CartCard({ item }: Props) {

  function handleChangeQuantity(selected: number) {

  }

  return (
    <figure className={clsx(
      'flex flex-col gap-4 self-stretch'
    )}>
      <img 
        className='h-[200px] object-cover rounded-lg'
        src={item.unit.image_url}/>
      <div className="flex flex-col gap-4 self-stretch">
        <h2 className='font-medium text-2xl text-neutral-900'>
          {item.product.name}
        </h2>
        <div className='font-medium text-base text-neutral-600'>
          <span>{item.unit.color}</span>
        </div>
        <figcaption className='font-normal text-sm text-neutral-600'>
          {item.product.description}
        </figcaption>
        <div>
          <QuantityButton 
            quantity={item.quantity}
            incrementDisabled={item.quantity >= item.unit.stock}
            decrementDisabled={item.quantity <= 0}
            onChange={handleChangeQuantity}/>
        </div>
      </div>
    </figure>
  )
}