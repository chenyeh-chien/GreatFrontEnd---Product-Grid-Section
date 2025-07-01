import { NavLink } from "react-router";
import { RiShoppingBag3Line } from "react-icons/ri";
import { clsx } from 'clsx';
import { useCartStore } from '../../../../stores/useCartStore';

export default function ShoppingCart() {
  const cartItems = useCartStore((state) => state.cartItems);

  return (
    <NavLink 
      className={clsx(
        'relative rounded',
        'focus:shadow-[0_0_0_4px_rgba(68,76,231,0.12)] focus:outline-none'
      )}
      to="/shopping-cart">
      <RiShoppingBag3Line 
        className="w-6 h-6 hover:cursor-pointer"
        aria-label="View shopping cart"/>
      {cartItems !== null && (
        <div className={clsx(
          'w-[18px] flex justify-center items-center px-1 py-px',
          'absolute -top-2 left-4 rounded-full bg-indigo-700',
          'font-semibold text-xs text-center text-white'
        )}>
          {cartItems.items.length}
        </div>
      )}
    </NavLink>
  )
}