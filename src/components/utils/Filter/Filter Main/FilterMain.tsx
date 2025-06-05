import FilterSection from "../Filter Section/FilterSection"

export default function FilterMain() {
  return (
    <aside>
      <FilterSection
        name="Test Section 1"
        isExtending={false}>
        { 123 }
      </FilterSection>
    </aside>
  )
}