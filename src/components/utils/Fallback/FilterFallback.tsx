import { clsx } from "clsx";
import { RiTShirt2Line } from "react-icons/ri";

interface Props {
  onReset: () => void;
}

export default function FilterFallback({ onReset }: Props) {
  return (
    <section className={clsx(
      "flex flex-col grow-1 justify-center items-center self-stretch",
      "gap-5 p-6"
    )}>
      <div className={clsx(
        "flex justify-center items-center w-12 h-12",
        "bg-white rounded-full shadow-sm",
      )}>
        <RiTShirt2Line 
          className="w-6 h-6 text-indigo-700"
          aria-hidden="true"/>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <h2 className="font-medium text-xl text-center text-neutral-900">
          Nothing found just yet
        </h2>
        <h3 className="font-normal text-base text-center text-neutral-900">
          Adjust your filters a bit, and let's see what we can find!
        </h3>
      </div>
      <button 
        className={clsx(
          "px-4 py-2.5 bg-indigo-700 rounded",
          "font-medium text-base text-white",
          "hover:cursor-pointer",
          "focus:shadow-[0_0_0_4px_rgba(68,76,231,0.12)] focus:outline-none"
        )}
        onClick={onReset}>
        Reset filters
      </button>
    </section>
  )
}