import type { RefCallback } from 'react';
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import { clsx } from "clsx";

interface Props {
  text: string;
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  setReference: RefCallback<HTMLElement>;
}

export default function DropdownButton({ text, isOpen, setIsOpen, setReference }: Props) {
  return (
    <button 
      className={clsx(
        "flex justify-center items-center gap-1",
        "px-3.5 py-2.5 bg-white",
        "rounded border-[0.5px] border-solid border-neutral-200",
        "hover:bg-neutral-50 hover:cursor-pointer disabled:text-neutral-400",
        "focus:shadow-[0_0_0_4px_rgba(68,76,231,0.12)] focus:outline-none"
      )}
      ref={setReference}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      onClick={() => setIsOpen(!isOpen)}>
      <span>{text}</span>
      <span className="flex justify-center items-center w-5 h-5">
      {
        isOpen 
        ? <FaAngleUp/>
        : <FaAngleDown/>
      }
      </span>
    </button>
  )
}