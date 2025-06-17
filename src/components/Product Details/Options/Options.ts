interface OptionInfo {
  id: string;
  selected: boolean;
}

interface OptionSizeInfo extends OptionInfo {
  name: string;
}

interface OptionColorInfo extends OptionInfo {
  color: string;
}

interface OptionQuantityInfo {
  total: number;
  selected: number;
}

export type Options = {
  colors: OptionColorInfo[];
  sizes: OptionSizeInfo[];
  quantity: OptionQuantityInfo;
}