import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, message, Checkbox, Spin } from "antd";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../stores";
import { changePassword, resetChangePassword } from "../../../../stores/auth/slice";

interface ChangePasswordProps {
  open: boolean;
  onClose: () => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { isCheckChangePassword, loading } = useSelector(
    (state: RootState) => state.Auth,
    shallowEqual
  );

  useEffect(() => {
    if (open) return;
    form.resetFields();
  }, [open]);

  useEffect(() => {
    if (!isCheckChangePassword) return;

    dispatch(resetChangePassword());
    handleCancel()
  }, [isCheckChangePassword]);

  // Hàm đóng modal
  const handleCancel = () => {
    onClose();
    form.resetFields();
  };

  // Hàm xử lý thay đổi mật khẩu
  const handleChangePassword = async () => {
    try {
      const values = await form.validateFields();

      // Kiểm tra mật khẩu cũ và mới
      if (values.oldPassword === values.newPassword) {
        message.error("Mật khẩu mới không thể giống mật khẩu cũ");
        return;
      }

      dispatch(changePassword(values)); // Gọi dispatch để thay đổi mật khẩu
    } catch (err) {
      console.error("Lỗi thay đổi mật khẩu: ", err);
    }
  };


  return (
    <Modal
      title={
        <div className="flex flex-col items-center">
          <div className="flex w-full">Thay đổi mật khẩu</div>
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
      onCancel={handleCancel}
      footer={null}
      centered
    >
      <Form form={form} layout="vertical" initialValues={{ isLogout: false }}>
        <Form.Item
          name="oldPassword"
          label="Mật khẩu cũ"
          className="mt-4"
          rules={[{ required: true, message: "Hãy nhập mật khẩu cũ" }]}
        >
          <Input.Password className="h-9" />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label="Mật khẩu mới"
          className="mt-4"
          rules={[
            { required: true, message: "Hãy nhập mật khẩu mới" },
            { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
          ]}
        >
          <Input.Password className="h-9" />
        </Form.Item>

        <Form.Item
          name="confirm_password"
          label="Nhập lại mật khẩu mới"
          className="mt-4"
          rules={[
            { required: true, message: "Hãy xác nhận lại mật khẩu mới" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const newPassword = getFieldValue("newPassword");
                if (!value || value === newPassword) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu nhập lại phải giống với mật khẩu mới!")
                );
              },
            }),
          ]}
        >
          <Input.Password className="h-9" />
        </Form.Item>

        <Form.Item name="isLogout" valuePropName="checked" className="mt-4">
          <Checkbox>Đăng xuất khỏi mọi thiết bị</Checkbox>
        </Form.Item>

        <div className="flex justify-center mt-4">
          <Button
            type="default"
            onClick={handleCancel}
            style={{ marginRight: 10 }}
          >
            Hủy
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            onClick={handleChangePassword}
            loading={loading}
          >
            Lưu
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ChangePassword;
