import { useState } from "react";
import SearchAdd from "../../../../components/SearchAdd";
import ProductTable from "./components/ProductTable";
import { CSS } from "../../../../constants/UI";
import { ProductData } from "../../../../models/categories/product";
import { useProductData } from "../../../../hooks/categories/useProductData";
import ModalDelete from "../../../../components/modal/ModalDelete";
import CustomTitle from "../../../../layout/Private/header/components/Title";
import { useNavigate } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../../../stores";
import { privateRoutesName } from "../../../../constants/routerName";

const ProductPage: React.FC = () => {
  const nagigate = useNavigate();
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pageLimit, setPageLimit] = useState<number>(20);
  const [keyword, setKeyword] = useState<string>("");
  const [rowData, setRowData] = useState<ProductData | undefined>(undefined);
  const [sortField, setSortField] = useState<string | undefined>(undefined);
  const [sortType, setSortType] = useState<string | undefined>(undefined);

  const { productData, loading, pagination, deleteProduct } = useProductData({
    keyword,
    page,
    size: pageLimit,
    sortBy: sortField,
    sortType,
    onCloseModal: () => {
      setOpenDelete(false);
    },
  });

  const { horizontal } = useSelector(
    (state: RootState) => state.Client,
    shallowEqual
  );

  const handleSearch = (value: string) => {
    setPage(1);
    setKeyword(value);
  };

  const handleOpenAddModal = () => {
    nagigate(privateRoutesName.categories.product.add);
  };

  const handleOpenEditModal = (record: ProductData) => {
    nagigate(privateRoutesName.categories.product.update + `?id=${record.id}`);
  };

  const handleOpenDeleteModal = (record: ProductData) => {
    setOpenDelete(true);
    setRowData(record);
  };

  const handleDelete = () => {
    if (!rowData || !rowData.id) return;
    deleteProduct(rowData.id);
  };

  return (
    <div className="flex flex-col h-full ">
      <div
        className="flex flex-col flex-1 overflow-y-hidden "
        style={CSS.container}
      >
        <div className="flex flex-col h-full bg-white rounded-normal ">
          <div className="flex flex-row gap-4">
            {horizontal ? (
              <div className="hidden lg:flex mr-2">
                <CustomTitle />
              </div>
            ) : (
              <></>
            )}
            <SearchAdd
              onSearch={handleSearch}
              onOpenAddModal={handleOpenAddModal}
            />
          </div>
          <div
            className="flex flex-col mt-3"
            style={{
              height: "calc(100% - 44px)",
            }}
          >
            <ProductTable
              dataSource={productData}
              loading={loading}
              pagination={pagination}
              setPage={setPage}
              setPageLimit={setPageLimit}
              onEdit={handleOpenEditModal}
              onDelete={handleOpenDeleteModal}
            />
          </div>
        </div>

        <ModalDelete
          open={openDelete}
          setOpen={setOpenDelete}
          accept={handleDelete}
        />
      </div>
    </div>
  );
};

export default ProductPage;
