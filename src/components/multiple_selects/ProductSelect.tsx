import { useEffect, useState } from "react";
import { MultipleSelectProps } from "../../models/base/select_props";
import { ProductData } from "../../models/categories/product";
import useDebounce from "../../hooks/useDebounce";
import { useProductData } from "../../hooks/categories/useProductData";
import { DropdownColumn } from "../core/CustomSelectLayout";
import { SmartMultipleSelect } from "../core/SmartMultipleSelect";

const ProductSelect: React.FC<MultipleSelectProps<ProductData>> = ({
  value,
  defaultData,
  onChange,
  onChangeData,
  onFocus,
  ...rest
}) => {
  const [listProduct, setListProduct] = useState<ProductData[]>([]);
  const [isLockHook, setIsLockHook] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [keywordTemp, setKeywordTemp] = useState<string>("");
  const keyword = useDebounce(keywordTemp, 300, setPage);

  const { productData, loading, pagination } = useProductData({
    page,
    size: 20,
    keyword,
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
    if (!defaultData?.length) return;

    const newItems = defaultData.filter(
      (d) => !listProduct.some((p) => p.id === d.id)
    );
    if (newItems.length > 0) {
      setListProduct((prev) => [...newItems, ...prev]);
    }
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

  const handleChange = (ids: number[]) => {
    onChange?.(ids);
    const selectedData = listProduct.filter((item) => ids.includes(item.id));
    onChangeData?.(selectedData);
  };

  const columns: DropdownColumn<ProductData>[] = [
    { label: "Tên hàng hóa", dataIndex: "name", className: "w-2/3" },
    { label: "Mã hàng hóa", dataIndex: "code", className: "w-1/3" },
  ];

  return (
    <SmartMultipleSelect<ProductData>
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
