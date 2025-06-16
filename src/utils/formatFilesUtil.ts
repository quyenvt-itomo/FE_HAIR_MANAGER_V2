import { UploadFile } from "antd";
import { HOST_URL } from "../constants/ApiEndpoint";

export const mapFileList = (files: string[]): UploadFile[] => {
  return files.map((url, index) => {
    const fullFileName = url.split("/").pop() || "";
    const [nameWithoutTime, ...extParts] = fullFileName.split(".");
    const lastDashIndex = nameWithoutTime.lastIndexOf("-");
    const originalName = nameWithoutTime.substring(0, lastDashIndex);
    const extension = extParts.length ? `.${extParts.join(".")}` : "";

    return {
      uid: `old-${index}`,
      name: `${originalName}${extension}`,
      status: "done",
      url: `${HOST_URL}${url}`,
    };
  });
};