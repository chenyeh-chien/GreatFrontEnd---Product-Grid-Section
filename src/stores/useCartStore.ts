import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { EcommerceCartItem } from '../components/utils/types';

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
}

type CartState = {
  cartItems: CartItems | null;
  addCartItem: (item: EcommerceCartItem) => void;
  //updateCartItem: (item: EcommerceCartItem) => void;
  removeCartItem: (index: number) => void;
  clearCartItems: () => void;
}

// TODO:
// 1. addCartItem: if color and size exist: add quantity to the cart; else, push to the this

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
              }
            } 
          })
        }
      }
      
      return {
        cartItems: null,
        addCartItem: (item) => {
          ensureCartInitialized();

          set((state) => {
            const items = structuredClone(state.cartItems);
            const index = 
              items!.items.findIndex(i => 
                i.unit.color === item.unit.color &&
                i.unit.size === item.unit.size
              )

            if (index === -1) {
              items!.items.push(item);
            } else {
              // update existing item
              
            }

            return {
              cartItems: items
            } 
          })
        },
        removeCartItem: (index) => {
          if (get().cartItems === null) {
            return;
          }

          set((state) => {
            const items = structuredClone(state.cartItems);
            items!.items.splice(index, 1);
            
            return { cartItems: items }
          })
        },
        clearCartItems: () => {
          if (get().cartItems === null) {
            return;
          }

          set((state) => {
            const items = structuredClone(state.cartItems);
            items!.items = [];
            
            return { cartItems: items }
          })
        }
      }
      
    },
    {
      name: 'cart-storage'
    }
  ),
)