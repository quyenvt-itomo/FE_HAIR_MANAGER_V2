import { FormInstance } from "antd";
import { BaseError } from "../stores/baseReducers";

/**
 * Cập nhật lỗi từ API vào Form Ant Design
 * @param form - Đối tượng form của Ant Design
 * @param errors - Danh sách lỗi từ API
 */
export const setFormErrors = (
  form: FormInstance,
  errors: BaseError[] | null
) => {
  if (!errors || errors.length === 0) return;

  const formattedErrors = errors.map((error) => ({
    name: error.key, // Key của field
    errors: [error.message], // Mảng lỗi hiển thị dưới field
  }));
  form.setFields(formattedErrors);
};
