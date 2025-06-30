import { useEffect, useState } from "react";
import { MultipleSelectProps } from "../../models/base/select_props";
import { CustomerData } from "../../models/categories/customer";
import useDebounce from "../../hooks/core/useDebounce";
import { useCustomerData } from "../../hooks/categories/useCustomerData";
import { DropdownColumn } from "../core/CustomSelectLayout";
import { SmartMultipleSelect } from "../core/SmartMultipleSelect";

const CustomerSelect: React.FC<MultipleSelectProps<CustomerData>> = ({
  value,
  defaultData,
  onChange,
  onChangeData,
  onFocus,
  ...rest
}) => {
  const [listCustomer, setListCustomer] = useState<CustomerData[]>([]);
  const [isLockHook, setIsLockHook] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [keywordTemp, setKeywordTemp] = useState<string>("");
  const keyword = useDebounce(keywordTemp, 300, setPage);

  const { customerData, loading, pagination } = useCustomerData({
    page,
    size: 20,
    keyword,
    isLockHook,
  });

  useEffect(() => {
    if (customerData.length === 0) return;

    setListCustomer((prevList) => {
      const newValues = new Set(customerData.map((item) => item.id));
      const filteredPrevList = prevList.filter(
        (item) => !newValues.has(item.id)
      );
      return [...filteredPrevList, ...customerData];
    });
  }, [customerData]);

  useEffect(() => {
    if (!defaultData?.length) return;

    const newItems = defaultData.filter(
      (d) => !listCustomer.some((p) => p.id === d.id)
    );
    if (newItems.length > 0) {
      setListCustomer((prev) => [...newItems, ...prev]);
    }
  }, [defaultData, listCustomer]);

  useEffect(() => {
    setListCustomer([]);
  }, [keyword]);

  const handleScroll = (e: any) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
      if (!pagination || listCustomer.length >= pagination.totalRecords) return;
      setPage((prev) => prev + 1);
    }
  };

  const handleChange = (ids: number[]) => {
    onChange?.(ids);
    const selectedData = listCustomer.filter((item) => ids.includes(item.id));
    onChangeData?.(selectedData);
  };

  const columns: DropdownColumn<CustomerData>[] = [
    { label: "Tên khách hàng", dataIndex: "name", className: "w-2/3" },
    { label: "Mã khách hàng", dataIndex: "code", className: "w-1/3" },
  ];

  return (
    <SmartMultipleSelect<CustomerData>
      dataSource={listCustomer}
      columns={columns}
      value={value}
      onChange={handleChange}
      onPopupScroll={handleScroll}
      placeholder="Chọn khách hàng"
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

export default CustomerSelect;
