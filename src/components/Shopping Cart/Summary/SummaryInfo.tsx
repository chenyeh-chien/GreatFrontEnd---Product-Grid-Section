interface Props {
  label: string;
  text: string;
}

export default function SummaryInfo({ label, text }: Props) {
  return (
    <div className='flex items-center gap-2 self-stretch'>
      <span className='font-normal text-base text-neutral-600'>
        {label}
      </span>
      <span className='font-semibold text-lg text-right text-neutral-900 grow'>
        {text}
      </span>
    </div>
  )
}