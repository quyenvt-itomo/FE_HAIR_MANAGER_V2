import { Button, Select } from "antd";
import React, { useEffect, useState } from "react";

import { Bars3Icon } from "@heroicons/react/24/outline";
import ManagerModal from "./ManagerModal";
import { SelectProps } from "../../models/base/select_props";
import { UnitData } from "../../models/categories/attribute";
import { useUnitData } from "../../hooks/categories/useUnitData";
import { removeVietnameseTones } from "../../utils/searchUtils";
import { IconArrowDown } from "../icon/ArrowDown";

const UnitSelect: React.FC<SelectProps<UnitData>> = ({
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
    unitData,
    loading,
    isCheckAdd,
    addUnit,
    deleteUnit,
    updateUnit,
  } = useUnitData({
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
      unitData.length === 0 ||
      !unitData[0].id 
    )
      return;

    handleChange(unitData[0].id);
    setAddSuccess(false);
  }, [unitData]);

  useEffect(() => {
    if (!isCheckAdd) return;

    setAddSuccess(true);
  }, [isCheckAdd]);

  const handleChange = (value: number) => {
    onChange?.(value);
    const unit = unitData.find((item) => item.id === value);
    onChangeData?.(unit);
  };

  return (
    <div className="flex flex-row">
      <Select
        options={unitData.map((item) => ({
          label: item.name,
          value: item.id,
        }))}
        allowClear
        value={value}
        onChange={handleChange}
        loading={loading}
        showSearch
        placeholder={placeholder !== undefined ? placeholder : "Chọn đơn vị"}
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
      <ManagerModal<UnitData>
        label="Danh sách đơn vị"
        open={open}
        dataSource={unitData}
        loading={loading}
        selectedValue={value}
        onAdd={addUnit}
        onDelete={(data) => {
          if (!data.id) return;
          deleteUnit(data.id);
        }}
        onEdit={updateUnit}
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

export default UnitSelect;
