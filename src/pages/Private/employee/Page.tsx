import { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../../stores";
import CustomTitle from "../../../layout/Private/header/components/Title";
import EmployeeTable from "./components/EmployeeTable";
import { useEmployeeData } from "../../../hooks/useEmployeeData";
import { EmployeeData } from "../../../models/employee";
import SearchAdd from "../../../components/SearchAdd";
import ModalDelete from "../../../components/modal/ModalDelete";
import AddUpdateModal from "./components/AddUpdateModal";

const EmployeePage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [pageLimit, setPageLimit] = useState<number>(20);
  const [keyword, setKeyword] = useState<string>("");
  const [editData, setEditData] = useState<EmployeeData | undefined>(undefined);

  const {
    employeeData,
    loading,
    pagination,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  } = useEmployeeData({
    keyword,
    page,
    limit: pageLimit,
    onCloseModal: () => {
      setOpen(false);
      setEditData(undefined);
    },
  });

  const { horizontal } = useSelector(
    (state: RootState) => state.Client,
    shallowEqual
  );

  const handleSearch = (value: string) => {
    setKeyword(value);
    setPage(1);
  };

  const handleOpenUpdateModal = (record: EmployeeData) => {
    setOpen(true);
    setEditData(record);
  };

  const handleOpenDeleteModal = (record: EmployeeData) => {
    setOpen(true);
    setEditData(record);
  };

  const handleDelete = () => {
    if (!editData || !editData.id) return;

    deleteEmployee(editData.id);
    setOpen(false);
    setEditData(undefined);
  };

  const handleClose = () => {
    setOpen(false);
    setEditData(undefined);
  };

  return (
    <div
      className="flex flex-col h-full overflow-y-hidden p-3"
      style={{
        border: "1px solid #A2A1A834",
        borderRadius: "3px",
      }}
    >
      <div className="bg-white rounded-normal flex flex-col h-full ">
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
            onOpenAddModal={() => setOpen(true)}
          />
        </div>
        <EmployeeTable
          dataSource={employeeData}
          setPage={setPage}
          setPageLimit={setPageLimit}
          loading={loading}
          onEdit={handleOpenUpdateModal}
          onDelete={handleOpenDeleteModal}
          pagination={pagination}
        />
      </div>
      <AddUpdateModal
        open={open}
        editData={editData}
        onAdd={addEmployee}
        onEdit={updateEmployee}
        onClose={handleClose}
      />
      <ModalDelete open={openDelete} setOpen={setOpen} accept={handleDelete} />
    </div>
  );
};

export default EmployeePage;
