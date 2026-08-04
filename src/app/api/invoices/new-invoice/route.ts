import { NextResponse } from "next/server";

const API_BASE_URL = "https://whatspayapi-g7eedjebhwcjcvgd.ukwest-01.azurewebsites.net/api";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { vendorId } = body;

    if (!vendorId) {
      return NextResponse.json(
        { isSuccess: false, error: "Vendor ID is required", data: null },
        { status: 400 }
      );
    }

    const authHeader = request.headers.get("authorization") || "";

    const productRes = await fetch(
      `${API_BASE_URL}/Products/get-product-list?vendorId=${vendorId}`,
      { headers: { Authorization: authHeader } }
    );
    const productData = await productRes.json();

    if (productData.isSuccess && (!productData.data || productData.data.length === 0)) {
      return NextResponse.json(
        { isSuccess: false, error: "You must add at least one product before creating an invoice", data: null },
        { status: 400 }
      );
    }

    const response = await fetch(`${API_BASE_URL}/Invoices/new-invoice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify(body),
    });

    const contentType = response.headers.get("content-type");
    let data;
    if (contentType?.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = { isSuccess: false, error: text || `Upstream returned ${response.status}`, data: null };
    }

    return NextResponse.json(data, { status: response.ok ? 200 : response.status });
  } catch (error) {
    console.error("/Invoices/new-invoice route error:", error);
    let message = "Internal server error";
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        message = "Request timed out. Please try again.";
      } else {
        message = error.message;
      }
    }
    return NextResponse.json(
      { isSuccess: false, error: message, data: null },
      { status: 500 }
    );
  }
}
