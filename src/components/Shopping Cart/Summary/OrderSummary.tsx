import { useState } from 'react';
import { clsx } from 'clsx';
import type { CouponResponse } from '../../utils/types';
import SummaryInfo from './SummaryInfo';
import CouponCode from './CouponCode';
import ConfirmButton from '../../utils/Button/Confirm/ConfirmButton';

interface Props {
  subtotal: number;
  
}

export default function OrderSummary({ subtotal }: Props) {
  const [coupon, setCoupon] = useState<CouponResponse | null>({
    coupon_code: "GR8FRNTND24",
    discount_amount: 5,
    discount_percentage: null
  });

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
      <div className='flex flex-col gap-4'>
        <SummaryInfo 
          category='text'
          label='Subtotal'
          text={`$${subtotal}`}/>
        <SummaryInfo 
          category='text'
          label='Shipping'
          text='Free'/>
        {coupon !== null && (
          <SummaryInfo 
            category='tag'
            label={coupon.coupon_code}
            text='Free'/>
        )}
        <div>
          <CouponCode 
            code={coupon.coupon_code}
            onChangeCoupon={setCoupon}/>
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