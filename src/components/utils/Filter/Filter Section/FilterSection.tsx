import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { clsx } from "clsx";

interface Props {
  name: string;
  children: React.ReactNode
}

export default function FilterSection({ 
  name,
  children 
}: Props) {
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
    <section className="flex flex-col gap-6 self-stretch">
      <div className="flex gap-2 items-center self-stretch justify-between">
        <h1 className="font-medium text-base text-neutral-900">{name}</h1>
        <button 
          className="flex justify-center items-center w-6 h-6 hover:cursor-pointer"
          onClick={handleExtendContent}>
          {
            isExtending 
            ? <FaMinus className="w-5 h-5"/>
            : <FaPlus className="w-5 h-5"/>
          }
        </button>
      </div>
      <div 
        className={clsx(
          "flex flex-col gap-6 self-stretch",
          "duration-300 ease-in-out",
          isExtending ? "opacity-100 h-full" : "opacity-0 h-0",
          !showContent && "hidden",
        )}
        onTransitionEnd={handleDisplayContent}>
        {children}
      </div>
    </section>
  )
}