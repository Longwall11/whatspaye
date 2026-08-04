import { get, post } from "@/lib/apiClient";
import { Invoice, InvoiceItem, InvoiceCreateResponse } from "@/types/invoice";

export const invoiceService = {
  getHistory: (vendorId: string) => get<Invoice[]>(`/invoices/invoice-history?vendorid=${vendorId}`),

  create: (data: { vendorId: string; customerPhone: string; customerName: string; customerEmail: string; items: InvoiceItem[] }) =>
    post<InvoiceCreateResponse>("/invoices/new-invoice", data),
};
