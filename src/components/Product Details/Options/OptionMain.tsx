import type { Options } from './Options';
import OptionSection from "./OptionSection";
import ColorButton from "../../utils/Button/Color Button/ColorButton";
import SizeButton from "../../utils/Button/Size/SizeButton";
import QuantityButton from "../../utils/Button/Quantity/QuantityButton";

interface Props {
  options: Options;
  onChange: (options: Options) => void;
}

export default function OptionMain({ options, onChange }: Props) {
  function handleChangeColorIndex(color: string) {
    const colors = structuredClone(options.colors);
    const index = colors.findIndex((item) => item.color === color);
    if (index === -1) {
      return;
    }
    
    colors.forEach(item => item.selected = false);
    colors[index].selected = !colors[index].selected;

    onChange({
      ...options,
      colors
    })
  }

  function handleSelectSize(size: string | number) {
    const sizes = structuredClone(options.sizes);
    const index = sizes.findIndex((item) => item.name === size);
    if (index === -1) {
      return;
    }

    sizes.forEach(item => item.selected = false);
    sizes[index].selected = !sizes[index].selected;

    onChange({
      ...options,
      sizes
    })
  }

  function handleChangeQuantity(selected: number) {
    const quantity = structuredClone(options.quantity);
    quantity.selected = selected;

    onChange({
      ...options,
      quantity
    })
  }

  return (
    <section className="flex flex-col gap-8 self-stretch">
      <OptionSection
        name='Available Colors'>
        {options.colors.map(item => {
          return (
            <ColorButton 
              key={item.id}
              color={item.color}
              selected={item.selected}
              size='lg'
              onChangeColorIndex={handleChangeColorIndex}/>
          )
        })}
      </OptionSection>
      {options.sizes.length > 0 && (
        <OptionSection
          name='Available Sizes'>
          {options.sizes.map(item => {
            return (
              <SizeButton 
                key={item.id}
                text={item.name}
                selected={item.selected}
                disabled={false}
                onSelect={handleSelectSize}/>
            )
          })}
        </OptionSection>
      )}
      <OptionSection
        name='Quantity'>
        <QuantityButton 
          quantity={options.quantity.selected}
          incrementDisabled={options.quantity.selected >= options.quantity.total}
          decrementDisabled={options.quantity.selected <= 0}
          onChange={handleChangeQuantity}/>
      </OptionSection>
    </section>
  )
}