import {
  Modal,
  Button,
  Form,
  FormProps,
  Upload,
  UploadProps,
  Spin,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { ExcelType, ImportExcelData } from "../../models/base/excel_model";
import uploads from "../../utils/uploads";

const { Dragger } = Upload;

type ModalAddProps = {
  open: boolean;
  type: ExcelType;
  loading: boolean;
  setClose: () => void;
  onGetCurrentTemplate: () => void;
  onImportCurrentExcel: (data: ImportExcelData) => void;
};

const ModalImportExcel: React.FC<ModalAddProps> = ({
  open,
  type,
  loading,
  setClose,
  onGetCurrentTemplate,
  onImportCurrentExcel,
}) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (!open) {
      setFile(null);

      form.resetFields();
    }
  }, [open]);

  useEffect(() => {
    if (loading) {
      // Mở notification khi loading = true
      notification.open({
        key: "loading",
        message: (
          <span style={{ color: "green", fontWeight: "bold" }}>
            Đang xử lý...
          </span>
        ),
        description:
          "Hệ thống đang nhập dữ liệu, bạn có thể thực hiện tác vụ khác.",
        placement: "bottomRight",
        duration: 0, // Không tự đóng
      });
    } else {
      // Đóng notification khi loading = false
      notification.destroy("loading");
    }
  }, [loading]);

  const props: UploadProps = {
    name: "file",
    multiple: false,
    maxCount: 1,
    accept: ".xlsx,.xls",
    beforeUpload: (file: any) => {
      form.setFieldsValue({ files: file });
      setFile(file);
      return false;
    },
    onRemove: () => {
      setFile(null); // Reset the file when it is removed
      form.setFieldsValue({ files: null });
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const onFinish: FormProps["onFinish"] = async (values) => {
    if (!file) {
      return;
    }
    const formData = new FormData();
    const keys = ["file_url"] as const;
    formData.append("files[]", file);
    formData.append("keys[]", keys[0]);
    const response = await uploads(formData, keys);
    if (!response) return;
    onImportCurrentExcel({
      type,
      file_url: response.file_url,
    });
    setClose();
    setFile(null);
    form.setFieldsValue({ files: null });
  };

  return (
    <Modal
      open={open}
      onCancel={() => {
        form.resetFields();
        setFile(null);
        setClose();
      }}
      title={
        <div className="flex flex-col items-center">
          <div className="flex w-full">Nhập từ Excel</div>
          <hr
            style={{
              marginTop: "20px",
              borderTop: ".5px solid #ECECEE",
              width: "calc(100% + 48px)",
            }}
          />
        </div>
      }
      footer={null}
      width={700}
      centered
    >
      <div>
        <p className="font-semibold">Các bước</p>
        <div className="bg-yellow-100 px-5 py-3 leading-8 rounded-normal my-4">
          <span>
            1. Tải file mẫu và nhập dữ liệu{" "}
            {loading ? (
              <Spin />
            ) : (
              <a
                className="text-blue-500 font-bold underline cursor-pointer"
                onClick={() => onGetCurrentTemplate()}
              >
                Tải file mẫu
              </a>
            )}
          </span>
          <p>2. Nhập dữ liệu chính xác theo các trường.</p>
          <p className="text-red-500">
            Lưu ý: Không thay đổi tên và thứ tự các cột.
          </p>
        </div>
        <Form form={form} onFinish={onFinish}>
          <Form.Item name="files">
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click hoặc kéo thả file vào đây để tải lên
              </p>
            </Dragger>
          </Form.Item>
          <div className="flex justify-center mt-5">
            <Button
              type="primary"
              className="custom-button-disable"
              htmlType="submit"
              style={{ width: 100 }}
              disabled={!file}
              loading={loading}
            >
              Lưu
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalImportExcel;
