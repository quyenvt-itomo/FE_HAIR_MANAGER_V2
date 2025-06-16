import { Select } from "antd";
import formatQuantity from "../../utils/formatQuantity";
import { formatDateDDMMYYYY } from "../../utils/dateUtils";
import formatMoney from "../../utils/formatMoney";

const { Option } = Select;

type DataType = "string" | "number" | "date" | "boolean" | "money";

export interface DropdownColumn<T> {
  label: string;
  dataIndex: keyof T;
  childKey?: string;
  className: string;
  dataType?: DataType;
}

export interface DropdownHeaderProps<T> {
  columns: DropdownColumn<T>[];
}

const dataTypeClassMap: Record<DataType, string> = {
  string: "text-left",
  number: "text-right",
  date: "text-center",
  boolean: "text-center",
  money: "text-right",
};

function getColumnValue<T>(value: any, dataType?: DataType): string {
  switch (dataType) {
    case "number":
      return formatQuantity(value);
    case "money":
      return formatMoney(value);
    case "date":
      return formatDateDDMMYYYY(value);
    case "boolean":
      return value ? "Yes" : "No";
    default:
      return String(value);
  }
}

function getColumnValueFromItem<T>(
  item: T,
  dataIndex: keyof T,
  childKey?: string,
  dataType?: DataType
): string {
  const parentValue = item[dataIndex];

  const value = childKey
    ? (parentValue as Record<string, any>)?.[childKey]
    : parentValue;

  return getColumnValue(value, dataType);
}

export const DropdownHeader = <T,>({ columns }: DropdownHeaderProps<T>) => (
  <div className="sticky top-0 z-10 bg-white px-3 py-1 border-b border-gray-200">
    <div className="flex font-medium text-gray-400 text-sm">
      {columns.map((col, idx) => (
        <div
          key={idx}
          className={`${col.className} truncate ${
            dataTypeClassMap[col.dataType || "string"]
          }`}
        >
          {col.label}
        </div>
      ))}
    </div>
  </div>
);

export interface DropdownBodyProps<T> {
  dataSource: T[];
  keyField?: keyof T; // default: 'id'
  labelField?: keyof T; // default: 'name'
  columns: DropdownColumn<T>[];
}

export function renderDropdownBody<T extends Record<string, any>>({
  dataSource,
  keyField = "id",
  labelField = "name",
  columns,
}: DropdownBodyProps<T>) {
  return dataSource.map((item) => (
    <Option
      key={item[keyField]}
      value={item[keyField]}
      // label={item[labelField]}
    >
      <div className="flex text-sm">
        {columns.map((col, index) => (
          <div
            key={index}
            className={`${col.className} truncate ${
              dataTypeClassMap[col.dataType || "string"]
            }`}
          >
            {getColumnValueFromItem(
              item,
              col.dataIndex,
              col.childKey,
              col.dataType
            )}
          </div>
        ))}
      </div>
    </Option>
  ));
}
