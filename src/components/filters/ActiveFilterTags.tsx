import React from "react";
import { icons } from "../../assets/icons";
import { FiltersModel, FilterType } from "../../models/base/filter_propover_model";

interface ActiveFilterTagsProps {
  filters: FiltersModel;
  onRemove: (filter: { key: FilterType; value: number }) => void;
}

const ActiveFilterTags: React.FC<ActiveFilterTagsProps> = ({
  filters,
  onRemove,
}) => {
  return (
    <div className="flex gap-4">
      {Object.entries(filters).flatMap(([key, items]) =>
        items.map((item) => (
          <div
            key={`${key}-${item.value}`}
            className=" text-primary mt-2 flex items-center w-fit"
          >
            <span className="whitespace-nowrap  font-light">{item.text}</span>
            <button
              className="w-6 h-6 text-red-500"
              onClick={() =>
                onRemove({ key: key as FilterType, value: item.value })
              }
            >
              <img src={icons.remove} alt="Remove" />
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ActiveFilterTags;
