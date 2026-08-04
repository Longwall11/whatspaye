export interface CustomerInfo {
  userId: string | null;
  isValid: boolean;
  status: string | null;
  firstName?: string;
  lastName?: string;
}

export interface CreateCustomerRequest {
  firstName: string;
  lastName: string;
  accountNumber: string;
  bankCode: string;
  userId: string;
  requestId: number;
  bankId: number;
  isValid: boolean;
}

export interface Bank {
  id: number;
  code: string;
  name: string;
}
