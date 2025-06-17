interface Props {
  name: string;
  children: React.ReactNode
}

export default function OptionSection({ name, children }: Props) {
  return (
    <section className="flex flex-col gap-4 self-stretch">
      <h2 className="font-normal text-sm text-neutral-500">
        {name}
      </h2>
      <div className="flex gap-4 items-center">
        {children}
      </div>
    </section>
  )
}