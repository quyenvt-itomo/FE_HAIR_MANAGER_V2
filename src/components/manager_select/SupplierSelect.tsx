import { Button } from "antd";
import React, { useEffect, useState } from "react";

import { PlusIcon } from "@heroicons/react/24/outline";
import { SelectProps } from "../../models/base/select_props";
import { SupplierData } from "../../models/categories/supplier";
import { useSupplierData } from "../../hooks/categories/useSupplierData";
import AddUpdateModal from "../../pages/Private/categories/supplier/components/AddUpdateModal";
import useDebounce from "../../hooks/core/useDebounce";
import { DropdownColumn } from "../core/CustomSelectLayout";
import { SmartSelect } from "../core/SmartSelect";

const SupplierSelect: React.FC<SelectProps<SupplierData>> = ({
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
  const [listSupplier, setListSupplier] = useState<SupplierData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [keywordTemp, setKeywordTemp] = useState<string>("");
  const keyword = useDebounce(keywordTemp, 300, setPage);

  const { supplierData, loading, pagination, addSupplier } = useSupplierData({
    keyword,
    page,
    size: 20,
    isLockHook,
  });

  useEffect(() => {
    if (supplierData.length === 0) return;

    setListSupplier((prevList) => {
      const newValues = new Set(supplierData.map((item) => item.id));
      const filteredPrevList = prevList.filter(
        (item) => !newValues.has(item.id)
      );
      return [...filteredPrevList, ...supplierData];
    });
  }, [supplierData]);

  useEffect(() => {
    if (!defaultData?.id) return;

    const exists = listSupplier.some((item) => item.id === defaultData.id);
    if (exists) return;

    setListSupplier([defaultData, ...listSupplier]);
  }, [defaultData, listSupplier]);

  useEffect(() => {
    setListSupplier([]);
  }, [keyword]);

  const handleScroll = (e: any) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
      if (!pagination || listSupplier.length >= pagination.totalRecords) return;
      setPage((prev) => prev + 1);
    }
  };

  const handleChange = (id: number) => {
    onChange?.(id);
    const data = listSupplier.find((item) => item.id === id);
    onChangeData?.(data);
  };

  const columns: DropdownColumn<SupplierData>[] = [
    { label: "Tên nhà cung cấp", dataIndex: "name", className: "w-1/2" },
    { label: "Mã nhà cung cấp", dataIndex: "code", className: "w-1/4" },
    { label: "Ký hiệu", dataIndex: "symbol", className: "w-1/4" },
  ];

  return (
    <div className="flex flex-row">
      <SmartSelect<SupplierData>
        dataSource={listSupplier}
        columns={columns}
        value={value}
        onChange={handleChange}
        onPopupScroll={handleScroll}
        placeholder="Chọn nhà cung cấp"
        loading={loading}
        onSearch={setKeywordTemp}
        onFocus={(e) => {
          setIsLockHook(false);
          onFocus?.(e);
        }}
        onBlur={onBlur}
        className="h-9 rounded-e-none"
        style={{
          width: "calc(100% - 36px)",
        }}
        {...rest}
      />
      <Button
        className="!w-9 !h-9 manager-btn bg-[#FAFAFA] p-0"
        icon={<PlusIcon className="h-3 w-3" />}
        onClick={() => {
          setIsLockHook(false);
          setOpen(true);
        }}
      />

      <AddUpdateModal
        open={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onAdd={addSupplier}
      />
    </div>
  );
};

export default SupplierSelect;
