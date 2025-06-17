import OptionSection from "./OptionSection";
import ColorButton from "../../utils/Button/Color Button/ColorButton";
import SizeButton from "../../utils/Button/Size/SizeButton";
import QuantityButton from "../../utils/Button/Quantity/QuantityButton";

interface Props {
  options: any;
}

export default function OptionMain({ options }: Props) {
  function handleChangeColorIndex(color: string) {
    console.log(color)
  }

  return (
    <section className="flex flex-col gap-8 self-stretch">
      <OptionSection
        name='Available Colors'>
        <ColorButton 
          key="123"
          color="black"
          selected={true}
          onChangeColorIndex={(color: string) => handleChangeColorIndex(color)}/>
      </OptionSection>
      <OptionSection
        name='Available Sizes'>
        <SizeButton 
          text="XS"
          selected={true}
          disabled={true}/>
      </OptionSection>
      <OptionSection
        name='Quantity'>
        <QuantityButton 
          quantity={1}
          onChange={(quantity) => console.log(quantity)}/>
      </OptionSection>
    </section>
  )
}