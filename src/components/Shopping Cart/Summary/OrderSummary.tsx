import { clsx } from 'clsx';
import SummaryInfo from './SummaryInfo';
import CouponCode from './CouponCode';
import ConfirmButton from '../../utils/Button/Confirm/ConfirmButton';

interface Props {
  subtotal: number;
  
}

export default function OrderSummary({ subtotal }: Props) {
  function handleCheckout() {

  }

  return (
    <section className={clsx(
      'flex flex-col gap-8',
      'bg-white p-4 rounded-lg border border-solid border-neutral-200',
      'xl:w-96 xl:h-max'
    )}>
      <h2 className='font-semibold text-2xl text-neutral-900'>
        Order Summary
      </h2>
      <div>
        <SummaryInfo 
          label='Subtotal'
          text={`$${subtotal}`}/>
        <SummaryInfo 
          label='Shipping'
          text='Free'/>
        <div>
          <CouponCode />
        </div>
      </div>
      <hr className="border-t border-dashed border-gray-300"/>
      <div className='flex gap-4 self-stretch'>
        <span className='font-medium text-2xl text-neutral-900'>
          Total
        </span>
        <span className='font-semibold text-4xl text-right text-neutral-900 grow'>
          ${subtotal}
        </span>
      </div>
      <ConfirmButton 
        text='Checkout'
        onClick={handleCheckout}/>
    </section>
  )
}