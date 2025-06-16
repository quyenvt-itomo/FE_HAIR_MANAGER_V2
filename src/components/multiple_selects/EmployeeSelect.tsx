import { useEffect, useState } from "react";
import { MultipleSelectProps } from "../../models/base/select_props";
import { EmployeeData } from "../../models/employee";
import useDebounce from "../../hooks/useDebounce";
import { useEmployeeData } from "../../hooks/useEmployeeData";
import { DropdownColumn } from "../core/CustomSelectLayout";
import { SmartMultipleSelect } from "../core/SmartMultipleSelect";

const EmployeeSelect: React.FC<MultipleSelectProps<EmployeeData>> = ({
  value,
  defaultData,
  onChange,
  onChangeData,
  onFocus,
  ...rest
}) => {
  const [listEmployee, setListEmployee] = useState<EmployeeData[]>([]);
  const [isLockHook, setIsLockHook] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [keywordTemp, setKeywordTemp] = useState<string>("");
  const keyword = useDebounce(keywordTemp, 300, setPage);

  const { employeeData, loading, pagination } = useEmployeeData({
    page,
    limit: 20,
    keyword,
    isLockHook,
  });

  useEffect(() => {
    if (employeeData.length === 0) return;

    setListEmployee((prevList) => {
      const newValues = new Set(employeeData.map((item) => item.id));
      const filteredPrevList = prevList.filter(
        (item) => !newValues.has(item.id)
      );
      return [...filteredPrevList, ...employeeData];
    });
  }, [employeeData]);

  useEffect(() => {
    if (!defaultData?.length) return;

    const newItems = defaultData.filter(
      (d) => !listEmployee.some((p) => p.id === d.id)
    );
    if (newItems.length > 0) {
      setListEmployee((prev) => [...newItems, ...prev]);
    }
  }, [defaultData, listEmployee]);

  useEffect(() => {
    setListEmployee([]);
  }, [keyword]);

  const handleScroll = (e: any) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
      if (!pagination || listEmployee.length >= pagination.totalRecords) return;
      setPage((prev) => prev + 1);
    }
  };

  const handleChange = (ids: number[]) => {
    onChange?.(ids);
    const selectedData = listEmployee.filter((item) => ids.includes(item.id));
    onChangeData?.(selectedData);
  };

  const columns: DropdownColumn<EmployeeData>[] = [
    { label: "Tên nhân sự", dataIndex: "full_name", className: "w-2/3" },
    { label: "Mã nhân sự", dataIndex: "code", className: "w-1/3" },
  ];

  return (
    <SmartMultipleSelect<EmployeeData>
      dataSource={listEmployee}
      columns={columns}
      value={value}
      onChange={handleChange}
      onPopupScroll={handleScroll}
      placeholder="Chọn nhân sự"
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

export default EmployeeSelect;
