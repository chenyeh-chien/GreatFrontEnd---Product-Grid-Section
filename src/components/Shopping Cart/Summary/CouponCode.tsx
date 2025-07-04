import { useState } from 'react';
import { RiCouponLine } from "react-icons/ri";
import { clsx } from 'clsx';
import type { CouponResponse } from '../../utils/types';
import { applyCouponCode } from '../../utils/utilFunctions';
 
interface Props {
  code: string | null;
  onChangeCoupon: (coupon: CouponResponse | null) => void;
}

export default function CouponCode({ code, onChangeCoupon }: Props) {
  const [showCouponCode, setShowCouponCode] = useState(false);
  const [couponCode, setCouponCode] = useState<string | null>("");

  function handleChangeCouponCode(e: React.ChangeEvent) {
    e.preventDefault();
    
    const value = (e.target as HTMLInputElement).value;
    setCouponCode(value);
  }

  async function handleApplyCoupon(e: React.MouseEvent) {
    e.preventDefault();

    if (couponCode === null) {
      return;
    }

    // applyCouponCode
    const result = await applyCouponCode(couponCode);
    onChangeCoupon(result);
  }

  return (
    <section>
      {showCouponCode ? (
        <div className={clsx(
          'flex flex-col justify-end gap-2 self-stretch py-1',
        )}>
          <form className='flex gap-2 justify-end items-end self-stretch'>
            <div className='flex flex-col gap-1.5 grow'>
              <label 
                className='font-medium text-sm text-neutral-700'
                htmlFor='coupon-input'>
                Coupon code
              </label>
              <input 
                id="coupon-input"
                className={clsx(
                  'px-3.5 py-2.5 rounded bg-neutral-50 grow',
                  'border border-solid border-neutral-200',
                  'font-normal text-sm text-neutral-900',
                  'placeholder:text-neutral-500',
                  'focus:shadow-[0_0_0_4px_rgba(68,76,231,0.12),' + 
                  '0_1px_2px_0_rgba(16,24,40,0.05),' + 
                  '0_0_0_1px_rgba(68,76,231,1)]',
                  'focus:outline-indigo-700 focus:outline'
                )}
                type="text" 
                placeholder='Enter coupon code'
                onChange={(e) => handleChangeCouponCode(e)}/>
            </div>
            <button 
              className={clsx(
                "w-20 px-3.5 py-2.5 font-medium text-sm text-neutral-900",
                "rounded border-[0.5px] border-solid border-neutral-200",
                'hover:cursor-pointer'
              )}
              onClick={handleApplyCoupon}>
              Apply
            </button>
          </form>
        </div>
      ) : (
        <div className={clsx(
          'flex justify-end items-end gap-2 self-stretch',
        )}>
          <button className={clsx(
            'flex justify-center items-center gap-1.5 text-indigo-700 rounded',
            'hover:cursor-pointer focus:bg-white',
            'focus:shadow-[0_0_0_4px_rgba(68,76,231,0.12)] focus:outline-none',
            'disabled:text-neutral-400'
          )}>
            <RiCouponLine className="w-5 h-5"/>
            <span 
              className={clsx(
                'font-medium text-base',
                'hover:text-indigo-800',
              )}
              onClick={() => setShowCouponCode(true)}>
              Add coupon code
            </span>
          </button>
        </div>
      )}
    </section>
  )
}