import { SelectProps as AntdSelectProps } from "antd";

export interface SelectProps<T>
  extends Omit<AntdSelectProps<T>, "value" | "onChange" | "options"> {
  value?: number;
  onChange?: (value: number) => void;
  defaultData?: T;
  onChangeData?: (value: T | undefined) => void;
  options?: T[];
}

export interface MultipleSelectProps<T>
  extends Omit<
    AntdSelectProps<T>,
    "value" | "onChange" | "options" | "status" | "mode"
  > {
  value?: number[];
  onChange?: (value: number[]) => void;
  defaultData?: T[];
  onChangeData?: (value: T[]) => void;
  options?: T[];
}
