import { get, post } from "@/lib/apiClient";
import { CustomerInfo, CreateCustomerRequest, Bank } from "@/types/customer";

export const customerService = {
  getInfo: (userId: string) => get<CustomerInfo>(`/customers/get-info?userId=${userId}`),

  createInfo: (data: CreateCustomerRequest) => post<CustomerInfo>("/customers/create-info", data),

  getBanks: () => get<Bank[]>("/lookup/get-banks"),
};
