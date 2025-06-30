import { InputNumber } from "antd";
import React from "react";
import formatWeight from "../../utils/formatWeight";
import { useClientData } from "../../hooks/core/useClientData";

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
  className,
  disabled = false,
}) => {
  const { format } = useClientData();
  return (
    <InputNumber
      value={value}
      onChange={(val) => onChange?.(val || 0)}
      min={min}
      formatter={(val) => (val ? formatWeight(val, format) : "")}
      parser={(val) => {
        if (!val) return 0;

        const { decimalSeparator = ".", thousandSeparator = "," } =
          format?.numberFormat || {};

        let sanitized = val.replace(
          new RegExp(`\\${thousandSeparator}`, "g"),
          ""
        );

        if (decimalSeparator !== ".") {
          sanitized = sanitized.replace(
            new RegExp(`\\${decimalSeparator}`),
            "."
          );
        }

        const parsed = Number(sanitized);
        return isNaN(parsed) ? 0 : parsed;
      }}
      className={`w-full h-9 flex items-center ${className}`}
      disabled={disabled}
    />
  );
};

export default InputWeight;
