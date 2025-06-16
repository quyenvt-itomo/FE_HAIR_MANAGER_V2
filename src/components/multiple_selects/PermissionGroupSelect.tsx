import { useEffect, useState } from "react";
import { MultipleSelectProps } from "../../models/base/select_props";
import useDebounce from "../../hooks/useDebounce";
import { DropdownColumn } from "../core/CustomSelectLayout";
import { SmartMultipleSelect } from "../core/SmartMultipleSelect";
import { PermissionGroupData } from "../../models/permission_group";
import { usePermissionGroupData } from "../../hooks/usePermissionGroupData";

const PermissionGroupSelect: React.FC<MultipleSelectProps<PermissionGroupData>> = ({
  value,
  defaultData,
  onChange,
  onChangeData,
  onFocus,
  ...rest
}) => {
  const [listPermissionGroup, setListPermissionGroup] = useState<PermissionGroupData[]>([]);
  const [isLockHook, setIsLockHook] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [keywordTemp, setKeywordTemp] = useState<string>("");
  const keyword = useDebounce(keywordTemp, 300, setPage);

  const { permissionGroupData, loading, pagination } = usePermissionGroupData({
    page,
    limit: 100,
    keyword,
    isLockHook,
  });

  useEffect(() => {
    if (permissionGroupData.length === 0) return;

    setListPermissionGroup((prevList) => {
      const newValues = new Set(permissionGroupData.map((item) => item.id));
      const filteredPrevList = prevList.filter(
        (item) => !newValues.has(item.id)
      );
      return [...filteredPrevList, ...permissionGroupData];
    });
  }, [permissionGroupData]);

  useEffect(() => {
    if (!defaultData?.length) return;

    const newItems = defaultData.filter(
      (d) => !listPermissionGroup.some((p) => p.id === d.id)
    );
    if (newItems.length > 0) {
      setListPermissionGroup((prev) => [...newItems, ...prev]);
    }
  }, [defaultData, listPermissionGroup]);

  useEffect(() => {
    setListPermissionGroup([]);
  }, [keyword]);

  const handleScroll = (e: any) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
      if (!pagination || listPermissionGroup.length >= pagination.totalRecords) return;
      setPage((prev) => prev + 1);
    }
  };

  const handleChange = (ids: number[]) => {
    onChange?.(ids);
    const selectedData = listPermissionGroup.filter((item) => ids.includes(item.id));
    onChangeData?.(selectedData);
  };

  const columns: DropdownColumn<PermissionGroupData>[] = [
    { label: "Tên nhóm quyền", dataIndex: "name", className: "w-full" },
  ];

  return (
    <SmartMultipleSelect<PermissionGroupData>
      dataSource={listPermissionGroup}
      columns={columns}
      value={value}
      onChange={handleChange}
      onPopupScroll={handleScroll}
      placeholder="Chọn nhóm quyền"
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

export default PermissionGroupSelect;
