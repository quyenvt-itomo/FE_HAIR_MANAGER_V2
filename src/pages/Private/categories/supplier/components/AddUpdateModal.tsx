import {
  Col,
  Form,
  Input,
  Modal,
  Row,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import FloatLabel from "../../../../../components/display/FloatLabel";
import TextArea from "antd/es/input/TextArea";
import SubmitButton from "../../../../../components/button/SubmitButton";
import { FormProps } from "antd/lib";
import { SupplierData } from "../../../../../models/categories/supplier";
import { useEffect, useState } from "react";
import { AddUpdateModalProps } from "../../../../../models/base/add_update_modal_model";
import UploadPictureCircle from "../../../../../components/upload/UploadPictureCircle";
import InputMoney from "../../../../../components/input/InputMoney";
import { uploads } from "../../../../../utils/uploads";
import { mapFileList } from "../../../../../utils/formatFilesUtil";

const AddUpdateModal: React.FC<AddUpdateModalProps<SupplierData>> = ({
  open,
  editData,
  loading,
  onAdd,
  onEdit,
  onClose,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (!open) {
      form.resetFields();
      setFileList([]);
      return;
    }

    if (editData) {
      form.setFieldsValue(editData);

      setFileList(mapFileList(editData.avatar ? [editData.avatar] : []));
    }
  }, [editData, form, open]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onFinish: FormProps<SupplierData>["onFinish"] = async (
    values: SupplierData
  ) => {
    let avatar;

    if (fileList.length === 0) {
      avatar = null;
    } else if (fileList[0].originFileObj) {
      const response = await uploads([fileList[0]]);
      if (!response) return;
      avatar = response[0];
    } else {
      avatar = editData?.avatar;
    }

    if (editData) {
      onEdit?.({ ...values, avatar, id: editData.id });
    } else {
      onAdd?.({ ...values, avatar });
    }
  };

  const handleCancel = () => {
    onClose?.();
    form.resetFields();
    setFileList([]);
  };

  return (
    <Modal
      title={editData ? "Sửa thông tin nhà cung cấp" : "Thêm nhà cung cấp"}
      open={open}
      onCancel={handleCancel}
      footer={false}
      centered
      maskClosable={false}
    >
      <div className="text-center">
        <div className="flex justify-center">
          <UploadPictureCircle fileList={fileList} onChange={onChange} />
        </div>
      </div>
      <div className="flex justify-center w-full">
        <Form
          layout="vertical"
          className="mt-3 w-full px-4"
          form={form}
          initialValues={{ initial_debt: 0 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Vui lòng nhập tên nhà cung cấp" },
            ]}
            className="w-full mt-6"
          >
            <FloatLabel label="Tên nhà cung cấp" required>
              <Input className="h-9 w-full" />
            </FloatLabel>
          </Form.Item>

          <Form.Item
            name="code"
            rules={[{ required: true, message: "Vui lòng nhập mã nhà cung cấp" }]}
            className="w-full mt-6"
          >
            <FloatLabel label="Mã nhà cung cấp" required>
              <Input className="h-9 w-full" />
            </FloatLabel>
          </Form.Item>

          <Form.Item
            name="symbol"
            rules={[{ required: true, message: "Vui lòng nhập ký hiệu" }]}
            className="w-full mt-6"
          >
            <FloatLabel label="Ký hiệu" required>
              <Input className="h-9 w-full" />
            </FloatLabel>
          </Form.Item>

          <Form.Item
            name="phone_number"
            rules={[
              {
                pattern: /^\d{8,15}$/,
                message: "Số điện thoại phải gồm từ 8 đến 15 chữ số",
              },
            ]}
            className="w-full mt-6"
          >
            <FloatLabel label="Số điện thoại">
              <Input className="h-9 w-full" />
            </FloatLabel>
          </Form.Item>

          <Form.Item name="address" className="mt-6">
            <FloatLabel label="Địa chỉ">
              <TextArea />
            </FloatLabel>
          </Form.Item>

          <Form.Item name="description" className="mt-6">
            <FloatLabel label="Ghi chú">
              <TextArea />
            </FloatLabel>
          </Form.Item>

          <Form.Item
            name="initial_debt"
            rules={[{ required: true, message: "Vui lòng dư nợ bắt đầu" }]}
            className="w-full mt-6"
          >
            <FloatLabel label="Dư nợ ban đầu" required>
              <InputMoney
                className="w-full h-9 flex items-center not-right"
                disabled={!!editData}
              />
            </FloatLabel>
          </Form.Item>

          <Form.Item>
            <div className="flex justify-center mt-24">
              <SubmitButton
                loading={loading}
                onCancel={handleCancel}
                onSubmit={() => {}}
              />
            </div>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default AddUpdateModal;
