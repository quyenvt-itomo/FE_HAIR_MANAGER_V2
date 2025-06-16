import { Button, Form, FormProps, Input, Typography } from "antd";
import React from "react";

const { Title } = Typography;

const NewPassword: React.FC = () => {
	const onFinish: FormProps["onFinish"] = (values) => {
		console.log("Success:", values);
	};

	const onFinishFailed: FormProps["onFinishFailed"] = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<div className="w-screen h-screen flex justify-center items-center bg-gray-100">
			<div className="w-full h-[460px] md:max-w-lg lg:max-w-xl bg-white rounded-lg shadow-lg p-6">
				<Title level={3} className="text-center mt-5">
					Tạo mật khẩu
				</Title>
				<Form
					name="newPassword"
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
					layout="vertical"
					className="w-full"
					size="large"
				>
					<Form.Item
						label="Mật khẩu mới"
						name="password"
						rules={[
							{ required: true, message: "Mật khẩu bắt buộc" },
						]}
						className="w-full"
					>
						<Input.Password className="w-full" />
					</Form.Item>

					<Form.Item
						label="Nhập lại mật khẩu mới"
						name="confirmPassword"
						rules={[
							{
								required: true,
								message: "Xác nhận lại mật khẩu bắt buộc",
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (
										!value ||
										getFieldValue("password") === value
									) {
										return Promise.resolve();
									}
									return Promise.reject(
										new Error("Mật khẩu không khớp!")
									);
								},
							}),
						]}
						className="w-full"
					>
						<Input.Password className="w-full" />
					</Form.Item>

					<Form.Item className="w-full mt-20">
						<Button
							type="primary"
							htmlType="submit"
							className="w-full"
						>
							Lưu
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default NewPassword;
