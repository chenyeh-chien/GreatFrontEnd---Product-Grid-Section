import './ColorButton.scss';

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
    if (isSelected) {
        return;
    }

    onChangeColorIndex(color);
  }

  return (
    <span 
      className={isSelected ? 'color-button color-button__selected' : 'color-button'}
      style={{backgroundColor: color}}
      onClick={(e) => handleSelectColor(e, color)}>
    </span>
  )
}