interface Props {
  label: string;
  isSelected: boolean;
}

export default function Checkbox({ label }: Props) {
  return (
    <div>
      <input 
        type="checkbox" 
        id="123" />
      <label htmlFor="123">{label}</label>
    </div>
  )
}