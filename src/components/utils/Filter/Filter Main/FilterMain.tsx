import FilterSection from "../Filter Section/FilterSection";
import Checkbox from "../../Input/Checkbox/Checkbox";

export default function FilterMain() {
  // TODO: data structure

  return (
    <aside className="w-[248px]">
      <FilterSection
        name="Collections"
        isExtending={false}>
        <Checkbox 
          id="123"
          label="Latest arrivals"/>
      </FilterSection>
      <FilterSection
        name="Category"
        isExtending={false}>
        { 123 }
      </FilterSection>
      <FilterSection
        name="Colors"
        isExtending={false}>
        { 123 }
      </FilterSection>
      <FilterSection
        name="Rating"
        isExtending={false}>
        { 123 }
      </FilterSection>
    </aside>
  )
}