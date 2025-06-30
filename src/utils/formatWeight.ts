import { FormatData } from "../models/base/format";
import formatNumber from "./formatNumber";

const formatWeight = (value?: number, format?: FormatData | null) => {
  if (!value) return "";
  return formatNumber(
    value,
    format?.numberFormat?.decimalPrecision || 3,
    format?.numberFormat?.thousandSeparator || ",",
    format?.numberFormat?.decimalSeparator || "."
  );
};

export default formatWeight;