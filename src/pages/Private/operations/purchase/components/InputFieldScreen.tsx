import { Col, DatePicker, Form, FormInstance, Input, Radio, Row } from "antd";
import dayjs from "dayjs";
import Label from "../../../../../components/display/Label";
import SupplierSelect from "../../../../../components/select/SupplierSelect";
import { SupplierData } from "../../../../../models/categories/supplier";
import EmployeeSelect from "../../../../../components/select/EmployeeSelect";
import { EmployeeData } from "../../../../../models/employee";

interface InputFieldScreenProps {
  form: FormInstance<any>;
}

const InputFieldScreen: React.FC<InputFieldScreenProps> = ({ form }) => {
  const supplier: SupplierData | undefined = Form.useWatch("partner", form);
  const employee: EmployeeData | undefined = Form.useWatch("employee", form);

  return (
    <Form
      form={form}
      initialValues={{
        timeAt: dayjs(),
        purchaseType: "MAIN_MATERIAL",
      }}
    >
      <div className="flex flex-row gap-4">
        <div className="flex flex-col flex-1">
          <Row gutter={[96, 4]}>
            <Col xs={24} md={12} xl={8} className="flex flex-col gap-1">
              <Form.Item
                name="partnerId"
                label={<Label title="Nhà cung cấp" required width={120} />}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn nhà cung cấp",
                  },
                ]}
              >
                <SupplierSelect
                  defaultData={supplier}
                  onChangeData={(value) => form.setFieldValue("partner", value)}
                />
              </Form.Item>
              <Form.Item name="partner" hidden />
              <Form.Item
                name={["partner", "code"]}
                label={<Label title="Mã NCC" width={120} />}
              >
                <Input disabled className="w-full h-9" />
              </Form.Item>
              <Form.Item
                name={["partner", "phone"]}
                label={<Label title="Số điện thoại" width={120} />}
              >
                <Input disabled className="w-full h-9" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} xl={8} className="flex flex-col gap-1">
              <Form.Item
                name="timeAt"
                label={<Label title="Ngày nhập" width={120} />}
              >
                <DatePicker
                  className="w-full h-9"
                  format="DD/MM/YYYY"
                  style={{ width: "100%" }}
                  disabled
                />
              </Form.Item>
              <Form.Item
                name="employeeId"
                label={<Label title="Người mua hàng" width={120} required />}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn người mua hàng",
                  },
                ]}
              >
                <EmployeeSelect
                  defaultData={employee}
                  onChangeData={(value) =>
                    form.setFieldValue("employee", value)
                  }
                />
              </Form.Item>
              <Form.Item name="employee" hidden />
              <Form.Item
                name="purchaseType"
                label={<Label title="Loại phiếu" width={120} required />}
              >
                <Radio.Group className="flex w-full">
                  <Radio.Button
                    className="!rounded-s-[3px] h-9 flex items-center justify-center w-1/2"
                    value="MAIN_MATERIAL"
                  >
                    <span className="truncate">Nguyên liệu chính</span>
                  </Radio.Button>
                  <Radio.Button
                    className="!rounded-e-[3px] h-9 flex items-center justify-center w-1/2"
                    value="SUB_MATERIAL"
                  >
                    <span className="truncate">Nguyên liệu phụ</span>
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col xs={24} md={12} xl={8} className="flex flex-col gap-1">
              <Form.Item
                name="purchaseDate"
                label={<Label title="Ngày mua hàng" width={120} required />}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn ngày mua hàng",
                  },
                ]}
              >
                <DatePicker
                  className="w-full h-9"
                  format="DD/MM/YYYY"
                  placeholder="DD/MM/YYYY"
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                name="code"
                label={<Label title="Số phiếu" width={120} />}
              >
                <Input disabled className="w-full h-9" />
              </Form.Item>
              <Form.Item
                name="note"
                label={<Label title="Ghi chú" width={120} />}
              >
                <Input className="w-full h-9" />
              </Form.Item>
            </Col>
          </Row>
        </div>
      </div>
    </Form>
  );
};

export default InputFieldScreen;
