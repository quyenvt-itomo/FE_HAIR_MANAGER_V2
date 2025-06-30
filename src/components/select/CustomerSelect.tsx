import { useEffect, useState } from "react";
import { SelectProps } from "../../models/base/select_props";
import { CustomerData } from "../../models/categories/customer";
import { useCustomerData } from "../../hooks/categories/useCustomerData";
import useDebounce from "../../hooks/core/useDebounce";
import { DropdownColumn } from "../core/CustomSelectLayout";
import { SmartSelect } from "../core/SmartSelect";

const CustomerSelect: React.FC<SelectProps<CustomerData>> = ({
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
    keyword,
    page,
    size: 20,
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
    if (!defaultData?.id) return;

    const exists = listCustomer.some((item) => item.id === defaultData.id);
    if (exists) return;

    setListCustomer([defaultData, ...listCustomer]);
  }, [defaultData, listCustomer]);

  useEffect(() => {
    setListCustomer([]);
  }, [keyword]);

  const handleScroll = (e: any) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
      if (!pagination || listCustomer.length >= pagination.totalRecords)
        return;
      setPage((prev) => prev + 1);
    }
  };

  const handleChange = (id: number) => {
    onChange?.(id);
    const data = listCustomer.find((item) => item.id === id);
    onChangeData?.(data);
  };

  const columns: DropdownColumn<CustomerData>[] = [
    { label: "Tên khách hàng", dataIndex: "name", className: "w-1/2" },
    { label: "Mã khách hàng", dataIndex: "code", className: "w-1/4" },
    { label: "Ký hiệu", dataIndex: "symbol", className: "w-1/4" },
  ];

  return (
    <SmartSelect<CustomerData>
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
