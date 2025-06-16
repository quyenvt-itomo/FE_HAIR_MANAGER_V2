import { useEffect, useState } from "react";
import { SelectProps } from "../../models/base/select_props";
import { WarehouseData } from "../../models/categories/warehouse";
import { useWarehouseData } from "../../hooks/categories/useWarehouseData";
import useDebounce from "../../hooks/useDebounce";
import { DropdownColumn } from "../core/CustomSelectLayout";
import { SmartSelect } from "../core/SmartSelect";

interface WarehouseSelectProps extends SelectProps<WarehouseData> {
  product_id?: number;
}

const WarehouseSelect: React.FC<WarehouseSelectProps> = ({
  value,
  defaultData,
  product_id,
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
  const showCurrentBalance = product_id !== undefined;

  const { warehouseData, loading, pagination } = useWarehouseData({
    keyword,
    page,
    limit: 20,
    isLockHook,
    product_id,
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
    if (!defaultData) return;

    const exists = listWarehouse.some((item) => item.id === defaultData.id);
    if (exists) return;

    setListWarehouse([defaultData, ...listWarehouse]);
  }, [defaultData, listWarehouse]);

  useEffect(() => {
    setListWarehouse([]);
  }, [keyword]);

  const handleScroll = (e: any) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
      if (!pagination || listWarehouse.length >= pagination.totalRecords)
        return;
      setPage((prev) => prev + 1);
    }
  };

  const handleChange = (id: number) => {
    onChange?.(id);
    const data = listWarehouse.find((item) => item.id === id);
    onChangeData?.(data);
  };

  const columns: DropdownColumn<WarehouseData>[] = [
    { label: "Tên kho", dataIndex: "name", className: showCurrentBalance ? "w-1/3" : "w-2/3" },
    { label: "Mã kho", dataIndex: "code", className: "w-1/3" },
  ];

  if (showCurrentBalance) {
    columns.push({
      label: "Tồn hiện tại",
      dataIndex: "current_balance",
      className: "w-1/3",
      dataType: "number",
    });
  }

  return (
    <SmartSelect<WarehouseData>
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
      notFoundContent={
        product_id === 0 ? "Hãy chọn hàng hóa" : "Không có kho phù hợp"
      }
      {...rest}
    />
  );
};

export default WarehouseSelect;
