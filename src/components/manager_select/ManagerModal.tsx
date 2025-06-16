import { Button, Form, Input, InputNumber, Modal, Radio } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { ManagerModalProps } from "../../models/base/manager_modal_model";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PlusOutlined } from "@ant-design/icons";
import ModalDelete from "../modal/ModalDelete";
import ActionButtons from "../button/ActionButtons";

const ManagerModal = <T extends { id: number; name: string }>({
  open,
  selectedValue,
  loading,
  dataSource,
  label,
  dataType = "string",
  onClose,
  onAdd,
  onEdit,
  onDelete,
  onSelect,
}: ManagerModalProps<T>) => {
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const addFormRef = useRef<HTMLDivElement>(null);
  const editFormRef = useRef<HTMLDivElement>(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>();
  const [editData, setEditData] = useState<T | null>(null);
  const [deleteData, setDeleteData] = useState<T | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        addFormRef.current &&
        !addFormRef.current.contains(event.target as Node)
      ) {
        addForm.submit();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [addForm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        editFormRef.current &&
        !editFormRef.current.contains(event.target as Node)
      ) {
        editForm.submit();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editForm]);

  useEffect(() => {
    addForm.resetFields();
    editForm.resetFields();
    setEditData(null);
    setIsAdding(false);
    setOpenDeleteModal(false);
  }, [dataSource]);

  useEffect(() => {
    if (open) return;
    addForm.resetFields();
    editForm.resetFields();
    setEditData(null);
    setIsAdding(false);
    setOpenDeleteModal(false);
  }, [open]);

  useEffect(() => {
    if (!editData) editForm.resetFields();
  }, [editData]);

  useEffect(() => {
    if (!selectedValue) return;
    const index = dataSource.findIndex((item) => item.id === selectedValue);
    setSelectedRowIndex(index);
  }, [selectedValue]);

  useEffect(() => {
    if (!isAdding) {
      setSelectedRowIndex(undefined);
      addForm.resetFields();
      return;
    }
    setSelectedRowIndex(dataSource.length);
    setEditData(null);
  }, [isAdding]);

  const handleClose = () => {
    setSelectedRowIndex(undefined);
    onClose();
  };

  const handleAcceptDelete = () => {
    if (!deleteData) return;
    onDelete(deleteData);
    setDeleteData(null);
    setOpenDeleteModal(false);
  };

  const handleAdd = async (value: any) => {
    value.name = String(value?.name || "").trim();
    if (!value.name || loading) return;
    onAdd(value);
  };

  const handleEdit = async (value: any) => {
    value.name = String(value.name || "").trim();
    if (!value.name || !editData || loading) return;
    onEdit({
      ...value,
      id: editData.id,
    });
  };

  return (
    <Modal
      title={
        <div className="flex flex-col items-center">
          <div className="flex w-full">{label}</div>
          <hr
            style={{
              marginTop: "20px",
              borderTop: ".5px solid #ECECEE",
              width: "calc(100% + 48px)",
            }}
          />
        </div>
      }
      open={open}
      onCancel={handleClose}
      footer={[
        <Button
          key="select"
          type="primary"
          className="h-11 w-full"
          loading={loading}
          disabled={
            selectedRowIndex === undefined || isAdding || editData !== null
          }
          onClick={() => {
            if (selectedRowIndex === undefined) return;
            onSelect(dataSource[selectedRowIndex]);
          }}
        >
          Chọn
        </Button>,
      ]}
      centered
      maskClosable={false}
      width={420}
    >
      <div className="flex flex-col min-h-[440px]">
        <div className="flex flex-col max-h-[350px] overflow-y-auto overflow-x-hidden">
          {dataSource.map((item, index) => (
            <div
              key={item.id}
              ref={editFormRef}
              className={`flex flex-row items-center cursor-pointer relative ${
                !editData && !isAdding ? "group" : ""
              } py-2`}
              onClick={
                !editData && !isAdding
                  ? () => setSelectedRowIndex(index)
                  : undefined
              }
            >
              <Radio checked={selectedRowIndex === index} />
              {editData?.id !== item.id ? (
                <>
                  <div className="flex flex-1 ml-2 h-9 items-center">
                    {item.name}
                  </div>

                  {/* Nút sửa/xóa */}
                  <ActionButtons
                    onEdit={() => {
                      setEditData(item);
                      setSelectedRowIndex(index);
                    }}
                    onDelete={() => {
                      setDeleteData(item);
                      setOpenDeleteModal(true);
                    }}
                  />
                </>
              ) : (
                <>
                  <Form
                    form={editForm}
                    onFinish={handleEdit}
                    className="flex-1 mr-4"
                  >
                    <Form.Item
                      name={"name"}
                      initialValue={editData?.name}
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      {dataType === "string" ? (
                        <Input
                          className="w-full h-9 border border-blue-500 ml-2"
                          placeholder=""
                          autoFocus
                        />
                      ) : (
                        <InputNumber
                          className="w-full h-9 border border-blue-500 ml-2"
                          placeholder=""
                          autoFocus
                        />
                      )}
                    </Form.Item>
                  </Form>
                  <button
                    className="flex items-center justify-center h-9 w-9 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditData(null);
                    }}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
        {isAdding ? (
          <div ref={addFormRef} className="flex mb-4 mt-2 items-center">
            <Radio checked={true} />
            <Form form={addForm} onFinish={handleAdd} className="flex-1 mr-4">
              <Form.Item name={"name"}>
                {dataType === "string" ? (
                  <Input
                    className="w-full h-9 border border-blue-500 ml-2"
                    placeholder=""
                    autoFocus
                  />
                ) : (
                  <InputNumber
                    className="w-full h-9 border border-blue-500 ml-2"
                    placeholder=""
                    autoFocus
                  />
                )}
              </Form.Item>
            </Form>
            <button
              className="flex items-center justify-center h-9 w-9 p-0"
              onClick={(e) => {
                e.stopPropagation();
                setIsAdding(false);
              }}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        ) : (
          <Button
            loading={loading}
            className="w-32 h-8 rounded-[3px] bg-white text-blue-500 border border-blue-500 hover:bg-blue-100 mt-2"
            onClick={() => setIsAdding(true)}
          >
            <PlusOutlined className="text-lg text-blue-500" />
            Thêm mới
          </Button>
        )}
      </div>
      <ModalDelete
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        accept={handleAcceptDelete}
      />
    </Modal>
  );
};

export default ManagerModal;
