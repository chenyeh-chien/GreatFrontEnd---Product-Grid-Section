import { clsx } from "clsx";

interface Props {
  id: string;
  option: string;
  selected: boolean;
  onSelect: (id: string) => void; 
}

export default function DropdownItem({ 
  id, 
  option, 
  selected, 
  onSelect 
}: Props) {
  return (
    <li 
      className={clsx(
        "text-sm p-2 rounded",
        "hover:bg-neutral-50 hover:cursor-pointer",
        "focus:border focus:border-solid focus:border-indigo-200 focus:outline-none",
        "disabled:text-neutral-400", 
        selected ? "font-medium text-indigo-700" : "font-normal text-neutral-600", 
      )}
      tabIndex={0}
      onClick={() => onSelect(id)}>
      {option}
    </li>
  )
}