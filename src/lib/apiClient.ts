import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import { ApiResponse } from "@/types/auth";

const apiClient: AxiosInstance = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export async function get<T>(url: string, config?: AxiosRequestConfig) {
  const response = await apiClient.get<ApiResponse<T>>(url, config);
  return response.data;
}

export async function post<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
  const response = await apiClient.post<ApiResponse<T>>(url, data, config);
  return response.data;
}

export async function put<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
  const response = await apiClient.put<ApiResponse<T>>(url, data, config);
  return response.data;
}

export async function patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
  const response = await apiClient.patch<ApiResponse<T>>(url, data, config);
  return response.data;
}

export async function del<T>(url: string, config?: AxiosRequestConfig) {
  const response = await apiClient.delete<ApiResponse<T>>(url, config);
  return response.data;
}

export default apiClient;
