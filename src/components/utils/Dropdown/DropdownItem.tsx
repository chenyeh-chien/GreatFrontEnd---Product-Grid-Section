import { useRef, useEffect } from "react";
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
  const itemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            onSelect(id);
        }
    };
    
    const current = itemRef.current;
    current?.addEventListener("keydown", handleKeyDown);

    return () => {
      current?.removeEventListener("keydown", handleKeyDown);
    }
  }, [id, onSelect])

  return (
    <li 
      ref={itemRef}
      className={clsx(
        "text-sm p-2 rounded",
        "hover:bg-neutral-50 hover:cursor-pointer",
        "focus:border focus:border-solid focus:border-indigo-200 focus:outline-none",
        "disabled:text-neutral-400", 
        selected ? "font-medium text-indigo-700" : "font-normal text-neutral-600", 
      )}
      role="menuitem"
      tabIndex={0}
      onClick={() => onSelect(id)}>
      {option}
    </li>
  )
}