import { clsx } from 'clsx';
import CartCard from '../../components/Shopping Cart/Card/CartCard';
import { useCartStore } from '../../stores/useCartStore';

export default function ShoppingCart() {
  const cartItems = useCartStore((state) => state.cartItems);

  return (
    <main className={clsx(
      'flex flex-col gap-16 self-stretch rounded-lg px-3 py-12',

    )}>
      <h1 className='font-semibold text-3xl text-neutral-900'>
        Shopping Cart
      </h1>
      <section className="flex flex-col gap-8 self-stretch">
      {cartItems !== null && cartItems.items.map(item => {
        return (
          <>
            <CartCard 
              item={item}/>
            <hr className="text-neutral-300"/>
          </>
        )
      })}
      </section>
    </main>
  )
}