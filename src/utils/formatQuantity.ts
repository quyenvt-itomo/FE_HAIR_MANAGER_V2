const formatQuantity = (value: number) => {
  if (!value) return "0";
  return value.toLocaleString("en-US");
};

export default formatQuantity;