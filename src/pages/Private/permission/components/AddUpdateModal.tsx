import React, { useEffect } from "react";
import { Button, Modal, Form, Row, Col, Input } from "antd";
import { FormProps } from "antd/lib";
import { PermissionGroupData } from "../../../../models/permission_group";

import { AddUpdateModalProps } from "../../../../models/base/add_update_modal_model";
import FloatLabel from "../../../../components/display/FloatLabel";
import TextArea from "antd/es/input/TextArea";

const AddUpdateModal: React.FC<AddUpdateModalProps<PermissionGroupData>> = ({
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
      form.setFieldsValue(editData);
    }
  }, [editData, form, open]);

  const onFinish: FormProps<PermissionGroupData>["onFinish"] = async (
    values: PermissionGroupData
  ) => {
    if (editData) {
      onEdit?.({ ...values, id: editData.id });
    } else {
      onAdd?.({ ...values });
    }
  };

  const handleCancel = () => {
    onClose?.();
    form.resetFields();
  };

  return (
    <Modal
      title={editData ? "Sửa quyền" : "Thêm quyền"}
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
        style={{ height: "200px" }}
      >
        <Row justify="space-around" className="mt-8">
          <Col span={24}>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên nhóm quyền",
                },
              ]}
            >
              <FloatLabel label="Tên nhóm quyền" required>
                <Input className="h-9" />
              </FloatLabel>
            </Form.Item>
          </Col>
        </Row>
        <Row justify={"space-around"} className="mt-5 mb-5">
          <Col span={24}>
            <Form.Item name="description">
              <FloatLabel label="Ghi chú">
                <TextArea />
              </FloatLabel>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Row justify="center">
            <Col>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "200px" }}
                  loading={loading}
                >
                  Lưu
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUpdateModal;
