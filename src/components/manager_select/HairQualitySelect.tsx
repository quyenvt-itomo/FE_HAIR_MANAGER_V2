import { Button, Select } from "antd";
import React, { useEffect, useState } from "react";

import { Bars3Icon } from "@heroicons/react/24/outline";
import ManagerModal from "./ManagerModal";
import { SelectProps } from "../../models/base/select_props";
import { HairQualityData } from "../../models/categories/attribute";
import { useHairQualityData } from "../../hooks/categories/useHairQualityData";
import { removeVietnameseTones } from "../../utils/searchUtils";
import { IconArrowDown } from "../icon/ArrowDown";

const HairQualitySelect: React.FC<SelectProps<HairQualityData>> = ({
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
    hairQualityData,
    loading,
    isCheckAdd,
    addHairQuality,
    deleteHairQuality,
    updateHairQuality,
  } = useHairQualityData({
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
      hairQualityData.length === 0 ||
      !hairQualityData[0].id 
    )
      return;

    handleChange(hairQualityData[0].id);
    setAddSuccess(false);
  }, [hairQualityData]);

  useEffect(() => {
    if (!isCheckAdd) return;

    setAddSuccess(true);
  }, [isCheckAdd]);

  const handleChange = (value: number) => {
    onChange?.(value);
    const hairQuality = hairQualityData.find((item) => item.id === value);
    onChangeData?.(hairQuality);
  };

  return (
    <div className="flex flex-row">
      <Select
        options={hairQualityData.map((item) => ({
          label: item.name,
          value: item.id,
        }))}
        allowClear
        value={value}
        onChange={handleChange}
        loading={loading}
        showSearch
        placeholder={placeholder !== undefined ? placeholder : "Chọn chất tóc"}
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
      <ManagerModal<HairQualityData>
        label="Danh sách chất tóc"
        open={open}
        dataSource={hairQualityData}
        loading={loading}
        selectedValue={value}
        onAdd={addHairQuality}
        onDelete={(data) => {
          if (!data.id) return;
          deleteHairQuality(data.id);
        }}
        onEdit={updateHairQuality}
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

export default HairQualitySelect;
