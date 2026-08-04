import { apiProxy } from "@/lib/apiProxy";

export async function GET(request: Request) {
  return apiProxy(request, "/Lookup/get-banks");
}
