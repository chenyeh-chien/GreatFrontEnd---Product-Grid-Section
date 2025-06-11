import { useState } from "react";
import { useFloating, offset, flip, shift, autoUpdate } from "@floating-ui/react";
import type { DropdownInfo } from "./dropdown.ts";
import DropdownButton from "../Button/Dropdown/DropdownButton";
import DropdownList from "./DropdownList";

interface Props {
  text: string;
  options: DropdownInfo[];
  onSelect: (id: string) => void; 
}

export default function Dropdown({ text, options, onSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles } = useFloating({
    placement: 'bottom-start',
    middleware: [offset(6), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  return (
    <div>
      <DropdownButton 
        setReference={refs.setReference}
        text={text}
        isOpen={isOpen}
        setIsOpen={setIsOpen}/>
      {isOpen && (
        <DropdownList 
          setFloating={refs.setFloating}
          floatingStyles={floatingStyles}
          options={options}
          onSelect={(id) => onSelect(id)}/>
      )}
    </div>
    
  )
}