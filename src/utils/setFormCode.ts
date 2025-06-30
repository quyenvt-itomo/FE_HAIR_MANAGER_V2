import { FormInstance } from "antd";
import { apiEndpoint, BASE_URL } from "../constants/ApiEndpoint";

/**
 * Cập nhật code từ Api vào Form Ant Design
 * @param form - Đối tượng form của Ant Design
 * @param type - loại đối tượng muốn hiển thị code
 */

type CodeType =
  | "purchase" // * Phiếu mua hàng
  | "sale"; // * Phiếu bán hàng

interface IQuery {
  type: CodeType;
  id?: number;
}

export interface SetFormCodeProps {
  form: FormInstance;
  query: IQuery;
  field?: string;
}

const setFormCode = async ({
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

export default setFormCode;
