import { post } from "@/lib/apiClient";
import { RegisterRequest, RegisterResponse, LoginRequest, LoginData } from "@/types/auth";

export const authService = {
  register: (data: RegisterRequest) => post<RegisterResponse>("/auth/register", data),

  login: (data: LoginRequest) => post<LoginData>("/auth/login", data),
};
