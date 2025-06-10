import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import type { FilterOptions } from "./filterMain";
import FilterSection from "../Filter Section/FilterSection";
import Checkbox from "../../Input/Checkbox/Checkbox";
import ColorButton from "../../Button/Color Button/ColorButton";
import RatingButton from "../../Button/Rating/RatingButton";

interface Props {
  options: FilterOptions
  onChange: (options: FilterOptions) => void;
  onReset: () => void;
  onClose: () => void;
}

export default function FilterMain({ options, onChange, onReset, onClose }: Props) {
  const [appliedFilter, setAppliedFilter] = useState(0);

  useEffect(() => {
    setAppliedFilter(
      Object.values(options).reduce((accum, val) => {
        return accum + val.filter(item => item.selected).length;
      }, 0)
    )
  }, [options, setAppliedFilter])

  // TODO: handle data change
  function handleChangeCollections(id: string) {
    const collections = structuredClone(options.collections);
    const index = collections.findIndex((item) => item.id === id);
    if (index === -1) {
      return;
    }

    collections[index].selected = !collections[index].selected;

    onChange({
      ...options,
      collections
    })
  }

  function handleChangeCategories(id: string) {
    const category = structuredClone(options.category);
    const index = category.findIndex((item) => item.id === id);
    if (index === -1) {
      return;
    }

    category[index].selected = !category[index].selected;

    onChange({
      ...options,
      category
    })
  }

  function handleChangeColors(color: string) {
    const colors = structuredClone(options.colors);
    const index = colors.findIndex((item) => item.color === color);
    if (index === -1) {
      return;
    }

    colors[index].selected = !colors[index].selected;

    onChange({
      ...options,
      colors
    })
  }

  function handleChangeRating(id: string) {
    const rating = structuredClone(options.rating);
    const index = rating.findIndex((item) => item.id === id);
    if (index === -1) {
      return;
    }

    rating[index].selected = !rating[index].selected;

    onChange({
      ...options,
      rating
    })
  }

  return (
    <aside className="flex flex-col gap-6 w-full h-max xl:w-[248px]">
      <div className="flex gap-2 items-center self-stretch justify-between">
        <h1 className="font-normal text-xl text-neutral-900">
          Filter
        </h1>
        <button onClick={onClose}>
          <RxCross2
            className="w-6 h-6 hover:cursor-pointer"
            aria-label="Close filter menu" />
        </button>
      </div>
      <hr className="text-neutral-300"/>
      <FilterSection
        name="Collections">
        {options.collections.map(info => {
          return (
            <Checkbox
              key={info.id}
              id={info.id}
              label={info.name}
              checked={info.selected} 
              onCheck={(id) => handleChangeCollections(id)}/>
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
              id={info.id}
              label={info.name}
              checked={info.selected}
              onCheck={(id) => handleChangeCategories(id)}/>
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
              id={info.id}
              totalStar={info.totalStar}
              currStar={info.currStar}
              selected={info.selected} 
              onClick={(id) => handleChangeRating(id)}/>
          )
        })}
      </FilterSection>
      {appliedFilter > 0 && (
        <>
          <hr className="text-neutral-300"/>
          <button 
            className="font-medium text-base text-indigo-700 hover:cursor-pointer"
            onClick={onReset}>
            Clear All ({appliedFilter})
          </button>
        </>
      )}
    </aside>
  )
}