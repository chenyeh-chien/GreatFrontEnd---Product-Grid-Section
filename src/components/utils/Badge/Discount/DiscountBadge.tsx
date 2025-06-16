import { clsx } from "clsx";

interface Props {
  display: "percentage" | "currency";
  percentage?: number;
  currency?: number;
}

export default function DiscountBadge({ 
  display, 
  percentage, 
  currency 
}: Props) {
  return (
    <span className={clsx(
      "flex gap-1 items-center px-2.5 py-1",
      "rounded-full border border-solid font-normal text-sm text-center",
      display === "currency" 
      ? "bg-green-50 border-green-200 text-green-700"
      : "bg-amber-50 border-amber-200 text-amber-700"
    )}>
      {display === "currency"
        ? <span>${currency}</span> 
        : <span>{percentage}%</span>}
      <span>OFF</span>
    </span>
  )
}