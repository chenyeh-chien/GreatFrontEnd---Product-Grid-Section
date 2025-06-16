import { clsx } from "clsx";

interface Props {
  text: string;
  url: string;
}

export default function StyledLink({ text, url }: Props) {
  return (
    <a 
      className={clsx(
        "rounded font-medium text-base text-indigo-700",
        "hover:text-indigo-800",
        "focus:shadow-[0_0_0_4px_rgba(68,76,231,0.12)] focus:outline-none",
        "disabled:text-neutral-400"
      )}
      href={url}>
      {text}
    </a>
  )
}