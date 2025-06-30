import { FormatData } from "../models/base/format";
import formatNumber from "./formatNumber";

const formatQuantity = (value?: number, format?: FormatData | null) => {
  if (!value) return "";
  return formatNumber(
    value,
    format?.numberFormat?.decimalPrecision || 1,
    format?.numberFormat?.thousandSeparator || ",",
    format?.numberFormat?.decimalSeparator || "."
  );
};

export default formatQuantity;
