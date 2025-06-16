import { InputNumber } from "antd";
import React from "react";
import formatQuantity from "../../utils/formatQuantity";

interface InputQuantityProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  className?: string;
}

const InputQuantity: React.FC<InputQuantityProps> = ({
  value,
  onChange,
  min = 0,
  className = "w-full",
}) => {
  return (
    <InputNumber
      value={value}
      onChange={(val) => onChange?.(val || 0)}
      min={min}
      formatter={(val) => formatQuantity(val || 0)}
      parser={(val) => {
        const sanitized = val?.replace(/[^\d]/g, "") || "";
        const parsed = Number(sanitized);
        return isNaN(parsed) ? 0 : parsed;
      }}
      className={className}
    />
  );
};

export default InputQuantity;
