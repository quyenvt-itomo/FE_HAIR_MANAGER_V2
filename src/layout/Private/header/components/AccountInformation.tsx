import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Upload,
  UploadProps,
} from "antd";
import { FormProps, Select, UploadFile } from "antd/lib";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../stores";
import { UserInfo } from "../../../../models/auth_model";
import { BASE_URL } from "../../../../constants/ApiEndpoint";
import { formatDate } from "../../../../utils/dateUtils";
import {
  getDataInfo,
  setIsCheckUpdateDataInfo,
  updateDataInfo,
} from "../../../../stores/auth/slice";
import uploads from "../../../../utils/uploads";
import { IconArrowDown } from "../../../../components/icon/ArrowDown";

interface InfoProps {
  open: boolean;
  onClose: () => void;
}

const AccountInformation: React.FC<InfoProps> = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const dispatch = useDispatch();

  const { userInfo, isCheckUpdateDataInfo } = useSelector(
    (state: RootState) => state.Auth,
    shallowEqual
  );

  useEffect(() => {
    if (userInfo && open) {
      form.setFieldsValue({
        ...userInfo,
      });
      // if (!userInfo.avatar) return;
      // setFileList([
      //   {
      //     uid: "-1",
      //     name: "current_avatar",
      //     url: BASE_URL + `/${userInfo.avatar}`,
      //   },
      // ]);
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [userInfo, form, open]);
  useEffect(() => {
    if (!isCheckUpdateDataInfo) return;

    setIsCheckUpdateDataInfo(false);

    dispatch(getDataInfo());

    onClose();
    form.resetFields();
  }, [isCheckUpdateDataInfo]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onFinish: FormProps<UserInfo>["onFinish"] = async (
    values: UserInfo
  ) => {
    if (fileList.length > 0) {
      const file = fileList[0];

      if (file.originFileObj) {
        const formData = new FormData();
        const keys = ["avatar"] as const;
        formData.append("files[]", file.originFileObj);
        formData.append("keys[]", keys[0]);
        const response = await uploads(formData, keys);
        if (!response) return;
        values.avatar = response.avatar;
      } else {
        values.avatar = userInfo?.avatar;
      }
    } else {
      values.avatar = null;
    }

    dispatch(updateDataInfo(values));
  };

  return (
    <Modal open={open} centered onCancel={onClose} footer={false}>
      <div className="max-w-3xl mx-auto bg-white rounded-lg">
        <h1 className="text-2xl font-semibold text-center mb-8">
          Thông tin tài khoản
        </h1>
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <Upload
              listType="picture-circle"
              fileList={fileList}
              onChange={onChange}
              beforeUpload={() => false}
              maxCount={1}
            >
              {fileList.length < 1 && (
                <div className="flex flex-col items-center">
                  <span>Tải lên ảnh</span>
                </div>
              )}
            </Upload>
          </div>
        </div>
        <div className="max-w-2xl mx-auto">
          <Form
            layout="vertical"
            form={form}
            onFinish={(values) => onFinish(values)}
            className="space-y-4"
          >
            <Form.Item
              name="name"
              label={<span className="font-medium">Họ và tên</span>}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập họ và tên",
                },
              ]}
              className="mb-6"
            >
              <Input
                placeholder={"Nhập họ và tên"}
                className="rounded-md h-9"
              />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label={<span className="font-medium">{"Email"}</span>}
                  className="mb-6"
                >
                  <Input
                    placeholder={"Nhập email"}
                    className="rounded-md h-9"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="phone"
                  label={<span className="font-medium">Số điện thoại</span>}
                  className="mb-6"
                >
                  <Input
                    className="h-9 w-full"
                    onChange={(e) => {
                      const onlyNumbers = e.target.value.replace(/\D/g, "");
                      form.setFieldValue("phone", onlyNumbers);
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="gender"
                  label={<span className="font-medium">Giới tính</span>}
                  className="mb-6"
                >
                  <Select
                    placeholder="Chọn giới tính"
                    className="w-full rounded-md h-9"
                    options={[
                      {
                        value: "MALE",
                        label: "Nam",
                      },
                      {
                        value: "FEMALE",
                        label: "Nữ",
                      },
                      {
                        value: "ORTHER",
                        label: "Khác",
                      },
                    ]}
                    suffixIcon={<IconArrowDown />}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="dob"
                  label={<span className="font-medium">Ngày sinh</span>}
                  className="mb-6"
                >
                  <Input
                    placeholder="Nhập ngày sinh"
                    className="rounded-md h-9"
                    type="date"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="address"
              label={<span className="font-medium">Địa chỉ</span>}
              className="mb-6"
            >
              <Input placeholder="Nhập địa chỉ" className="rounded-md h-9" />
            </Form.Item>

            <div className="flex justify-center space-x-4 pt-4">
              <Button
                type="default"
                className="min-w-[100px] rounded-md h-9 hover:bg-gray-100"
                onClick={onClose}
              >
                Đóng
              </Button>
              {/* <Button
                type="primary"
                className="min-w-[100px] rounded-md h-9"
                onClick={() => onFinish(form.getFieldsValue())}
              >
                Lưu
              </Button> */}
            </div>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default AccountInformation;
