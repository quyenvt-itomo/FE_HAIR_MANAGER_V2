import { BASE_URL } from "../constants/ApiEndpoint";

export const downloadFile = (fileUrl: string) => {
    window.open(BASE_URL.replace("/api/v1", "") + fileUrl, "_blank");
};
