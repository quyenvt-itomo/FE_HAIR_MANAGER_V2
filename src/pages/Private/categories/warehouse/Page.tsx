import { useState } from "react";
import SearchAdd from "../../../../components/SearchAdd";
import WarehouseTable from "./components/WarehouseTable";
import { CSS } from "../../../../constants/UI";
import { WarehouseData } from "../../../../models/categories/warehouse";
import { useWarehouseData } from "../../../../hooks/categories/useWarehouseData";
import ModalDelete from "../../../../components/modal/ModalDelete";
import CustomTitle from "../../../../layout/Private/header/components/Title";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../../../stores";
import AddUpdateModal from "./components/AddUpdateModal";

const WarehousePage: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pageLimit, setPageLimit] = useState<number>(20);
  const [keyword, setKeyword] = useState<string>("");
  const [editData, setEditData] = useState<WarehouseData | undefined>(
    undefined
  );

  const {
    warehouseData,
    loading,
    pagination,
    addWarehouse,
    updateWarehouse,
    deleteWarehouse,
  } = useWarehouseData({
    keyword,
    page,
    size: pageLimit,
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
    setOpen(true);
  };

  const handleOpenEditModal = (record: WarehouseData) => {
    setOpen(true);
    setEditData(record);
  };

  const handleOpenDeleteModal = (record: WarehouseData) => {
    setOpenDelete(true);
    setEditData(record);
  };

  const handleDelete = () => {
    if (!editData || !editData.id) return;
    deleteWarehouse(editData.id);
  };

  const handleClose = () => {
    setOpen(false);
    setEditData(undefined);
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
            <WarehouseTable
              dataSource={warehouseData}
              loading={loading}
              pagination={pagination}
              setPage={setPage}
              setPageLimit={setPageLimit}
              onEdit={handleOpenEditModal}
              onDelete={handleOpenDeleteModal}
            />
          </div>
        </div>
        <AddUpdateModal
          editData={editData}
          open={open}
          loading={loading}
          onClose={handleClose}
          onAdd={addWarehouse}
          onEdit={updateWarehouse}
        />

        <ModalDelete
          open={openDelete}
          setOpen={setOpenDelete}
          accept={handleDelete}
        />
      </div>
    </div>
  );
};

export default WarehousePage;
