interface Props {
  name: string;
}

export default function OptionSection({ name }: Props) {
  return (
    <section>
      <h2>{name}</h2>
    </section>
  )
}