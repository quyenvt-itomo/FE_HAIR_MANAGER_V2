import { FilterItemProps } from "../models/base/filter_item_model";
import { FiltersModel } from "../models/base/filter_propover_model";

export const convertFilterToList = (
  defaultFilter: Record<string, { value: number; text: string }[]>,
  setList: (items: FilterItemProps[]) => void
) => {
  const newFilterItems: FilterItemProps[] = [];

  for (const key in defaultFilter) {
    defaultFilter[key].forEach((data) => {
      newFilterItems.push({
        key,
        value: data.value,
        text: data.text,
      });
    });
  }

  setList(newFilterItems);
};

export const transformAndStringifyFilters = (arr: FilterItemProps[]) => {
  const grouped = arr.reduce((acc, item) => {
    const key = item.key;
    const value = key === "batch_code" ? item.text : Number(item.value);

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(value);
    return acc;
  }, {} as Record<string, (number | string)[]>);

  return Object.fromEntries(
    Object.entries(grouped).map(([key, values]) => [
      key,
      values.length ? JSON.stringify(values) : undefined,
    ])
  );
};

export const transformFilters = (filters: FiltersModel | null | undefined) => {
  if (!filters) {
    return {
      productIds: undefined,
      supplierIds: undefined,
      customerIds: undefined,
      warehouseIds: undefined,
      employeeIds: undefined,
    };
  }

  const getIdsOrUndefined = (key: keyof FiltersModel): string | undefined => {
    const values = filters[key]?.map((item) => item.value) || [];
    return values.length > 0 ? JSON.stringify(values) : undefined;
  };

  return {
    productIds: getIdsOrUndefined("product"),
    supplierIds: getIdsOrUndefined("supplier"),
    customerIds: getIdsOrUndefined("customer"),
    warehouseIds: getIdsOrUndefined("warehouse"),
    employeeIds: getIdsOrUndefined("employee"),
  };
};
