import { clsx } from "clsx";

interface Props {
  text: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function BaseButton({ text, children, onClick }: Props) {
  return (
    <button 
      className={clsx(
        "flex justify-center items-center gap-1",
        "bg-white px-3.5 py-2.5 rounded-sm",
        "border-[0.5px] border-solid border-neutral-200",
        "hover:cursor-pointer",
        "focus:shadow-[0_0_0_4px_rgba(68,76,231,0.12)] focus:outline-none"
      )}
      onClick={onClick}>
      {children && <div>{children}</div>}
      <div>{text}</div>
    </button>
  )
}