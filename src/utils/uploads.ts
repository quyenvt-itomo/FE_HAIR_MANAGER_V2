import { notification } from "antd";
import { apiEndpoint, BASE_URL } from "../constants/ApiEndpoint";

async function uploads<T extends readonly string[]>(
  formData: FormData,
  keys: T // ✅ keys được infer chính xác
): Promise<Record<T[number], string> | null> {
  try {
    const deviceId = localStorage.getItem("deviceId");
    const response = await fetch(
      `${BASE_URL}${apiEndpoint.uploads}?deviceId=${deviceId}`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result: Record<T[number], string> = await response.json(); // ✅ Giữ kiểu chính xác từ keys
    return result;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);

    notification.error({
      message: "Upload Failed",
      description: "Tải lên không thành công. Vui lòng thử lại.",
    });

    return null;
  }
}

export default uploads;
