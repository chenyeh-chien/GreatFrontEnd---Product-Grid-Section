import { clsx } from "clsx";
import type { RefCallback } from "react";
import type { DropdownInfo } from "./dropdown.ts";
import DropdownItem from "./DropdownItem";

interface Props {
  options: DropdownInfo[]; // text, selected, id
  floatingStyles: React.CSSProperties;
  setFloating: RefCallback<HTMLElement>;
  onSelect: (id: string) => void; 
}

export default function DropdownList({ options, floatingStyles, setFloating, onSelect }: Props) {
  return (
    <ul 
      className={clsx(
        "mt-2 w-[229px] flex flex-col gap-2 p-2 bg-white",
        "rounded-lg border border-solid border-neutral-200"
      )}
      style={floatingStyles}
      ref={setFloating}>
      {options.map(option => {
        return (
          <DropdownItem
            key={option.id}
            id={option.id}
            option={option.text}
            selected={option.selected}
            onSelect={(id) => onSelect(id)}/>
        )
      })}
    </ul>
  )
}