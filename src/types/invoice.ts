export interface Invoice {
  id: number;
  created: string;
  amount: number;
  status: "Pending" | "Paid" | "Failed" | "Success";
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
}

export interface InvoiceItem {
  id: number;
  quantity: number;
}

export interface InvoiceCreateResponse {
  authorizedUrl: string;
  reference: string;
}
