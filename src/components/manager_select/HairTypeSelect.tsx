import { Button, Select } from "antd";
import React, { useEffect, useState } from "react";

import { Bars3Icon } from "@heroicons/react/24/outline";
import ManagerModal from "./ManagerModal";
import { SelectProps } from "../../models/base/select_props";
import { HairTypeData } from "../../models/categories/attribute";
import { useHairTypeData } from "../../hooks/categories/useHairTypeData";
import { removeVietnameseTones } from "../../utils/searchUtils";
import { IconArrowDown } from "../icon/ArrowDown";

const HairTypeSelect: React.FC<SelectProps<HairTypeData>> = ({
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
    hairTypeData,
    loading,
    isCheckAdd,
    addHairType,
    deleteHairType,
    updateHairType,
  } = useHairTypeData({
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
      hairTypeData.length === 0 ||
      !hairTypeData[0].id 
    )
      return;

    handleChange(hairTypeData[0].id);
    setAddSuccess(false);
  }, [hairTypeData]);

  useEffect(() => {
    if (!isCheckAdd) return;

    setAddSuccess(true);
  }, [isCheckAdd]);

  const handleChange = (value: number) => {
    onChange?.(value);
    const hairType = hairTypeData.find((item) => item.id === value);
    onChangeData?.(hairType);
  };

  return (
    <div className="flex flex-row">
      <Select
        options={hairTypeData.map((item) => ({
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
      <ManagerModal<HairTypeData>
        label="Danh sách loại tóc"
        open={open}
        dataSource={hairTypeData}
        loading={loading}
        selectedValue={value}
        onAdd={addHairType}
        onDelete={(data) => {
          if (!data.id) return;
          deleteHairType(data.id);
        }}
        onEdit={updateHairType}
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

export default HairTypeSelect;
