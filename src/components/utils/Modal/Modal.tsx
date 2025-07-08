import { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { RxCross2 } from "react-icons/rx";
import { clsx } from 'clsx';
import BaseButton from '../Button/BaseButton';
import ConfirmButton from '../Button/Confirm/ConfirmButton';

interface Props {
  title: string;
  text: string;
  confirmText?: string;
  cancelText?: string;
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
}

export default function Modal({ 
  title, 
  text,
  confirmText,
  cancelText,
  showConfirmButton,
  showCancelButton,
}: Props) {
  const displayConfirmButton = useMemo(() => {
    return showConfirmButton ?? true;
  }, [showConfirmButton])

  const displayCancelButton = useMemo(() => {
    return showCancelButton ?? true;
  }, [showCancelButton])

  function handleClose() {
    
  }

  function handleConfirm() {

  }

  function handleCancel() {

  }

  return ReactDOM.createPortal(
    <div className={clsx(
      'fixed inset-0 z-50 bg-black/50',
      'flex items-center justify-center',
    )}>
      <dialog open className={clsx(
        "relative w-[343px] flex flex-col gap-8 bg-white p-6 rounded-lg"
      )}>
        <div className='flex flex-col gap-1'>
          <div className='flex items-center justify-between'>
            <h2 className='font-semibold text-lg text-neutral-900'>
              {title}
            </h2>
            <button onClick={handleClose}>
              <RxCross2 
                className='text-neutral-600 hover:cursor-pointer'/>
            </button>
          </div>
          <div className='font-normal text-sm text-neutral-600'>
            {text}
          </div>
        </div>
        <div className='flex gap-3'>
          {displayCancelButton && (
            <BaseButton 
              text={cancelText ?? "Cancel"}
              onClick={handleCancel}/>
          )}
          {displayConfirmButton && (
            <ConfirmButton 
              text={confirmText ?? "Confirm"}
              onClick={handleConfirm}/>
          )}
        </div>
      </dialog>
    </div>,
    document.getElementById('modal-root')!
  )
}

/*

<dialog className={clsx(
        "relative bg-white p-6 rounded shadow-lg w-full max-w-md mx-auto"
      )}>
        <h2>{title}</h2>
        <div>{text}</div>
        {showConfirmButton && (
          <ConfirmButton 
            text={confirmText ?? "Confirm"}
            onClick={handleConfirm}/>
        )}
      </dialog>

*/