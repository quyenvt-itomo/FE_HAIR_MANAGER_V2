import { FilterItemProps } from "../models/base/filter_item_model";

export function getIdsByKey(listFilterItems: FilterItemProps[], key: string) {
  return JSON.stringify(
    listFilterItems.filter((item) => item.key === key).map((item) => item.value)
  );
}
