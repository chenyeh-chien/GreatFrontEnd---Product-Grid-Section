import type { FilterOptions } from "./filterMain";
import FilterSection from "../Filter Section/FilterSection";
import Checkbox from "../../Input/Checkbox/Checkbox";
import ColorButton from "../../Button/Color Button/ColorButton";
import RatingButton from "../../Button/Rating/RatingButton";

interface Props {
  options: FilterOptions
}

export default function FilterMain({ options }: Props) {
  // TODO: data structure

  function handleChangeColorIndex(color: string) {
    // change colors

  }

  return (
    <aside className="w-[248px] flex flex-col gap-6">
      <FilterSection
        name="Collections"
        isExtending={false}>
        {options.collections.map(info => {
          return (
            <Checkbox
              key={info.id}
              label={info.name}
              checked={info.selected}/>
          )
        })}
      </FilterSection>
      <hr />
      <FilterSection
        name="Category"
        isExtending={false}>
        {options.category.map(info => {
          return (
            <Checkbox
              key={info.id}
              label={info.name}
              checked={info.selected}/>
          )
        })}
      </FilterSection>
      <hr />
      <FilterSection
        name="Colors"
        isExtending={false}>
        <div className="flex flex-wrap gap-2">
          {options.colors.map(info => {
            return (
              <ColorButton 
                key={info.id}
                color={info.color}
                selected={info.selected}
                onChangeColorIndex={(color) => handleChangeColorIndex(color)}/>
            )
          })}
        </div>
      </FilterSection>
      <hr />
      <FilterSection
        name="Rating"
        isExtending={false}>
        {options.rating.map(info => {
          return (
            <RatingButton 
              key={info.id}
              totalStar={info.totalStar}
              currStar={info.currStar}
              selected={info.selected} />
          )
        })}
      </FilterSection>
    </aside>
  )
}