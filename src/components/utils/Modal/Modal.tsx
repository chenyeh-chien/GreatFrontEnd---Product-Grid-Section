import { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { RxCross2 } from "react-icons/rx";
import { clsx } from 'clsx';
import BaseButton from '../Button/BaseButton';
import ConfirmButton from '../Button/Confirm/ConfirmButton';

interface Props {
  width?: number;
  title: string;
  text: string;
  confirmText?: string;
  cancelText?: string;
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  children?: React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
}

export default function Modal({ 
  width,
  title, 
  text,
  confirmText,
  cancelText,
  showConfirmButton,
  showCancelButton,
  children,
  onClose,
  onConfirm
}: Props) {
  const displayWidth = useMemo(() => {
    if (width === undefined) {
      return "max-content";
    }

    return `${width}px`;
  }, [width])

  const displayConfirmButton = useMemo(() => {
    return showConfirmButton ?? true;
  }, [showConfirmButton])

  const displayCancelButton = useMemo(() => {
    return showCancelButton ?? true;
  }, [showCancelButton])

  return ReactDOM.createPortal(
    <div className={clsx(
      'fixed inset-0 z-50 bg-black/50',
      'flex items-center justify-center',
    )}>
      <div
        className={clsx(
          `relative flex flex-col gap-8 bg-white p-6 rounded-lg`
        )}
        style={{ width: displayWidth }}>
        <div className='flex flex-col gap-1'>
          <div className='flex items-center justify-between'>
            <h2 className='font-semibold text-lg text-neutral-900'>
              {title}
            </h2>
            <button onClick={onClose}>
              <RxCross2 
                className='text-neutral-600 hover:cursor-pointer'/>
            </button>
          </div>
          <div className='font-normal text-sm text-neutral-600  min-w-full'>
            {text}
          </div>
        </div>
        {children}
        <div className='flex gap-3'>
          {displayCancelButton && (
            <BaseButton 
              text={cancelText ?? "Cancel"}
              onClick={onClose}/>
          )}
          {displayConfirmButton && (
            <ConfirmButton 
              text={confirmText ?? "Confirm"}
              onClick={onConfirm}/>
          )}
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')!
  )
}