import { useState, useRef } from "react";
import { useFloating, offset, flip, shift, autoUpdate } from "@floating-ui/react";
import type { DropdownInfo } from "./dropdown.ts";
import { 
  useEscape,
  useClickOutside
} from "../hooks.ts";
import DropdownButton from "../Button/Dropdown/DropdownButton";
import DropdownList from "./DropdownList";

interface Props {
  text: string;
  options: DropdownInfo[];
  onSelect: (id: string) => void; 
}

export default function Dropdown({ text, options, onSelect }: Props) {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  useEscape(setIsOpen);
  useClickOutside(setIsOpen, dropdownRef);

  const { refs, floatingStyles } = useFloating({
    placement: 'bottom-start',
    middleware: [offset(6), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  function handleSelectOption(id: string) {
    onSelect(id);
    setIsOpen(false);
  }

  return (
    <div ref={dropdownRef}>
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
          onSelect={(id) => handleSelectOption(id)}/>
      )}
    </div>
  )
}