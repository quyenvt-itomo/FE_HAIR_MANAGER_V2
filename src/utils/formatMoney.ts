import { FormatData } from "../models/base/format";
import formatCurrency from "./formatCurrency";

const formatMoney = (value?: number, format?: FormatData | null) => {
  if (!value) return "";
  
  return formatCurrency(
    value,
    format?.currency?.decimalPrecision || 0,
    format?.numberFormat?.thousandSeparator || ",",
    format?.numberFormat?.decimalSeparator || ".",
    format?.currency?.symbolPosition || "none"
  );
};

export default formatMoney;
