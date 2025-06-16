import { Button, Select } from "antd";
import React, { useEffect, useState } from "react";

import { Bars3Icon } from "@heroicons/react/24/outline";
import ManagerModal from "./ManagerModal";
import { SelectProps } from "../../models/base/select_props";
import { ProductGroupData } from "../../models/categories/product_group";
import { useProductGroupData } from "../../hooks/categories/useProductGroupData";
import { removeVietnameseTones } from "../../utils/searchUtils";
import { IconArrowDown } from "../icon/ArrowDown";

const ProductGroupSelect: React.FC<SelectProps<ProductGroupData>> = ({
  value,
  defaultData,
  onChange,
  onChangeData,
  placeholder,
  onFocus,
  onBlur,
  ...rest
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isLockHook, setIsLockHook] = useState<boolean>(true);
  const [addSuccess, setAddSuccess] = useState<boolean>(false);

  const {
    productGroupData,
    loading,
    isCheckAdd,
    addProductGroup,
    deleteProductGroup,
    updateProductGroup,
  } = useProductGroupData({
    isLockHook: isLockHook,
    onCloseModal: () => {},
  });

  useEffect(() => {
    if (!value) return;
    setIsLockHook(false);
  }, [value]);

  useEffect(() => {
    if (
      !addSuccess ||
      productGroupData.length === 0 ||
      !productGroupData[0].id 
    )
      return;

    handleChange(productGroupData[0].id);
    setAddSuccess(false);
  }, [productGroupData]);

  useEffect(() => {
    if (!isCheckAdd) return;

    setAddSuccess(true);
  }, [isCheckAdd]);

  const handleChange = (value: number) => {
    onChange?.(value);
    const productGroup = productGroupData.find((item) => item.id === value);
    onChangeData?.(productGroup);
  };

  return (
    <div className="flex flex-row">
      <Select
        options={productGroupData.map((item) => ({
          label: item.name,
          value: item.id,
        }))}
        allowClear
        value={value}
        onChange={handleChange}
        loading={loading}
        showSearch
        placeholder="Chọn nhóm khách hàng"
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
      <ManagerModal<ProductGroupData>
        label="Danh sách nhóm hàng hóa"
        open={open}
        dataSource={productGroupData}
        loading={loading}
        selectedValue={value}
        onAdd={addProductGroup}
        onDelete={(data) => {
          if (!data.id) return;
          deleteProductGroup(data.id);
        }}
        onEdit={updateProductGroup}
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

export default ProductGroupSelect;
