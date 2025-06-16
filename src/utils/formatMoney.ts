const formatMoney = (value: number) => {
  if (value == null) return "0 đ";

  const formatted = value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return `${formatted} đ`;
};

export default formatMoney;