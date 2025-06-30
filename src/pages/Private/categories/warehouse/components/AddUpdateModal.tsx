import { Col, Form, Input, Modal, Row } from "antd";
import FloatLabel from "../../../../../components/display/FloatLabel";
import PhaseSelect from "../../../../../components/select/PhaseSelect";
import TextArea from "antd/es/input/TextArea";
import SubmitButton from "../../../../../components/button/SubmitButton";
import { FormProps } from "antd/lib";
import { WarehouseData } from "../../../../../models/categories/warehouse";
import { useEffect } from "react";
import { AddUpdateModalProps } from "../../../../../models/base/add_update_modal_model";

const AddUpdateModal: React.FC<AddUpdateModalProps<WarehouseData>> = ({
  open,
  editData,
  loading,
  onAdd,
  onEdit,
  onClose,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!open) {
      form.resetFields();
      return;
    }

    if (editData) {
      form.setFieldsValue({
        ...editData,
        phaseId: editData.phase?.id,
      });
    }
  }, [editData, form, open]);

  const onFinish: FormProps<WarehouseData>["onFinish"] = async (
    values: WarehouseData
  ) => {
    if (editData) {
      onEdit?.({ ...values, id: editData.id });
    } else {
      onAdd?.(values);
    }
  };

  const handleCancel = () => {
    onClose?.();
    form.resetFields();
  };

  return (
    <Modal
      title={editData ? "Sửa thông tin kho" : "Thêm kho"}
      open={open}
      onCancel={handleCancel}
      footer={false}
      centered
      maskClosable={false}
    >
      <Form
        name="basic"
        form={form}
        autoComplete="off"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Row justify="space-around" className="mt-6">
          <Col span={24}>
            <Form.Item
              name="code"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mã kho",
                },
              ]}
            >
              <FloatLabel label="Mã kho" required>
                <Input className="h-9 w-full" />
              </FloatLabel>
            </Form.Item>
          </Col>
        </Row>
        <Row justify="space-around" className="mt-6">
          <Col span={24}>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên kho",
                },
              ]}
            >
              <FloatLabel label="Tên kho" required>
                <Input className="h-9 w-full" />
              </FloatLabel>
            </Form.Item>
          </Col>
        </Row>
        <Row justify="space-around" className="mt-6">
          <Col span={24}>
            <Form.Item
              name="phoneNumber"
              rules={[
                {
                  pattern: /^\d{8,15}$/,
                  message: "Số điện thoại phải gồm từ 8 đến 15 chữ số",
                },
              ]}
            >
              <FloatLabel label="Số điện thoại">
                <Input className="h-9 w-full" />
              </FloatLabel>
            </Form.Item>
          </Col>
        </Row>
        <Row justify="space-around" className="mt-6">
          <Col span={24}>
            <Form.Item name="address">
              <FloatLabel label="Địa chỉ">
                <Input className="h-9 w-full" />
              </FloatLabel>
            </Form.Item>
          </Col>
        </Row>
        <Row justify="space-around" className="mt-6">
          <Col span={24}>
            <Form.Item name="phaseId">
              <FloatLabel label="Pha">
                <PhaseSelect placeholder="" defaultData={editData?.phase} />
              </FloatLabel>
            </Form.Item>
          </Col>
        </Row>
        <Row justify={"space-around"} className="mt-6 mb-9">
          <Col span={24}>
            <Form.Item name="description">
              <FloatLabel label="Ghi chú">
                <TextArea rows={4} />
              </FloatLabel>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Row justify="center">
            <Col>
              <Form.Item>
                <SubmitButton
                  onCancel={handleCancel}
                  onSubmit={() => {}}
                  loading={loading}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUpdateModal;
