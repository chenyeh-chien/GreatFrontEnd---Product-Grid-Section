interface FilterInfo {
  id: string;
  selected: boolean;
}

interface FilterCheckboxInfo extends FilterInfo {
  name: string;
}

interface FilterColorInfo extends FilterInfo {
  color: string | null;
}

interface FilterRatingInfo extends FilterInfo {
  totalStar: number;
  currStar: number;
}

export type FilterOptions = {
  collections: FilterCheckboxInfo[];
  category: FilterCheckboxInfo[];
  colors: FilterColorInfo[];
  rating: FilterRatingInfo[];
}