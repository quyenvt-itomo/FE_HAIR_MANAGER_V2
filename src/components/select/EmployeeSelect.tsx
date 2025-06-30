import { useEffect, useState } from "react";
import { SelectProps } from "../../models/base/select_props";
import { EmployeeData } from "../../models/employee";
import { useEmployeeData } from "../../hooks/useEmployeeData";
import useDebounce from "../../hooks/core/useDebounce";
import { DropdownColumn } from "../core/CustomSelectLayout";
import { SmartSelect } from "../core/SmartSelect";

const EmployeeSelect: React.FC<SelectProps<EmployeeData>> = ({
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
    keyword,
    page,
    size: 20,
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
    if (!defaultData?.id) return;

    const exists = listEmployee.some((item) => item.id === defaultData.id);
    if (exists) return;

    setListEmployee([defaultData, ...listEmployee]);
  }, [defaultData, listEmployee]);

  useEffect(() => {
    setListEmployee([]);
  }, [keyword]);

  const handleScroll = (e: any) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
      if (!pagination || listEmployee.length >= pagination.totalRecords)
        return;
      setPage((prev) => prev + 1);
    }
  };

  const handleChange = (id: number) => {
    onChange?.(id);
    const data = listEmployee.find((item) => item.id === id);
    onChangeData?.(data);
  };

  const columns: DropdownColumn<EmployeeData>[] = [
    { label: "Tên nhân sự", dataIndex: "name", className: "w-2/3" },
    { label: "Mã nhân sự", dataIndex: "code", className: "w-1/3" },
  ];

  return (
    <SmartSelect<EmployeeData>
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
