import { clsx } from "clsx";

interface Props {
  id: string;
  label: string;
  checked: boolean;
  disabled: boolean;
}

export default function Checkbox({ 
  id,
  label,
  checked,
  disabled
}: Props) {


  return (
    <label className={clsx(
      "flex items-center gap-3",
      "font-normal text-base",
      disabled ? "text-neutral-400" : "text-neutral-600",
    )}>
      <div className="flex items-center">
        <input 
          className={clsx(
            "w-4 h-4 rounded-sm accent-indigo-600",
            "focus:outline-indigo-600",
            "disabled:bg-neutral-200"
          )}
          type="checkbox" 
          disabled/>
      </div>
      {label}
    </label>
  )
}