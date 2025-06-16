import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Form, Switch, Row, Col, Select } from "antd";
import { FormProps } from "antd/lib";
import { EmployeeData } from "../../../../models/employee";
import type { UploadFile, UploadProps } from "antd";

import { AddUpdateModalProps } from "../../../../models/base/add_update_modal_model";
import { mapFileList } from "../../../../utils/formatFilesUtil";
import UploadPictureCircle from "../../../../components/upload/UploadPictureCircle";
import FloatLabel from "../../../../components/display/FloatLabel";
import TextArea from "antd/es/input/TextArea";
import { TeamOption } from "../../../../constants/option/team";
import PhaseSelect from "../../../../components/multiple_selects/PhaseSelect";
import { IconArrowDown } from "../../../../components/icon/ArrowDown";
import axios from "axios";
import { BASE_URL } from "../../../../constants/ApiEndpoint";
import PermissionGroupSelect from "../../../../components/multiple_selects/PermissionGroupSelect";

const AddUpdateModal: React.FC<AddUpdateModalProps<EmployeeData>> = ({
  open,
  editData,
  loading,
  onAdd,
  onEdit,
  onClose,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const isAccountant = Form.useWatch("is_accountant", form);
  const isWarehouseManager = Form.useWatch("is_warehouse_manager", form);
  const isLeader = Form.useWatch("is_leader", form);
  const isCreateAccount = Form.useWatch("is_create_account", form);

  useEffect(() => {
    if (!open) {
      form.resetFields();
      setFileList([]);
      return;
    }

    if (editData) {
      form.setFieldsValue({
        ...editData,
        is_leader: editData.role === "LEADER",
        is_warehouse_manager: editData.role === "WAREHOUSE_MANAGER",
        permission_group_ids: editData.permission_group?.map(
          (dev: any) => dev.id
        ),
        password:
          !!editData && (editData.access || editData.active) ? "******" : "",
        leader_of_team: editData.leader_of_team?.map((dev) => dev.id),
      });

      setFileList(mapFileList(editData.avatar ? [editData.avatar] : []));
    }
  }, [editData, form, open]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onFinish: FormProps<EmployeeData>["onFinish"] = async (
    values: EmployeeData
  ) => {
    let avatar;

    if (fileList.length === 0) {
      avatar = null;
    } else if (fileList[0].originFileObj) {
      const formData = new FormData();
      formData.append("avatar", fileList[0].originFileObj as File);
      try {
        const response = await axios.post(
          `${BASE_URL}/util/upload-avatar`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        console.log("File uploaded successfully:", response.data.data);
        avatar = response.data.data;
      } catch (error) {
        console.error("Error uploading file:", error);
        return; // Dừng lại nếu upload lỗi
      }
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
      title={editData ? "Chỉnh sửa nhân sự" : "Thêm nhân sự"}
      open={open}
      onCancel={handleCancel}
      footer={false}
      maskClosable={false}
      centered
      width={"35%"}
    >
      <div className="text-center mb-4">
        <div className="flex justify-center">
          <UploadPictureCircle fileList={fileList} onChange={onChange} />
        </div>
      </div>
      <Form
        layout="vertical"
        className="flex flex-col mt-5 gap-6"
        form={form}
        initialValues={{ remember: true, is_create_account: false }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <div className="grid grid-cols-2 gap-6">
          <Form.Item
            name="code"
            className="col-span-2"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mã nhân sự",
              },
            ]}
          >
            <FloatLabel label="Mã nhân sự" required>
              <Input className="h-9 w-full" />
            </FloatLabel>
          </Form.Item>
          <Form.Item
            name="name"
            className="col-span-2"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập họ tên nhân sự",
              },
            ]}
          >
            <FloatLabel label="Họ và tên nhân sự" required>
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
          >
            <FloatLabel label="Số điện thoại">
              <Input className="h-9 w-full" />
            </FloatLabel>
          </Form.Item>
          <Form.Item name="email">
            <FloatLabel label="Email">
              <Input className="h-9 w-full" />
            </FloatLabel>
          </Form.Item>
          <Form.Item name="address" className="col-span-2">
            <FloatLabel label="Địa chỉ">
              <TextArea className="h-9 w-full" />
            </FloatLabel>
          </Form.Item>
          <Form.Item name="description" className="col-span-2">
            <FloatLabel label="Ghi chú">
              <TextArea className="h-9 w-full" />
            </FloatLabel>
          </Form.Item>
        </div>
        <div>
          <Row justify="space-between" align="middle">
            <Col>
              <span
                className="text-black font-medium"
                style={{ fontSize: "15px" }}
              >
                Là kế toán ?
              </span>
            </Col>
            <Col>
              <Form.Item name="is_accountant" valuePropName="checked" noStyle>
                <Switch checked={isAccountant} />
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div>
          <Row justify="space-between" align="middle">
            <Col>
              <span
                className="text-black font-medium"
                style={{ fontSize: "15px" }}
              >
                Là quản lý kho ?
              </span>
            </Col>
            <Col>
              <Form.Item
                name="is_warehouse_manager"
                valuePropName="checked"
                noStyle
              >
                <Switch checked={isWarehouseManager} />
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div>
          <Row justify="space-between" align="middle">
            <Col>
              <span
                className="text-black font-medium"
                style={{ fontSize: "15px" }}
              >
                Là tài khoản tổ trưởng?
              </span>
            </Col>
            <Col>
              <Form.Item name="is_leader" valuePropName="checked" noStyle>
                <Switch checked={isLeader} />
              </Form.Item>
            </Col>
          </Row>
        </div>
        {isLeader && (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="team"
                className="col-span-2"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn tổ",
                  },
                ]}
              >
                <FloatLabel label="Chọn tổ" required>
                  <Select options={TeamOption} suffixIcon={<IconArrowDown />} />
                </FloatLabel>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="leader_of_team"
                className="col-span-2"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn công đoạn",
                  },
                ]}
              >
                <FloatLabel label="Công đoạn" required>
                  <PhaseSelect
                    placeholder=""
                    defaultData={editData?.leader_of_team}
                  />
                </FloatLabel>
              </Form.Item>
            </Col>
          </Row>
        )}
        <div>
          <Row justify="space-between" align="middle" className="mb-4">
            <Col>
              <span
                className="text-black font-medium"
                style={{ fontSize: "15px" }}
              >
                Cho phép đăng nhập hệ thống
              </span>
            </Col>
            <Col>
              <Form.Item
                name="is_create_account"
                valuePropName="checked"
                noStyle
              >
                <Switch checked={isCreateAccount} />
              </Form.Item>
            </Col>
          </Row>

          {isCreateAccount && (
            <div className="border p-4 rounded-lg mb-10 scale-up-ver-top">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Tên đăng nhập"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên đăng nhập",
                      },
                      {
                        pattern: /^\S+$/,
                        message: "Tên đăng nhập không được chứa dấu cách",
                      },
                    ]}
                  >
                    <Input placeholder="Tên đăng nhập" required />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mật khẩu",
                      },
                      {
                        pattern: /^\S+$/,
                        message: "Tên đăng nhập không được chứa dấu cách",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="Mật khẩu"
                      disabled={
                        !!editData && (editData.access || editData.active)
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16} className="mt-4">
                <Col span={24}>
                  <div className="flex items-center gap-2 w-full">
                    <Form.Item
                      label="Quyền trong hệ thống"
                      name="permission_group_ids"
                      className="flex-1"
                    >
                      <FloatLabel label="Công đoạn" required>
                        <PermissionGroupSelect
                          placeholder=""
                          defaultData={editData?.permission_group}
                        />
                      </FloatLabel>
                    </Form.Item>
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </div>
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
