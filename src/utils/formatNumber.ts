const formatNumber = (
  value: number | string,
  decimalPrecision: number,
  thousandSeparator: string,
  decimalSeparator: string
): string => {
  const locale = thousandSeparator === "," ? "en-US" : "vi-VN";
  const numericValue = Number(value) || 0;

  const formatted = numericValue.toLocaleString(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimalPrecision,
  });

  // Trường hợp cần ép dấu phân cách nếu locale chưa khớp hoàn toàn (tuỳ trình duyệt)
  const finalFormatted = formatted
    .replace(/,/g, thousandSeparator)
    .replace(/\./g, decimalSeparator);

  return finalFormatted;
};

export default formatNumber;
