export interface ApiResponse<T> {
  isSuccess: boolean;
  error: string;
  data: T;
}

export interface RegisterRequest {
  phone: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
}

export interface LoginRequest {
  userName: string;
  password: string;
}

export interface LoginData {
  userName: string;
  token: string;
  id: string;
}

export interface LoginResponse extends LoginData {}