import { useEffect, useState } from "react";
import { PermissionGroupData } from "../../../../models/permission_group";
import { usePermissionGroupData } from "../../../../hooks/usePermissionGroupData";
import { Button } from "antd";
import ActionButtons from "../../../../components/button/ActionButtons";
import AddUpdateModal from "../components/AddUpdateModal";
import ModalDelete from "../../../../components/modal/ModalDelete";

interface PermissionGroup {
  selectedRow: PermissionGroupData | null;
  setSelectedRow: (row: PermissionGroupData) => void;
}

const PermissionGroup: React.FC<PermissionGroup> = ({
  selectedRow,
  setSelectedRow,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [editData, setEditData] = useState<PermissionGroupData | undefined>(
    undefined
  );
  const [rowData, setRowData] = useState<PermissionGroupData | undefined>(
    undefined
  );

  const {
    permissionGroupData,
    loading,
    addPermissionGroup,
    updatePermissionGroup,
    deletePermissionGroup,
  } = usePermissionGroupData({
    onCloseModal: () => {
      setEditData(undefined);
      setOpen(false);
    },
  });

  useEffect(() => {
    if (permissionGroupData.length === 0) return;
    const existAccount = permissionGroupData.find(
      (item) => item.id === selectedRow?.id
    );
    if (existAccount) {
      setSelectedRow(existAccount);
      return;
    }

    setSelectedRow(permissionGroupData[0]);
  }, [permissionGroupData]);

  const handleOpenAddModal = () => {
    setEditData(undefined);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setEditData(undefined);
  };

  const handleOpenEditModal = (pg: PermissionGroupData) => {
    setEditData(pg);
    setOpen(true);
  };

  const handleOpenDeleteModal = (record: PermissionGroupData) => {
    setOpenDelete(true);
    setRowData(record);
  };

  const handleDelete = () => {
    if (!rowData || !rowData.id) return;
    deletePermissionGroup(rowData.id);
    setOpenDelete(false);
    setRowData(undefined);
  };

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Nhóm quyền</h2>
        <Button
          className="w-24 h-8 rounded-[3px]"
          type="primary"
          size="small"
          onClick={handleOpenAddModal}
        >
          Thêm
        </Button>
      </div>
      <div
        className="overflow-y-auto overflow-x-hidden -mr-2 pr-2"
        style={{
          height: "calc(100% - 40px)",
        }}
      >
        <div className="flex flex-col h-fit gap-4">
          {permissionGroupData.map((pg) => (
            <div
              onClick={() => setSelectedRow(pg)}
              className={`px-3 py-2 rounded-lg border cursor-pointer transition-all duration-300 hover:shadow-md text-sm relative group ${
                selectedRow?.id === pg.id
                  ? "bg-blue-50 border-blue-200"
                  : "bg-white border-gray-200 hover:border-blue-200"
              }`}
              style={{ minHeight: 56 }}
            >
              <div className="flex flex-col gap-3">
                <span className="font-medium text-gray-900 text-sm group-hover:text-blue-600 transition-colors duration-300">
                  {pg.name}
                </span>
                <span className="font-light text-gray-500 text-sm group-hover:text-blue-600 transition-colors duration-300">
                  {pg.description}
                </span>
              </div>
              <ActionButtons
                onEdit={() => handleOpenEditModal(pg)}
                onDelete={() => handleOpenDeleteModal(pg)}
              />
            </div>
          ))}
        </div>
      </div>
      <AddUpdateModal
        open={open}
        editData={editData}
        loading={loading}
        onClose={handleCloseModal}
        onAdd={addPermissionGroup}
        onEdit={updatePermissionGroup}
      />

      <ModalDelete
        open={openDelete}
        setOpen={setOpenDelete}
        accept={handleDelete}
      />
    </div>
  );
};

export default PermissionGroup;
