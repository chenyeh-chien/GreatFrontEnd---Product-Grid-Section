import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { clsx } from 'clsx';


interface Props {
  quantity: number;
  incrementDisabled?: boolean;
  decrementDisabled?: boolean;
  onChange: (quantity: number) => void;
}

export default function QuantityButton({ 
  quantity,
  incrementDisabled,
  decrementDisabled,
  onChange
}: Props) {
  function handleIncrement() {
    if (incrementDisabled) {
      return;
    }

    onChange(quantity + 1);
  }

  function handleDecrement() {
    if (decrementDisabled) {
      return;
    }

    onChange(quantity - 1);
  }

  return (
    <button className={clsx(
      'flex justify-center items-center gap-3 p-0.5',
      'rounded-md border border-solid border-neutral-200 bg-neutral-50'
    )}>
      <span 
        className={clsx(
          "flex justify-center items-center w-5 h-5",
          "hover:cursor-pointer",
          decrementDisabled ? "text-neutral-400" : "text-neutral-600"
        )}
        onClick={handleDecrement}>
        <FaMinus />
      </span>
      <span className="w-[49px] px-3 py-1.5">
        {quantity}
      </span>
      <span 
        className={clsx(
          "flex justify-center items-center w-5 h-5",
          "hover:cursor-pointer",
          incrementDisabled ? "text-neutral-400" : "text-neutral-600"
        )}
        onClick={handleIncrement}>
        <FaPlus />
      </span>
    </button>
  )
}