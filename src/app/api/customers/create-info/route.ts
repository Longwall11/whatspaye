import { apiProxy } from "@/lib/apiProxy";

export async function POST(request: Request) {
  return apiProxy(request, "/Customers/create-info");
}
