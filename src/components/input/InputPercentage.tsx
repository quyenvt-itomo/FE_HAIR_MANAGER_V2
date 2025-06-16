import { InputNumber } from "antd";
import React from "react";
import { formatPercentage } from "../../utils/formatPercentage";

interface InputPercentageProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

const InputPercentage: React.FC<InputPercentageProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  className = "w-full",
}) => {
  return (
    <InputNumber
      value={value}
      onChange={(val) => onChange?.(val || 0)}
      min={min}
      max={max}
      precision={0}
      formatter={(val) => (val ? formatPercentage(val) : "")}
      parser={(val) => {
        const sanitized = val?.replace(/,/g, "") || "";
        const parsed = parseFloat(sanitized);
        return isNaN(parsed) ? 0 : parsed;
      }}
      className={className}
    />
  );
};

export default InputPercentage;
