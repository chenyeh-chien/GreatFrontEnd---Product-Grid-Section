import { clsx } from 'clsx';
import CartCard from '../../components/Shopping Cart/Card/CartCard';
import OrderSummary from '../../components/Shopping Cart/Summary/OrderSummary';
import { useCartStore } from '../../stores/useCartStore';

export default function ShoppingCart() {
  const cartItems = useCartStore((state) => state.cartItems);
  console.log(cartItems)

  return (
    <main className={clsx(
      'flex flex-col gap-16 self-stretch rounded-lg px-3 py-12',
      'md:px-4 md:py-16',
      'xl:p-24'
    )}>
      <h1 className='font-semibold text-3xl text-neutral-900'>
        Shopping Cart
      </h1>
      {cartItems !== null && (
        <section className={clsx(
          'flex flex-col gap-16',
          'xl:flex-row xl:gap-8'
        )}>
          <section className='flex flex-col gap-8 self-stretch'>
          {cartItems.items.map((item, index) => {
            return (
              <>
                <CartCard 
                  item={item}
                  itemIndex={index}/>
                {index !== cartItems.items.length - 1 && (
                  <hr className="border-t border-dashed border-gray-300"/>
                )}
              </>
            )
          })}
          </section>
          <OrderSummary 
            subtotal={cartItems.summary.subtotal}/>
        </section>
      )}
    </main>
  )
}