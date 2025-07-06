import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { 
  EcommerceCartItem, 
  CouponResponse 
} from '../components/utils/types';

type CartSummary = {
  subtotal: number;
  discount: number;
  discount_code: string | null;
  shipping: number;
  total: number;
}

type CartItems = {
  cart_id: string;
  items: EcommerceCartItem[];
  summary: CartSummary;
  coupon: CouponResponse | null;
}

type CartState = {
  cartItems: CartItems | null;
  addCartItem: (item: EcommerceCartItem) => void;
  updateCartItem: (index: number, item: EcommerceCartItem) => void;
  removeCartItem: (index: number) => void;
  clearCartItems: () => void;
  updateCouponCode: (coupon: CouponResponse | null) => void;
}

// TODO:
// 1. addCartItem: if color and size exist: add quantity to the cart; else, push to the this

// updateSummary: 1. change items 2. change coupon code 3. change shipping 4. 

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => {
      const ensureCartInitialized = () => {
        if (get().cartItems === null) {
          set({ 
            cartItems: {
              cart_id: uuidv4(),
              items: [],
              summary: {
                subtotal: 0,
                discount: 0,
                discount_code: null,
                shipping: 0,
                total: 0
              },
              coupon: null
            }
          })
        }
      }
      
      const calculateCartItem = (item: EcommerceCartItem) => {
        const cartItem = structuredClone(item);

        cartItem.total_list_price = cartItem.unit.list_price * cartItem.quantity;
        cartItem.total_sale_price = cartItem.unit.sale_price * cartItem.quantity;

        return cartItem;
      }

      const calculateSummary = (cart: CartItems): CartSummary => {
        const subtotal = cart.items.reduce((acc, curr) => acc + curr.total_sale_price, 0);
        const shipping = 0;
        let discount_code = null;
        let discount = 0;

        if (cart.coupon !== null) {
          discount_code = cart.coupon.coupon_code;
          
          if (cart.coupon.discount_amount !== null) {
            discount = cart.coupon.discount_amount;
          }

          if (cart.coupon.discount_percentage !== null) {
            discount = cart.coupon.discount_percentage / 100 * subtotal;
          }
        }

        const total = subtotal - discount + shipping;

        return {
          subtotal,
          discount,
          discount_code,
          shipping,
          total
        };
      };
      
      return {
        cartItems: null,
        addCartItem: (item) => {
          ensureCartInitialized();

          set((state) => {
            const cart = structuredClone(state.cartItems!);
            const index = cart.items.findIndex(i => 
              i.unit.color === item.unit.color &&
              i.unit.size === item.unit.size
            );
            
            if (index === -1) {
              cart.items.push(calculateCartItem(item));
            } else {
              cart.items[index].quantity += item.quantity;
              cart.items[index] = calculateCartItem(cart.items[index]);
            }

            cart.summary = calculateSummary(cart);
            return { cartItems: cart };
          });
        },
        updateCartItem: (index, item) => {
          if (get().cartItems === null) {
            return;
          }

          if (item.quantity === 0) {
            get().removeCartItem(index);
            return;
          }

          set((state) => {
            const cart = structuredClone(state.cartItems!);
            
            cart.items[index] = calculateCartItem(item);
            cart.summary = calculateSummary(cart);

            return { cartItems: cart }
          })
        },
        removeCartItem: (index) => {
          if (get().cartItems === null) {
            return;
          }

          set((state) => {
            const cart = structuredClone(state.cartItems!);
            cart.items.splice(index, 1);

            if (cart.items.length === 0) {
              return { cartItems: null }
            }
            
            cart.summary = calculateSummary(cart);
            return { cartItems: cart }
          })
        },
        clearCartItems: () => {
          if (get().cartItems === null) {
            return;
          }

          set(() => {
            return { cartItems: null }
          })
        },
        updateCouponCode: (coupon: CouponResponse | null) => {
          if (get().cartItems === null) {
            return;
          }

          set((state) => {
            const cart = structuredClone(state.cartItems!);
            cart!.coupon = coupon;
            cart.summary = calculateSummary(cart);

            return { cartItems: cart }
          })
        }
      }
    },
    {
      name: 'cart-storage'
    }
  ),
)