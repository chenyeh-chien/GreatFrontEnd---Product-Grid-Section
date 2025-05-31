import { clsx } from 'clsx';

interface Props {
    color: string;
    isSelected: boolean;
    onChangeColorIndex: (color: string) => void;
}

export default function ColorButton({ 
  color, 
  isSelected,
  onChangeColorIndex 
}: Props) {
  function handleSelectColor(
    event: React.MouseEvent, 
    color: string
  ) {
    event.preventDefault();
    if (isSelected) {
        return;
    }

    onChangeColorIndex(color);
  }

  return (
    <button 
      className={clsx(
        'inline-block w-4 h-4',
        'rounded-full border-[0.5px] border-solid border-gray-200',
        'hover:cursor-pointer', isSelected && 'border-gray-400'
      )}
      style={{backgroundColor: color}}
      onClick={(e) => handleSelectColor(e, color)}>
    </button>
  )
}