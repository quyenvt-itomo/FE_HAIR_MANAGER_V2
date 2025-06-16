import { Button, Select } from "antd";
import React, { useEffect, useState } from "react";

import { Bars3Icon } from "@heroicons/react/24/outline";
import ManagerModal from "./ManagerModal";
import { SelectProps } from "../../models/base/select_props";
import { ProductTypeData } from "../../models/categories/attribute";
import { useProductTypeData } from "../../hooks/categories/useProductTypeData";
import { removeVietnameseTones } from "../../utils/searchUtils";
import { IconArrowDown } from "../icon/ArrowDown";

const ProductTypeSelect: React.FC<SelectProps<ProductTypeData>> = ({
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
    productTypeData,
    loading,
    isCheckAdd,
    addProductType,
    deleteProductType,
    updateProductType,
  } = useProductTypeData({
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
      productTypeData.length === 0 ||
      !productTypeData[0].id 
    )
      return;

    handleChange(productTypeData[0].id);
    setAddSuccess(false);
  }, [productTypeData]);

  useEffect(() => {
    if (!isCheckAdd) return;

    setAddSuccess(true);
  }, [isCheckAdd]);

  const handleChange = (value: number) => {
    onChange?.(value);
    const productType = productTypeData.find((item) => item.id === value);
    onChangeData?.(productType);
  };

  return (
    <div className="flex flex-row">
      <Select
        options={productTypeData.map((item) => ({
          label: item.name,
          value: item.id,
        }))}
        allowClear
        value={value}
        onChange={handleChange}
        loading={loading}
        showSearch
        placeholder={placeholder !== undefined ? placeholder : "Chọn loại tóc"}
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
      <ManagerModal<ProductTypeData>
        label="Danh sách loại tóc"
        open={open}
        dataSource={productTypeData}
        loading={loading}
        selectedValue={value}
        onAdd={addProductType}
        onDelete={(data) => {
          if (!data.id) return;
          deleteProductType(data.id);
        }}
        onEdit={updateProductType}
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

export default ProductTypeSelect;
