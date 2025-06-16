import { Button, Form, FormProps, Input, Typography } from "antd";
import React from "react";

const { Title, Text, Link } = Typography;

const ForgotPasswordPage: React.FC = () => {
	const onFinish: FormProps["onFinish"] = (values) => {
		console.log("Success:", values);
	};

	const onFinishFailed: FormProps["onFinishFailed"] = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<div className="w-screen h-screen flex justify-center items-center bg-gray-100 ">
			<div className="w-full h-[460px] md:max-w-lg lg:max-w-xl bg-white rounded-lg shadow-lg p-8">
				<Title level={3} className="text-center !mb-10">
					Quên mật khẩu
				</Title>
				<Form
					name="forgotPassword"
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
					layout="vertical"
					className="w-full  "
					size="large"
				>
					<Form.Item
						label="Nhập Email"
						name="email"
						rules={[
							{
								required: true,
								message: "Email bắt buộc",
							},
							{
								type: "email",
								message: "Email không hợp lệ",
							},
						]}
						className="w-full"
					>
						<Input className="w-full" />
					</Form.Item>

					<Form.Item className="w-full mt-6">
						<Button
							type="primary"
							htmlType="submit"
							className="w-full"
						>
							Tiếp tục
						</Button>
					</Form.Item>

					<div className="text-center mt-44">
						<Text>Trở về trang </Text>
						<Link
							href="/login"
							className="text-blue-500 !underline"
						>
							Đăng nhập
						</Link>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default ForgotPasswordPage;
