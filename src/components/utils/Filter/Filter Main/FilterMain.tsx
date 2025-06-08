import type { FilterOptions } from "./filterMain";
import FilterSection from "../Filter Section/FilterSection";
import Checkbox from "../../Input/Checkbox/Checkbox";
import ColorButton from "../../Button/Color Button/ColorButton";
import RatingButton from "../../Button/Rating/RatingButton";

interface Props {
  options: FilterOptions
  onChange: (options: FilterOptions) => void;
}

export default function FilterMain({ options, onChange }: Props) {

  // TODO: handle data change
  function handleChangeCollections(color: string) {
    
  }

  function handleChangeCategories(color: string) {

  }

  function handleChangeColors(color: string) {
    console.log(color)

    onChange({
      ...options,
      
    })
  }

  function handleChangeRating(color: string) {

  }

  return (
    <aside className="w-[248px] flex flex-col gap-6">
      <FilterSection
        name="Collections">
        {options.collections.map(info => {
          return (
            <Checkbox
              key={info.id}
              label={info.name}
              checked={info.selected}/>
          )
        })}
      </FilterSection>
      <hr className="text-neutral-300"/>
      <FilterSection
        name="Category">
        {options.category.map(info => {
          return (
            <Checkbox
              key={info.id}
              label={info.name}
              checked={info.selected}/>
          )
        })}
      </FilterSection>
      <hr className="text-neutral-300"/>
      <FilterSection
        name="Colors">
        <div className="flex flex-wrap gap-2">
          {options.colors.map(info => {
            return (
              <ColorButton 
                key={info.id}
                color={info.color}
                selected={info.selected}
                onChangeColorIndex={(color) => handleChangeColors(color)}/>
            )
          })}
        </div>
      </FilterSection>
      <hr className="text-neutral-300"/>
      <FilterSection
        name="Rating">
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