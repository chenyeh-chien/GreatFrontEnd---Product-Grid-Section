import { useState } from "react";
import { FiMinusCircle } from "react-icons/fi";
import { FiPlusCircle } from "react-icons/fi";
import { v4 as uuidv4 } from 'uuid';
import { clsx } from "clsx";

interface Props {
  name: string;
  descriptions: string[];
  showBorder: boolean;
}

export default function InfoSection({ name, descriptions, showBorder }: Props) {
  const [isExtending, setIsExtending] = useState(true);
  const [showContent, setShowContent] = useState(true);

  function handleExtendContent() {
    const targetVal = !isExtending;
    
    if (targetVal) {
      setShowContent(true);
    }

    setIsExtending(targetVal)
  }

  function handleDisplayContent() {
    if (showContent) {
      setShowContent(!showContent);
    }
  }

  return (
    <section 
      className={clsx(
        'flex gap-6 self-stretch justify-between',
        showBorder && 'pt-6 border-t border-solid border-neutral-200'
      )}>
      <div className="flex flex-col gap-2 self-stretch">
        <h2 className="font-medium text-lg text-neutral-900">{name}</h2>
        <ul 
          className={clsx(
            "list-disc list-outside", 
            "duration-300 ease-in-out",
            isExtending ? "opacity-100 h-full" : "opacity-0 h-0",
            !showContent && "hidden",
          )}
          onTransitionEnd={handleDisplayContent}>
          {descriptions.map(desc => {
            return (
              <li 
                className="font-normal text-base text-neutral-600 ml-6"
                key={uuidv4()}>
                {desc}
              </li>
            )
          })}
        </ul>
      </div>
      <div>
        <button 
          className="text-neutral-400 hover:cursor-pointer"
          onClick={handleExtendContent}>
          {
            isExtending 
            ? <FiMinusCircle className="w-5 h-5"/>
            : <FiPlusCircle className="w-5 h-5"/>
          }
        </button>
      </div>
    </section>
  )
}