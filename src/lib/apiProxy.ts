import { NextResponse } from "next/server";

const API_BASE_URL = "https://whatspayapi-g7eedjebhwcjcvgd.ukwest-01.azurewebsites.net/api";

export async function apiProxy(request: Request, path: string) {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const authHeader = request.headers.get("authorization");
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    const method = request.method;
    let url = `${API_BASE_URL}${path}`;
    let body: string | undefined;

    if (method === "GET") {
      const incomingUrl = new URL(request.url);
      url += incomingUrl.search;
    } else {
      body = JSON.stringify(await request.json());
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    const response = await fetch(url, { method, headers, body, signal: controller.signal });
    clearTimeout(timeout);

    let data;
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = { isSuccess: false, error: text || `Upstream returned ${response.status}`, data: null };
    }

    return NextResponse.json(data, { status: response.ok ? 200 : response.status });
  } catch (error) {
    console.error(`${path} route error:`, error);
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
