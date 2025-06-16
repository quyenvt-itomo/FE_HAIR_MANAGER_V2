import { Button, Select } from "antd";
import React, { useEffect, useState } from "react";

import { Bars3Icon } from "@heroicons/react/24/outline";
import ManagerModal from "./ManagerModal";
import { SelectProps } from "../../models/base/select_props";
import { CategoryData } from "../../models/categories/attribute";
import { useCategoryData } from "../../hooks/categories/useCategoryData";
import { removeVietnameseTones } from "../../utils/searchUtils";
import { IconArrowDown } from "../icon/ArrowDown";

const CategorySelect: React.FC<SelectProps<CategoryData>> = ({
  value,
  defaultData,
  onChange,
  onChangeData,
  placeholder,
  onBlur,
  onFocus,
  ...rest
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isLockHook, setIsLockHook] = useState<boolean>(true);
  const [addSuccess, setAddSuccess] = useState<boolean>(false);

  const {
    categoryData,
    loading,
    isCheckAdd,
    addCategory,
    deleteCategory,
    updateCategory,
  } = useCategoryData({
    isLockHook: isLockHook,
    onCloseModal: () => {},
  });

  useEffect(() => {
    if (!value) return;
    setIsLockHook(false);
  }, [value]);

  useEffect(() => {
    if (!addSuccess || categoryData.length === 0 || !categoryData[0].id) return;

    handleChange(categoryData[0].id);
    setAddSuccess(false);
  }, [categoryData]);

  useEffect(() => {
    if (!isCheckAdd) return;

    setAddSuccess(true);
  }, [isCheckAdd]);

  const handleChange = (value: number) => {
    onChange?.(value);
    const category = categoryData.find((item) => item.id === value);
    onChangeData?.(category);
  };

  return (
    <div className="flex flex-row">
      <Select
        options={categoryData.map((item) => ({
          label: item.name,
          value: item.id,
        }))}
        allowClear
        value={value}
        onChange={handleChange}
        loading={loading}
        showSearch
        placeholder={
          placeholder !== undefined ? placeholder : "Chọn nhóm hàng hóa"
        }
        onFocus={(e) => {
          setIsLockHook(false);
          onFocus?.(e);
        }}
        onBlur={onBlur}
        className="h-9 rounded-e-none"
        style={{
          width: "calc(100% - 36px)",
        }}
        suffixIcon={<IconArrowDown />}
        filterOption={(input, option) =>
          removeVietnameseTones(option?.label as string).includes(
            removeVietnameseTones(input)
          )
        }
        // {...rest}
      />
      <Button
        className="!w-9 !h-9 manager-btn bg-[#FAFAFA] p-0"
        icon={<Bars3Icon className="h-3 w-3" />}
        onClick={() => {
          setIsLockHook(false);
          setOpen(true);
        }}
      />
      <ManagerModal<CategoryData>
        label="Danh sách nhóm hàng hóa"
        open={open}
        dataSource={categoryData}
        loading={loading}
        selectedValue={value}
        onAdd={addCategory}
        onDelete={(data) => {
          if (!data.id) return;
          deleteCategory(data.id);
        }}
        onEdit={updateCategory}
        onSelect={(value) => {
          if (!value.id) return;
          handleChange(value.id);
          setOpen(false);
        }}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export default CategorySelect;
