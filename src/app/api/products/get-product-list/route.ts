import { apiProxy } from "@/lib/apiProxy";

export async function GET(request: Request) {
  return apiProxy(request, "/Products/get-product-list");
}
