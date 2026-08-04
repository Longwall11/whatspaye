import { get } from "@/lib/apiClient";
import { Product } from "@/types/product";

export const storefrontService = {
  getVendorProducts: (vendorId: string) =>
    get<Product[]>(`/storefront/get-products?vendorId=${vendorId}`),
};
