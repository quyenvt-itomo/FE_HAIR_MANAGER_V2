import { Button, Flex, Form, FormProps, Input, Typography } from "antd";
import React from "react";
import type { GetProps } from "antd";
const { Title, Text, Link } = Typography;

type OTPProps = GetProps<typeof Input.OTP>;

const ConfirmEmail: React.FC = () => {
	const onFinish: FormProps["onFinish"] = (values) => {
		console.log("Success:", values);
	};

	const onFinishFailed: FormProps["onFinishFailed"] = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	const onChange: OTPProps["onChange"] = (text) => {
		console.log("onChange:", text);
	};

	const sharedProps: OTPProps = {
		onChange,
	};

	return (
		<div className="w-screen h-screen flex justify-center items-center bg-gray-100 ">
			<div className="w-full h-[460px] md:max-w-lg lg:max-w-xl bg-white rounded-lg shadow-lg p-8">
				<Title level={3} className="text-center !mb-6">
					Xác nhận email
				</Title>
				<Form
					name="forgotPassword"
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
					layout="vertical"
					className="w-full max-w-[630px] "
					size="large"
				>
					<Form.Item
						className="w-full"
						required
						rules={[
							{
								required: true,
								message: "Mã xác nhận không được để trống",
							},
						]}
					>
						<Flex
							gap="middle"
							align="center"
							justify="center"
							vertical
						>
							<Text>Nhập mã xác nhận đã được gửi về email</Text>
							<Input.OTP
								size="large"
								length={4}
								formatter={(str) => str.toUpperCase()}
								{...sharedProps}
							/>
						</Flex>
					</Form.Item>

					<div className="text-center">
						<Text className="mr-2">Không nhận được mã</Text>
						<Link href="/login" className=" !underline">
							Gửi lại
						</Link>
					</div>

					<Form.Item className="w-full mt-6">
						<Button
							type="primary"
							htmlType="submit"
							className="w-full"
						>
							Xác nhận
						</Button>
					</Form.Item>

					<div className="text-center mt-36">
						<Text>Trở về trang </Text>
						<Link href="/login" className="!underline">
							Đăng nhập
						</Link>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default ConfirmEmail;
