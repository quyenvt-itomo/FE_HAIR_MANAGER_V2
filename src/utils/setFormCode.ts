import { FormInstance } from "antd";
import { apiEndpoint, BASE_URL } from "../constants/ApiEndpoint";

/**
 * Cập nhật code từ Api vào Form Ant Design
 * @param form - Đối tượng form của Ant Design
 * @param type - loại đối tượng muốn hiển thị code
 */

type CodeType =
  | "organization"
  | "employee"
  | "user"
  | "customer"
  | "supplier"
  | "delivery"
  | "partner"
  | "product"
  | "material"
  | "quotation"
  | "order"
  | "order_purchase"
  | "order_production"
  | "invoice"
  | "warehouse"
  | "inventory"
  | "production"
  | "finance_record"
  | "finance_imcome"
  | "finance_expense"
  | "contract"
  | "orderexpense"
  | "purchase_request"
  | "payment_request"
  | "inventory_normal_in" // nhap kho hang mua
  | "inventory_finished_in" // nhap kho thanh pham
  | "inventory_material_in" // nhap kho nguyen vat lieu
  | "inventory_normal_out" // xuat kho hang ban
  | "inventory_material_out" // xuat kho nguyen vat lieu
  | "finished_out"
  | "payment_income"
  | "payment_expense";

interface IQuery {
  type: CodeType;
  id?: number;
}

export interface SetFormCodeProps {
  form: FormInstance;
  query: IQuery;
  field?: string;
}

export const setFormCode = async ({
  form,
  query: { type, id },
  field = "code",
}: SetFormCodeProps) => {
  try {
    const response = await fetch(
      `${BASE_URL}${apiEndpoint.code}?type=${type}&id=${id}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    form.setFieldValue(field, result?.data);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};
