import { clsx } from 'clsx';

interface Props {
  text: string | number;
  selected: boolean;
  disabled: boolean;
}

export default function SizeButton({ text, selected, disabled }: Props) {
  return (
    <button className={clsx(
      "px-5 py-3 bg-white rounded",
      "font-medium text-base",
      "hover:cursor-pointer hover:bg-neutral-50",
      "focus:outline-none",
      selected 
      ? "border border-solid border-indigo-600" 
      : "border-neutral-200",
      disabled 
      ? "bg-neutral-100 text-neutral-400" 
      : "border border-solid text-neutral-900",
    )}>
      {text.toString().toUpperCase()}
    </button>
  )
}