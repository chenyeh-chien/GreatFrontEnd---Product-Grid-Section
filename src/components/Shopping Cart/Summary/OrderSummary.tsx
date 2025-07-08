import { useState, useMemo } from 'react';
import { clsx } from 'clsx';
import type { CouponResponse } from '../../utils/types';
import { useCartStore } from '../../../stores/useCartStore';
import SummaryInfo from './SummaryInfo';
import CouponCode from './CouponCode';
import ConfirmButton from '../../utils/Button/Confirm/ConfirmButton';

interface Props {
  subtotal: number;
}

export default function OrderSummary({ subtotal }: Props) {
  // TODO: get summary from cartStore
  const [coupon, setCoupon] = useState<CouponResponse | null>(null);
  const cartItems = useCartStore((state) => state.cartItems);
  const updateCouponCode = useCartStore((state) => state.updateCouponCode);
  const summary = useMemo(() => {
    if (cartItems === null) {
      return {
        subtotal: 0,
        discount: 0,
        discount_code: null,
        shipping: 0,
        total: 0
      }
    }

    return cartItems.summary;
  }, [cartItems]);

  function handleCheckout() {

  }

  return (
    <section className={clsx(
      'flex flex-col gap-8',
      'bg-white p-8 rounded-lg border border-solid border-neutral-200',
      'xl:min-w-100'
    )}>
      <h2 className='font-semibold text-2xl text-neutral-900'>
        Order Summary
      </h2>
      <div className='flex flex-col gap-4'>
        <SummaryInfo 
          category='text'
          label='Subtotal'
          text={`$${summary.subtotal.toFixed(2)}`}/>
        <SummaryInfo 
          category='text'
          label='Shipping'
          text={summary.shipping === 0 ? 'Free' : `$${summary.shipping.toFixed(2)}`}/>
        {summary.discount_code !== null && (
          <SummaryInfo 
            category='tag'
            label={summary.discount_code}
            text={`-$${summary.discount.toFixed(2)}`}/>
        )}
        <div>
          <CouponCode 
            code={summary.discount_code ?? undefined}
            onChangeCoupon={updateCouponCode}/>
        </div>
      </div>
      <hr className="border-t border-dashed border-gray-300"/>
      <div className='flex gap-4 self-stretch'>
        <span className='font-medium text-2xl text-neutral-900'>
          Total
        </span>
        <span className='font-semibold text-4xl text-right text-neutral-900 grow'>
          ${summary.total.toFixed(2)}
        </span>
      </div>
      <ConfirmButton 
        text='Checkout'
        onClick={handleCheckout}/>
    </section>
  )
}