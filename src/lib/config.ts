const apiBaseUrl = process.env.API_BASE_URL;

if (!apiBaseUrl) {
  throw new Error("API_BASE_URL environment variable is not set. Add it to .env.local");
}

export const API_BASE_URL = apiBaseUrl;
