import { Button, Select } from "antd";
import React, { useEffect, useState } from "react";

import { Bars3Icon } from "@heroicons/react/24/outline";
import ManagerModal from "./ManagerModal";
import { SelectProps } from "../../models/base/select_props";
import { HairToneData } from "../../models/categories/attribute";
import { useHairToneData } from "../../hooks/categories/useHairToneData";
import { removeVietnameseTones } from "../../utils/searchUtils";
import { IconArrowDown } from "../icon/ArrowDown";

const HairToneSelect: React.FC<SelectProps<HairToneData>> = ({
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
    hairToneData,
    loading,
    isCheckAdd,
    addHairTone,
    deleteHairTone,
    updateHairTone,
  } = useHairToneData({
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
      hairToneData.length === 0 ||
      !hairToneData[0].id 
    )
      return;

    handleChange(hairToneData[0].id);
    setAddSuccess(false);
  }, [hairToneData]);

  useEffect(() => {
    if (!isCheckAdd) return;

    setAddSuccess(true);
  }, [isCheckAdd]);

  const handleChange = (value: number) => {
    onChange?.(value);
    const hairTone = hairToneData.find((item) => item.id === value);
    onChangeData?.(hairTone);
  };

  return (
    <div className="flex flex-row">
      <Select
        options={hairToneData.map((item) => ({
          label: item.name,
          value: item.id,
        }))}
        allowClear
        value={value}
        onChange={handleChange}
        loading={loading}
        showSearch
        placeholder={placeholder !== undefined ? placeholder : "Chọn tông tóc"}
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
      <ManagerModal<HairToneData>
        label="Danh sách tông tóc"
        open={open}
        dataSource={hairToneData}
        loading={loading}
        selectedValue={value}
        onAdd={addHairTone}
        onDelete={(data) => {
          if (!data.id) return;
          deleteHairTone(data.id);
        }}
        onEdit={updateHairTone}
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

export default HairToneSelect;
