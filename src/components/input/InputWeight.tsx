import { InputNumber } from "antd";
import React from "react";
import { formatWeight } from "../../utils/formatWeight";

interface InputWeightProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  className?: string;
  disabled?: boolean;
}

const InputWeight: React.FC<InputWeightProps> = ({
  value,
  onChange,
  min,
  className = "w-full",
  disabled = false,
}) => {
  return (
    <InputNumber
      value={value}
      onChange={(val) => onChange?.(val || 0)}
      min={min}
      formatter={(val) => formatWeight(val || 0)}
      parser={(val) => {
        const sanitized = val?.replace(/[^\d]/g, "") || "";
        const parsed = Number(sanitized);
        return isNaN(parsed) ? 0 : parsed;
      }}
      className={className}
      disabled={disabled}
    />
  );
};

export default InputWeight;
