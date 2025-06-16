import { ExportExcelQuery } from "../models/base/excel_model";
import AddButton from "./button/AddButton";
import ExcelButton from "./button/ExcelButton";
import SearchInput, { SearchInputProps } from "./input/SearchInput";

interface SearchAddProps extends SearchInputProps {
  title?: string;
  excelQuery?: ExportExcelQuery;
  onOpenAddModal?: () => void;
}

const SearchAdd: React.FC<SearchAddProps> = ({
  title,
  placeholder,
  value,
  excelQuery,
  onSearch,
  onOpenAddModal,
  ...rest
}) => {
  return (
    <div className="flex flex-grow gap-3 justify-between">
      <div className="custom-search flex-1">
        <SearchInput
          value={value}
          onSearch={(value: string) => onSearch(value)}
          placeholder={placeholder}
          {...rest}
        />
      </div>

      {!!excelQuery && <ExcelButton exportExcelQuery={excelQuery} />}

      {onOpenAddModal && (
        <AddButton title={title} onOpenAddModal={onOpenAddModal} />
      )}
    </div>
  );
};

export default SearchAdd;
