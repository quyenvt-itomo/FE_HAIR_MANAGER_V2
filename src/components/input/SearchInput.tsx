import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Input } from "antd";
import { COLORS } from "../../constants/UI";

export interface SearchInputProps {
  placeholder?: string;
  value?: string;
  max_width?: number;
  onSearch: (value: string) => void;
  onFocus?: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  value,
  max_width = 500,
  onSearch,
  onFocus,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    if (value !== undefined) {
      setSearchTerm(value);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(searchTerm);
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  return (
    <div className="relative w-full flex items-center h-8" style={{
      maxWidth: max_width
    }}>
      <MagnifyingGlassIcon className="absolute z-10 left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#5FA4D9]" />
      <Input
        type="text"
        placeholder={placeholder || "Tìm kiếm"}
        className={`pl-10 pr-3 py-2 w-full h-8 rounded-lg border flex items-center border-[${COLORS.BORDER}]`}
        value={searchTerm}
        onChange={handleChange}
        onFocus={onFocus}
        allowClear
      />
    </div>
  );
};

export default SearchInput;
