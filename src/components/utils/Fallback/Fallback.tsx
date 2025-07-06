import { clsx } from "clsx";
import type { IconType } from 'react-icons';

type buttonType = {
  text: string;
  buttonIcon?: IconType;
}

interface Props {
  Icon: IconType;
  mainDesc: string;
  subDesc: string;
  button: buttonType;
  onClick: () => void;
}

export default function Fallback({ 
  Icon, 
  mainDesc, 
  subDesc, 
  button,
  onClick
}: Props) {
  return (
    <section className={clsx(
      "flex flex-col grow-1 justify-center items-center self-stretch",
      "gap-5 p-6"
    )}>
      <div className={clsx(
        "flex justify-center items-center w-12 h-12",
        "bg-white rounded-full shadow-sm",
      )}>
        <Icon 
          className="w-6 h-6 text-indigo-700"
          aria-hidden="true"/>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <h2 className="font-medium text-xl text-center text-neutral-900">
          {mainDesc}
        </h2>
        <h3 className="font-normal text-base text-center text-neutral-900">
          {subDesc}
        </h3>
      </div>
      <button 
        className={clsx(
          "flex gap-1.5 px-4 py-2.5 bg-indigo-700 rounded",
          "font-medium text-base text-white",
          "hover:cursor-pointer",
          "focus:shadow-[0_0_0_4px_rgba(68,76,231,0.12)] focus:outline-none"
        )}
        onClick={onClick}>
        {button.text}
        {button.buttonIcon !== undefined && (
          <div className="flex justify-center items-center">
            <button.buttonIcon/>
          </div>
        )}
      </button>
    </section>
  )
}