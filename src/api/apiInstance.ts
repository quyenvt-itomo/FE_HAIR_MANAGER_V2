import axios from "axios";
import { message } from "antd";
import { BASE_URL } from "../constants/ApiEndpoint";

const apiInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export function attachDeviceId(config: any) {
  const deviceId = localStorage.getItem("deviceId") || "1";
  if (deviceId) {
    return {
      ...config,
      params: {
        ...config.params,
        deviceId: deviceId,
      },
    };
  }
  return config;
}

apiInstance.interceptors.request.use(
  (config) => attachDeviceId(config),
  (error) => Promise.reject(error)
);

apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response) {
      const { status } = response;

      if (status === 401 || status === 403) {
        localStorage.removeItem("loginData");
        localStorage.removeItem("data");
        sessionStorage.removeItem("loginData");
        message.warning("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.");

        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    }

    return Promise.reject(error);
  }
);

export default apiInstance;
