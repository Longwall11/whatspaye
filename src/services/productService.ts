import { get, post } from "@/lib/apiClient";
import { Product } from "@/types/product";

export const productService = {
  getList: (vendorId: string) => get<Product[]>(`/products/get-product-list?vendorId=${vendorId}`),

  create: (data: { name: string; ownerId: string; price: number }) =>
    post<Product>("/products/new-product", data),

  edit: (data: { id: number; name: string; ownerId: string; price: number }) =>
    post<Product>("/products/edit-product", data),
};
