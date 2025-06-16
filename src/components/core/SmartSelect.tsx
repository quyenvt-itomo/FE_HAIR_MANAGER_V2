import { Select, Spin } from "antd";
import {
  DropdownColumn,
  DropdownHeader,
  renderDropdownBody,
} from "./CustomSelectLayout";
import { IconArrowDown } from "../icon/ArrowDown";
import { SelectProps } from "../../models/base/select_props";

export interface SmartSelectProps<T>
  extends Omit<SelectProps<T>, "onChangeData" | "defaultData" | "options"> {
  dataSource: T[];
  columns: DropdownColumn<T>[];
  keyField?: keyof T;
  labelField?: keyof T;
}

export function SmartSelect<T extends Record<string, any>>({
  dataSource,
  columns,
  keyField = "id",
  labelField = "name",
  value,
  loading,
  onSearch,
  onChange,
  onPopupScroll,
  onFocus,
  ...rest
}: SmartSelectProps<T>) {
  return (
    <Select
      loading={loading}
      value={value as any}
      onChange={(data: any) => onChange?.(data?.value)}
      className="w-full h-9"
      showSearch
      labelInValue
      allowClear
      onSearch={onSearch}
      suffixIcon={<IconArrowDown />}
      placeholder="Chọn mục"
      onFocus={onFocus}
      filterOption={false}
      onPopupScroll={onPopupScroll}
      {...(loading && {
        notFoundContent: (
          <div className="flex items-center gap-2 justify-center py-2">
            <Spin size="small" />
          </div>
        ),
      })}
      dropdownRender={(menu) => (
        <>
          <DropdownHeader columns={columns} />
          {menu}
        </>
      )}
      {...rest}
    >
      {renderDropdownBody({
        dataSource: dataSource,
        columns: columns,
      })}
    </Select>
  );
}
