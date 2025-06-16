import { Button, Modal, Radio, Input, Upload, message, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import uploads from "../../utils/uploads";
import { UploadFile, UploadProps } from "antd/lib";
import { ApproveData } from "../../models/api_request_model";

interface ApproveModalProps {
  open: boolean;
  onSubmit: (data: ApproveData) => void;
  onCancel: () => void;
  title?: string;
  description?: string;
}

const ApproveModal: React.FC<ApproveModalProps> = ({
  open,
  onSubmit,
  onCancel,
  title = "Phê duyệt hoặc từ chối",
  description = "Vui lòng chọn hành động bạn muốn thực hiện:",
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const status = Form.useWatch("status", form);

  useEffect(() => {
    if (open) return;

    form.resetFields();
    setFileList([]);
  }, [open]);

  const handleConfirm = async () => {
    try {
      const values = await form.validateFields();

      onSubmit(values);
    } catch (err) {
      // validation failed
    }
  };

  const onChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    try {
      if (!newFileList.length) return;
      const file = newFileList[0];
      if (!file.originFileObj) return;
      const formData = new FormData();
      formData.append("files[]", file.originFileObj);
      formData.append("keys[]", "file");

      const response = await uploads(formData, ["file"]);

      if (!response || !response.file) return;

      // Cập nhật lại giá trị `file` vào form
      form.setFieldsValue({ file: response.file });
      setFileList([file]);
    } catch (error) {
      console.error("Error uploading file:", error);
      message.error("Lỗi tải file lên server");
    }
  };

  return (
    <Modal
      open={open}
      onCancel={() => {
        form.resetFields();
        setFileList([]);
        onCancel();
      }}
      title={title}
      footer={null}
      destroyOnClose
    >
      <p>{description}</p>

      <Form
        form={form}
        layout="vertical"
        initialValues={{ status: "confirmed" }}
        className="mt-5"
      >
        <div className="flex flex-col gap-8">
          <Form.Item name="status">
            <Radio.Group optionType="button" buttonStyle="solid">
              <Radio.Button value="confirmed">Phê duyệt</Radio.Button>
              <Radio.Button value="rejected">Từ chối</Radio.Button>
            </Radio.Group>
          </Form.Item>
          {status === "rejected" ? (
            <Form.Item
              label="Lý do từ chối"
              name="rejected_reason"
              rules={[
                { required: true, message: "Vui lòng nhập lý do từ chối" },
              ]}
            >
              <Input.TextArea rows={4} placeholder="Nhập lý do từ chối..." />
            </Form.Item>
          ) : (
            <Form.Item label="Tài liệu đính kèm (tuỳ chọn)" name="file">
              <div className="w-full h-[98px] flex items-center justify-center border rounded-[3px]">
                <Upload
                  listType="text"
                  accept=".pdf,.xls,.xlsx,.doc,.docx,.zip,.rar,.txt"
                  onChange={onChange}
                  beforeUpload={() => false}
                  maxCount={1}
                  onRemove={() => {
                    form.setFieldValue("file", undefined);
                    setFileList([]);
                  }}
                >
                  {fileList.length < 1 && (
                    <div className="flex flex-col justify-center cursor-pointer items-center h-full w-full text-gray-500">
                      <span className="text-center">
                        <UploadOutlined className="text-xs" /> Kéo và thả tệp
                        tin vào đây hoặc nhấn để chọn
                      </span>
                    </div>
                  )}
                </Upload>
              </div>
            </Form.Item>
          )}
        </div>
      </Form>

      <div className="flex justify-end gap-2 mt-6">
        <Button onClick={onCancel}>Đóng</Button>
        <Button type="primary" onClick={handleConfirm}>
          Xác nhận
        </Button>
      </div>
    </Modal>
  );
};

export default ApproveModal;
