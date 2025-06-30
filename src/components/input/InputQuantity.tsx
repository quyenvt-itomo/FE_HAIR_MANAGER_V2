import { InputNumber } from "antd";
import React from "react";
import formatQuantity from "../../utils/formatQuantity";
import { useClientData } from "../../hooks/core/useClientData";

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
  className,
}) => {
  const { format } = useClientData();
  return (
    <InputNumber
      value={value}
      onChange={(val) => onChange?.(val || 0)}
      min={min}
      formatter={(val) => (val ? formatQuantity(val || 0) : "")}
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
    />
  );
};

export default InputQuantity;
