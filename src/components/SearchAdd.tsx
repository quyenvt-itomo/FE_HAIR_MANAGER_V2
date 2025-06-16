import AddButton from "./button/AddButton";
import SearchInput, { SearchInputProps } from "./input/SearchInput";

interface SearchAddProps extends SearchInputProps {
  title?: string;
  onOpenAddModal?: () => void;
}

const SearchAdd: React.FC<SearchAddProps> = ({
  title,
  placeholder,
  value,
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

      {onOpenAddModal && (
        <AddButton title={title} onOpenAddModal={onOpenAddModal} />
      )}
    </div>
  );
};

export default SearchAdd;
