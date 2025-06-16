import { useEffect, useState } from "react";
import { SelectProps } from "../../models/base/select_props";
import { PhaseData } from "../../models/operations/phase";
import { usePhaseData } from "../../hooks/operations/usePhaseData";
import useDebounce from "../../hooks/useDebounce";
import { DropdownColumn } from "../core/CustomSelectLayout";
import { SmartSelect } from "../core/SmartSelect";

interface PhaseSelectProps extends SelectProps<PhaseData> {
  get_for_me?: boolean;
}

const PhaseSelect: React.FC<PhaseSelectProps> = ({
  value,
  defaultData,
  get_for_me,
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
    keyword,
    page,
    limit: 20,
    isLockHook,
    get_for_me,
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
    if (!defaultData) return;

    const exists = listPhase.some((item) => item.id === defaultData.id);
    if (exists) return;

    setListPhase([defaultData, ...listPhase]);
  }, [defaultData, listPhase]);

  useEffect(() => {
    setListPhase([]);
  }, [keyword]);

  const handleScroll = (e: any) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
      if (!pagination || listPhase.length >= pagination.totalRecords)
        return;
      setPage((prev) => prev + 1);
    }
  };

  const handleChange = (id: number) => {
    onChange?.(id);
    const data = listPhase.find((item) => item.id === id);
    onChangeData?.(data);
  };

  const columns: DropdownColumn<PhaseData>[] = [
    { label: "Pha", dataIndex: "name", className: "w-full" },
  ];

  return (
    <SmartSelect<PhaseData>
      dataSource={listPhase}
      columns={columns}
      value={value}
      onChange={handleChange}
      onPopupScroll={handleScroll}
      placeholder="Chọn pha"
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
