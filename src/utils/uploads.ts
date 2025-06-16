import axios from "axios";
import { notification } from "antd";
import { BASE_URL } from "../constants/ApiEndpoint";

export const uploads = async (
  newFiles: File[] | { originFileObj?: File }[]
) => {
  if (!newFiles || newFiles.length === 0) return [];

  const formData = new FormData();
  newFiles.forEach((file) => {
    if ("originFileObj" in file && file.originFileObj) {
      formData.append("pictures", file.originFileObj);
    } else if (file instanceof File) {
      formData.append("pictures", file);
    }
  });

  try {
    const response = await axios.post(
      `${BASE_URL}/util/upload-pictures`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    if (response.status === 200 && response.data) {
      return response.data.data;
    } else {
      notification.error({
        message: "Upload thất bại",
        description: "Upload ảnh không thành công.",
      });
      return null;
    }
  } catch (error) {
    console.error("Upload error:", error);
    notification.error({
      message: "Lỗi khi upload",
      description: "Có lỗi xảy ra trong quá trình upload ảnh.",
    });
    return null;
  }
};
