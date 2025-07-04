import { clsx } from 'clsx';

interface Props {
  category: "text" | "tag";
  label: string;
  text: string;
}

export default function SummaryInfo({ category, label, text }: Props) {
  return (
    <div className='flex items-center gap-2 self-stretch'>
      {category === "text" && (
        <span 
          className='font-normal text-base text-neutral-600'>
          {label}
        </span>
      )}
      {category === "tag" && (
        <span 
          className={clsx(
            'bg-indigo-50 px-2.5 py-1 rounded-full',
            'border border-solid border-indigo-200',
            'font-normal text-sm text-center text-indigo-700'
          )}>
          {label}
        </span>
      )}
      <span className='font-semibold text-lg text-right text-neutral-900 grow'>
        {text}
      </span>
    </div>
  )
}