import {
  Button,
  Checkbox,
  CheckboxProps,
  Form,
  FormProps,
  Input,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { RootState } from "../../../stores";
import { login, resetLogin } from "../../../stores/auth/slice";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { LoginRequest } from "../../../models/auth_model";
import { Header } from "antd/es/layout/layout";
import { COLORS } from "../../../constants/UI";
import { PageProps } from "../../../types/layout";
import { handleErrorMessage } from "../../../utils/handleMessageError";
import { setFormErrors } from "../../../utils/setFormErrors";
import { IconLogo } from "../../../components/icon/Logo";
import { icons } from "../../../assets/icons";

const LoginPage: React.FC<PageProps> = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const onFinish: FormProps["onFinish"] = (values: LoginRequest) => {
    dispatch(login(values));
  };

  const onFinishFailed: FormProps["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const { loginData, logoutError, loginError } = useSelector(
    (state: RootState) => state.Auth,
    shallowEqual
  );

  useEffect(() => {
    if (loginData) {
      messageApi.open({
        type: "success",
        content: `Đăng nhập thành công`,
      });
      localStorage.setItem("loginData", JSON.stringify(loginData.data));
      setTimeout(() => {
        navigate("/");
      }, 1000);
      dispatch(resetLogin());
    }
    if (loginError) {
      const error = handleErrorMessage(loginError, "add", "auth");
      setFormErrors(form, error.errors);
      messageApi.open({
        type: "error",
        content: `${error.message}`,
      });
      dispatch(resetLogin());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginData, loginError, form]);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <div className="flex justify-center fixed top-0 left-0 w-full h-16 md:h-24 bg-white shadow-sm">
        <div className="flex justify-between items-center w-full h-full max-w-[536px] mx-2">
          <div className="flex gap-2 items-center">
            <img src={icons.logo} className="h-10" />
          </div>
          <span className="text-primary">
            Phần mềm quản lý doanh nghiệp sản xuất tóc
          </span>
        </div>
      </div>
      {contextHolder}
      <div className="w-full h-[580px] md:h-[680px] max-w-[536px] bg-white rounded-[3px] shadow-lg overflow-hidden mx-2">
        <Header className="flex bg-[#CCE2F3] w-full h-[100px] px-6 md:px-14 justify-between">
          <div className="flex flex-col">
            <span className={`mb-2 h-5 te-[${COLORS.PRIMARY}]`}>
              Chào mừng bạn trở lại
            </span>
            <span className={`mb-2 h-5 ${COLORS.PRIMARY}`}>
              Vui lòng đăng nhập để sử dụng
            </span>
          </div>
          <img src={icons.loginContainer} className="-mr-4" />
        </Header>
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          size="large"
          className="w-full p-6 md:p-14 [&_.ant-form-item-required]:before:!content-[''] [&_.ant-form-item-required]:after:!content-['*'] [&_.ant-form-item-required]:after:!ml-1 [&_.ant-form-item-required]:after:!text-red-500"
        >
          <Form.Item
            label={<span className="font-semibold">Tên đăng nhập</span>}
            name="username"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên đăng nhập",
              },
            ]}
            className="w-full"
          >
            <Input className="w-full h-14" />
          </Form.Item>

          <Form.Item
            label={<span className="font-semibold">Nhập khẩu</span>}
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu",
              },
              {
                min: 6,
                message: "Mật khẩu cần tối thiểu 6 ký tự",
              },
              {
                pattern: /^\S*$/,
                message: "Mật khẩu không được chứa khoảng trắng",
              },
            ]}
            className="w-full mt-7"
          >
            <Input.Password className="w-full h-14" />
          </Form.Item>

          <Form.Item className="w-full">
            <div className="flex items-center w-full">
              <Checkbox onChange={onChange} className="text-[#202224]">
                Giữ tôi luôn đăng nhập
              </Checkbox>
            </div>
          </Form.Item>

          <Form.Item className="w-full mt-12 md:mt-24">
            <Button type="primary" htmlType="submit" className="w-full h-14">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
