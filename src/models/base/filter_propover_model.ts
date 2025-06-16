export type FilterType =
  | "product"
  | "supplier"
  | "customer"
  | "warehouse"
  | "employee";

export interface elementOptionProp {
  label: string;
  value: number;
}

export interface elementProps {
  key: string;
  value: string;
  options: elementOptionProp[];
}

export type FiltersModel = {
  [key in FilterType]: { value: number; text: string }[];
};

export interface ClearFilterModel {
  key: FilterType;
  value: number;
}
