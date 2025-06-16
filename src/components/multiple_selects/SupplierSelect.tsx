import { useEffect, useState } from "react";
import { MultipleSelectProps } from "../../models/base/select_props";
import { SupplierData } from "../../models/categories/supplier";
import useDebounce from "../../hooks/useDebounce";
import { useSupplierData } from "../../hooks/categories/useSupplierData";
import { DropdownColumn } from "../core/CustomSelectLayout";
import { SmartMultipleSelect } from "../core/SmartMultipleSelect";

const SupplierSelect: React.FC<MultipleSelectProps<SupplierData>> = ({
  value,
  defaultData,
  onChange,
  onChangeData,
  onFocus,
  ...rest
}) => {
  const [listSupplier, setListSupplier] = useState<SupplierData[]>([]);
  const [isLockHook, setIsLockHook] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [keywordTemp, setKeywordTemp] = useState<string>("");
  const keyword = useDebounce(keywordTemp, 300, setPage);

  const { supplierData, loading, pagination } = useSupplierData({
    page,
    limit: 20,
    keyword,
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
    if (!defaultData?.length) return;

    const newItems = defaultData.filter(
      (d) => !listSupplier.some((p) => p.id === d.id)
    );
    if (newItems.length > 0) {
      setListSupplier((prev) => [...newItems, ...prev]);
    }
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

  const handleChange = (ids: number[]) => {
    onChange?.(ids);
    const selectedData = listSupplier.filter((item) => ids.includes(item.id));
    onChangeData?.(selectedData);
  };

  const columns: DropdownColumn<SupplierData>[] = [
    { label: "Tên nhà cung cấp", dataIndex: "name", className: "w-2/3" },
    { label: "Mã nhà cung cấp", dataIndex: "code", className: "w-1/3" },
  ];

  return (
    <SmartMultipleSelect<SupplierData>
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
      {...rest}
    />
  );
};

export default SupplierSelect;
