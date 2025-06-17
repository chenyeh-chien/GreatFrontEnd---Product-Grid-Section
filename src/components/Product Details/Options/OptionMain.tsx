import type { Options } from './Options';
import OptionSection from "./OptionSection";
import ColorButton from "../../utils/Button/Color Button/ColorButton";
import SizeButton from "../../utils/Button/Size/SizeButton";
import QuantityButton from "../../utils/Button/Quantity/QuantityButton";

interface Props {
  options: Options;
}

export default function OptionMain({ options }: Props) {
  function handleChangeColorIndex(color: string) {
    console.log(color)
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
              onChangeColorIndex={(color: string) => handleChangeColorIndex(color)}/>
          )
        })}
      </OptionSection>
      {options.sizes.length > 0 && (
        <OptionSection
          name='Available Sizes'>
          {options.sizes.map(item => {
            return (
              <SizeButton 
                text={item.name}
                selected={item.selected}
                disabled={false}/>
            )
          })}
        </OptionSection>
      )}
      <OptionSection
        name='Quantity'>
        <QuantityButton 
          quantity={options.quantity.selected}
          onChange={(quantity) => console.log(quantity)}/>
      </OptionSection>
    </section>
  )
}