import { ApiResponse } from "../models/base/api_response_model";
import apiInstance from "./apiInstance";
import { AxiosError } from "axios";

// Hàm GET
export const getData = async <T>(
  url: string,
  params?: any
): Promise<ApiResponse<T>> => {
  try {
    const { keyword, startAt, endAt, ...otherParams } = params || {};
    const response = await apiInstance.get<ApiResponse<T>>(url, {
      params: {
        ...otherParams,
        s_global: keyword,
        start_date: startAt,
        end_date: endAt,
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const {
        statusCode,
        message = "Error fetching data",
        errors,
      } = error.response?.data;
      throw { statusCode, message, errors };
    } else {
      throw new Error("Unknown error occurred");
    }
  }
};

// Hàm POST
export const postData = async <T>(
  url: string,
  data: any
): Promise<ApiResponse<T>> => {
  try {
    const response = await apiInstance.post<ApiResponse<T>>(url, data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const {
        statusCode,
        message = "Error posting data",
        errors,
      } = error.response?.data;
      throw { statusCode, message, errors };
    } else {
      throw new Error("Unknown error occurred");
    }
  }
};

// Hàm PUT
export const putData = async <T>(
  url: string,
  data: any
): Promise<ApiResponse<T>> => {
  try {
    const response = await apiInstance.put<ApiResponse<T>>(url, data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const {
        statusCode,
        message = "Error updating data",
        errors,
      } = error.response?.data;
      throw { statusCode, message, errors };
    } else {
      throw new Error("Unknown error occurred");
    }
  }
};

// Hàm DELETE
export const deleteData = async <T>(url: string): Promise<ApiResponse<T>> => {
  try {
    const response = await apiInstance.delete<ApiResponse<T>>(url);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const {
        statusCode,
        message = "Error deleting data",
        errors,
      } = error.response?.data;
      throw { statusCode, message, errors };
    } else {
      throw new Error("Unknown error occurred");
    }
  }
};

// Hàm DELETE nhieu
export const deleteMultiData = async <T>(
  url: string,
  data?: any
): Promise<ApiResponse<T>> => {
  try {
    const response = await apiInstance.delete<ApiResponse<T>>(url, {
      data: data,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const {
        statusCode,
        message = "Error deleting data",
        errors,
      } = error.response?.data;
      throw { statusCode, message, errors };
    } else {
      throw new Error("Unknown error occurred");
    }
  }
};
