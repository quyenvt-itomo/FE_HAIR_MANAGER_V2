import { useEffect, useState } from "react";
import { MultipleSelectProps } from "../../models/base/select_props";
import useDebounce from "../../hooks/useDebounce";
import { DropdownColumn } from "../core/CustomSelectLayout";
import { SmartMultipleSelect } from "../core/SmartMultipleSelect";
import { PhaseData } from "../../models/operations/phase";
import { usePhaseData } from "../../hooks/operations/usePhaseData";

const PhaseSelect: React.FC<MultipleSelectProps<PhaseData>> = ({
  value,
  defaultData,
  onChange,
  onChangeData,
  onFocus,
  ...rest
}) => {
  const [listPhase, setListPhase] = useState<PhaseData[]>([]);
  const [isLockHook, setIsLockHook] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [keywordTemp, setKeywordTemp] = useState<string>("");
  const keyword = useDebounce(keywordTemp, 300, setPage);

  const { phaseData, loading, pagination } = usePhaseData({
    page,
    size: 100,
    keyword,
    isLockHook,
  });

  useEffect(() => {
    if (phaseData.length === 0) return;

    setListPhase((prevList) => {
      const newValues = new Set(phaseData.map((item) => item.id));
      const filteredPrevList = prevList.filter(
        (item) => !newValues.has(item.id)
      );
      return [...filteredPrevList, ...phaseData];
    });
  }, [phaseData]);

  useEffect(() => {
    if (!defaultData?.length) return;

    const newItems = defaultData.filter(
      (d) => !listPhase.some((p) => p.id === d.id)
    );
    if (newItems.length > 0) {
      setListPhase((prev) => [...newItems, ...prev]);
    }
  }, [defaultData, listPhase]);

  useEffect(() => {
    setListPhase([]);
  }, [keyword]);

  const handleScroll = (e: any) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
      if (!pagination || listPhase.length >= pagination.totalRecords) return;
      setPage((prev) => prev + 1);
    }
  };

  const handleChange = (ids: number[]) => {
    onChange?.(ids);
    const selectedData = listPhase.filter((item) => ids.includes(item.id));
    onChangeData?.(selectedData);
  };

  const columns: DropdownColumn<PhaseData>[] = [
    { label: "Tên công đoạn", dataIndex: "name", className: "w-full" },
  ];

  return (
    <SmartMultipleSelect<PhaseData>
      dataSource={listPhase}
      columns={columns}
      value={value}
      onChange={handleChange}
      onPopupScroll={handleScroll}
      placeholder="Chọn công đoạn"
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

export default PhaseSelect;
