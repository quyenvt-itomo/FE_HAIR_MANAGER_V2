import { SymbolPosition } from "../models/base/format";
import formatNumber from "./formatNumber";

const formatCurrency = (
  value: number,
  decimalPrecision: number,
  thousandSeparator: string,
  decimalSeparator: string,
  symbolPosition: SymbolPosition
): string => {
  const formattedNumber = formatNumber(
    value,
    decimalPrecision,
    thousandSeparator,
    decimalSeparator
  );

  if (symbolPosition === "before") {
    return `₫ ${formattedNumber}`;
  } else if (symbolPosition === "after") {
    return `${formattedNumber} ₫`;
  }
  return formattedNumber; // Không hiển thị ký hiệu
};

export default formatCurrency;
