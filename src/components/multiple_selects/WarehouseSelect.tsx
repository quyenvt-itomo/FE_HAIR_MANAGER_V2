import { useEffect, useState } from "react";
import { MultipleSelectProps } from "../../models/base/select_props";
import { WarehouseData } from "../../models/categories/warehouse";
import useDebounce from "../../hooks/useDebounce";
import { useWarehouseData } from "../../hooks/categories/useWarehouseData";
import { DropdownColumn } from "../core/CustomSelectLayout";
import { SmartMultipleSelect } from "../core/SmartMultipleSelect";

const WarehouseSelect: React.FC<MultipleSelectProps<WarehouseData>> = ({
  value,
  defaultData,
  onChange,
  onChangeData,
  onFocus,
  ...rest
}) => {
  const [listWarehouse, setListWarehouse] = useState<WarehouseData[]>([]);
  const [isLockHook, setIsLockHook] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [keywordTemp, setKeywordTemp] = useState<string>("");
  const keyword = useDebounce(keywordTemp, 300, setPage);

  const { warehouseData, loading, pagination } = useWarehouseData({
    page,
    size: 20,
    keyword,
    isLockHook,
  });

  useEffect(() => {
    if (warehouseData.length === 0) return;

    setListWarehouse((prevList) => {
      const newValues = new Set(warehouseData.map((item) => item.id));
      const filteredPrevList = prevList.filter(
        (item) => !newValues.has(item.id)
      );
      return [...filteredPrevList, ...warehouseData];
    });
  }, [warehouseData]);

  useEffect(() => {
    if (!defaultData?.length) return;

    const newItems = defaultData.filter(
      (d) => !listWarehouse.some((p) => p.id === d.id)
    );
    if (newItems.length > 0) {
      setListWarehouse((prev) => [...newItems, ...prev]);
    }
  }, [defaultData, listWarehouse]);

  useEffect(() => {
    setListWarehouse([]);
  }, [keyword]);

  const handleScroll = (e: any) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
      if (!pagination || listWarehouse.length >= pagination.totalRecords) return;
      setPage((prev) => prev + 1);
    }
  };

  const handleChange = (ids: number[]) => {
    onChange?.(ids);
    const selectedData = listWarehouse.filter((item) => ids.includes(item.id));
    onChangeData?.(selectedData);
  };

  const columns: DropdownColumn<WarehouseData>[] = [
    { label: "Tên kho", dataIndex: "name", className: "w-2/3" },
    { label: "Mã kho", dataIndex: "code", className: "w-1/3" },
  ];

  return (
    <SmartMultipleSelect<WarehouseData>
      dataSource={listWarehouse}
      columns={columns}
      value={value}
      onChange={handleChange}
      onPopupScroll={handleScroll}
      placeholder="Chọn kho"
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

export default WarehouseSelect;
