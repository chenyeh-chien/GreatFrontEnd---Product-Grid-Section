import { useState } from 'react';
import { NavLink } from "react-router";
import { clsx } from 'clsx';
import type { EcommerceCartItem } from '../../utils/types';
import { useCartStore } from '../../../stores/useCartStore';
import { capitalize } from '../../utils/utilFunctions';
import QuantityButton from '../../utils/Button/Quantity/QuantityButton';
import Modal from '../../utils/Modal/Modal';

interface Props {
  item: EcommerceCartItem;
  itemIndex: number;
}

const clothSizeMap: { [size: string]: string } = {
  xs: "Extra Small",
  sm: "Small",
  md: "Middle",
  lg: "Large",
  xl: "Extra Large"
}

export default function CartCard({ item, itemIndex }: Props) {
  const [showModal, setShowModal] = useState(false);
  const updateCartItem = useCartStore((state) => state.updateCartItem);
  const removeCartItem = useCartStore((state) => state.removeCartItem);

  function handleChangeQuantity(quantity: number) {
    const cart = structuredClone(item);
    cart.quantity = quantity;
    console.log(cart)

    updateCartItem(itemIndex, cart);
  }

  function handleRemoveCartItem(index: number) {
    setShowModal(false);
    removeCartItem(index);
  }

  return (
    <figure className={clsx(
      'flex flex-col gap-4 self-stretch',
      'md:flex-row md:gap-8'
    )}>
      <img 
        className={clsx(
          'h-[200px] object-cover rounded-lg',
          'md:w-[280px] md:min-w-[280px]'
        )}
        src={item.unit.image_url}/>
      <div className="flex flex-col gap-4 grow self-stretch">
        <NavLink
          className="w-max"
          to={`/product-details?productID=${item.product.product_id}`}>
          <h2 
            className={clsx(
              'font-medium text-2xl text-neutral-900 w-max',
              'hover:text-indigo-700'
            )}>
            {item.product.name}
          </h2>
        </NavLink>
        <div className='font-medium text-base text-neutral-600'>
          <span>{capitalize(item.unit.color!)}</span>
          {item.unit.size !== null && (
            <span> &bull; {(
              clothSizeMap[item.unit.size] !== undefined
              ? clothSizeMap[item.unit.size]
              : item.unit.size
            )}</span>
          )}
        </div>
        <figcaption className='font-normal text-sm text-neutral-600'>
          {item.product.description}
        </figcaption>
        <div className='flex gap-4 self-stretch'>
          <QuantityButton 
            quantity={item.quantity}
            incrementDisabled={item.quantity >= item.unit.stock}
            decrementDisabled={item.quantity <= 0}
            onChange={handleChangeQuantity}/>
          <Modal
            width={592}
            title='Change of stock'
            text='While you were browsing, certain stocks have become unavailable:'
            confirmText="Ok"
            showCancelButton={false}
            onClose={() => setShowModal(false)}
            onConfirm={() => handleRemoveCartItem(itemIndex)}>
            TODO
          </Modal>
          <div className='flex items-center grow'>
            <button 
              className={clsx(
                'rounded px-0.5 font-medium text-sm text-neutral-600',
                'hover:text-neutral-900 hover:cursor-pointer',
                'focus:bg-white',
                'focus:shadow-[0_0_0_4px_rgba(68,76,231,0.12)] focus:outline-none',
                'disabled:text-neutral-400'
              )}
              onClick={() => setShowModal(true)}>
              Remove
            </button>
            {showModal && (
              <Modal
                width={343}
                title='Confirm Item Removal'
                text='Are you sure you want to remove this item from your shopping cart?'
                onClose={() => setShowModal(false)}
                onConfirm={() => handleRemoveCartItem(itemIndex)}/>
            )}
          </div>
          <div className='flex justify-end items-center gap-2'>
            <span className='font-medium text-lg text-right text-neutral-900'>
              ${item.unit.sale_price}
            </span>
            {item.unit.sale_price !== item.unit.list_price && 
              <span className='font-normal text-xs line-through text-neutral-600'>
                ${item.unit.list_price}
              </span>
            }
          </div>
        </div>
      </div>
    </figure>
  )
}