import { clsx } from 'clsx';

interface Props {
  text: string;
  disabled?: boolean;
  onClick: () => void;
}

export default function ConfirmButton({ 
  text, 
  disabled, 
  onClick 
}: Props) {
  return (
    <button 
      className={clsx(
        'grow px-5 py-3 rounded md:px-6 md:py-4',
        'bg-indigo-700 font-medium text-base text-white',
        'hover:cursor-pointer hover:bg-indigo-800',
        'focus:shadow-[0_0_0_4px_rgba(68,76,231,0.12)] focus:outline-none'
      )}
      onClick={onClick}
      disabled={disabled}>
      {text}
    </button>
  )
}