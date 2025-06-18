import { clsx } from 'clsx';

interface Props {
  text: string | number;
  selected: boolean;
  disabled: boolean;
  onSelect: (size: string | number) => void;
}

const clothSizeMap: { [size: string]: string } = {
  xs: "XS",
  sm: "S",
  md: "M",
  lg: "L",
  xl: "XL"
}

export default function SizeButton({ text, selected, disabled, onSelect }: Props) {
  return (
    <button 
      className={clsx(
        "w-16 py-3 bg-white rounded",
        "font-medium text-base",
        "hover:cursor-pointer hover:bg-neutral-50",
        "focus:outline-none",
        selected 
        ? "border border-solid border-indigo-600" 
        : "border-neutral-200",
        disabled 
        ? "bg-neutral-100 text-neutral-400" 
        : "border border-solid text-neutral-900",
      )}
      onClick={() => onSelect(text)}>
      {clothSizeMap[text] !== undefined
        ? clothSizeMap[text]
        : text.toString().toUpperCase()}
    </button>
  )
}