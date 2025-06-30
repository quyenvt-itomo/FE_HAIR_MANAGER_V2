import { useEffect, useState } from "react";
import { SelectProps } from "../../models/base/select_props";
import { ProductData } from "../../models/categories/product";
import { useProductData } from "../../hooks/categories/useProductData";
import useDebounce from "../../hooks/core/useDebounce";
import { DropdownColumn } from "../core/CustomSelectLayout";
import { SmartSelect } from "../core/SmartSelect";

const ProductSelect: React.FC<SelectProps<ProductData>> = ({
  value,
  defaultData,
  onChange,
  onChangeData,
  placeholder,
  onFocus,
  ...rest
}) => {
  const [listProduct, setListProduct] = useState<ProductData[]>([]);
  const [isLockHook, setIsLockHook] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [keywordTemp, setKeywordTemp] = useState<string>("");
  const keyword = useDebounce(keywordTemp, 300, setPage);

  const { productData, loading, pagination } = useProductData({
    keyword,
    page,
    size: 20,
    isLockHook,
  });

  useEffect(() => {
    if (productData.length === 0) return;

    setListProduct((prevList) => {
      const newValues = new Set(productData.map((item) => item.id));
      const filteredPrevList = prevList.filter(
        (item) => !newValues.has(item.id)
      );
      return [...filteredPrevList, ...productData];
    });
  }, [productData]);

  useEffect(() => {
    if (!defaultData?.id) return;

    const exists = listProduct.some((item) => item.id === defaultData.id);
    if (exists) return;

    setListProduct([defaultData, ...listProduct]);
  }, [defaultData, listProduct]);

  useEffect(() => {
    setListProduct([]);
  }, [keyword]);

  const handleScroll = (e: any) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
      if (!pagination || listProduct.length >= pagination.totalRecords) return;
      setPage((prev) => prev + 1);
    }
  };

  const handleChange = (id: number) => {
    onChange?.(id);
    const data = listProduct.find((item) => item.id === id);
    onChangeData?.(data);
  };

  const columns: DropdownColumn<ProductData>[] = [
    { label: "Tên hàng hóa", dataIndex: "name", className: "w-2/3" },
    { label: "Mã hàng hóa", dataIndex: "code", className: "w-1/3" },
  ];

  return (
    <SmartSelect<ProductData>
      dataSource={listProduct}
      columns={columns}
      value={value}
      onChange={handleChange}
      onPopupScroll={handleScroll}
      placeholder="Chọn hàng hóa"
      loading={loading}
      onSearch={setKeywordTemp}
      onFocus={(e) => {
        setIsLockHook(false);
        onFocus?.(e);
      }}
      {...rest}
    />
  );
};

export default ProductSelect;
