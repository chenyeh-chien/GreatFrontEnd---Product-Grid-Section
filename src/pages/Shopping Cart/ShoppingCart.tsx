import { useNavigate } from "react-router";
import { RiShoppingCart2Line } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa6";
import { clsx } from 'clsx';
import { useCartStore } from '../../stores/useCartStore';
import CartCard from '../../components/Shopping Cart/Card/CartCard';
import OrderSummary from '../../components/Shopping Cart/Summary/OrderSummary';
import Fallback from '../../components/utils/Fallback/Fallback';


export default function ShoppingCart() {
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.cartItems);

  return (
    <main className={clsx(
      'flex flex-col gap-16 self-stretch rounded-lg px-3 py-12',
      'md:px-4 md:py-16',
      'xl:p-24'
    )}>
      <h1 className='font-semibold text-3xl text-neutral-900'>
        Shopping Cart
      </h1>
      {cartItems !== null ? (
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
      ) : (
        <Fallback 
          Icon={RiShoppingCart2Line}
          mainDesc="Your cart is empty"
          subDesc="Let's go explore some products"
          button={{ 
            text: "Explore products",
            buttonIcon: FaArrowRight,
          }}
          onClick={() => navigate("/shop-all")}/>
      )}
    </main>
  )
}