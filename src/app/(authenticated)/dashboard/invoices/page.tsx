"use client";

import { useState, useEffect } from "react";
import StatusBadge from "@/components/StatusBadge";
import { invoiceService } from "@/services/invoiceService";
import { productService } from "@/services/productService";
import { Invoice, InvoiceCreateResponse } from "@/types/invoice";
import { Product } from "@/types/product";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Status = "All" | "Paid" | "Pending" | "Failed";

const PAGE_SIZE = 10;

function formatPrice(amount: number) {
  return `₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<Status>("All");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);
  const [createdInvoice, setCreatedInvoice] = useState<InvoiceCreateResponse & { customerPhone: string } | null>(null);
  const [form, setForm] = useState<{
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    items: Array<{ productId: string; quantity: number | "" }>;
  }>({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    items: [{ productId: "", quantity: 1 }],
  });

  const loadData = () => {
    const vendorId = localStorage.getItem("userId");
    if (!vendorId) return;
    setLoading(true);
    setError(null);
    Promise.all([
      invoiceService.getHistory(vendorId),
      productService.getList(vendorId),
    ]).then(([invRes, prodRes]) => {
      if (invRes.isSuccess) setInvoices(invRes.data);
      if (prodRes.isSuccess) setProducts(prodRes.data);
    }).catch(() => {
      setError("Unable to load invoices");
    }).finally(() => setLoading(false));
  };

  useEffect(loadData, []);

  const filtered = invoices
    .filter((inv) =>
      statusFilter === "All" ? true : inv.status === statusFilter
    )
    .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const addItemRow = () => {
    setForm((prev) => ({
      ...prev,
      items: [...prev.items, { productId: "", quantity: 1 }],
    }));
  };

  const removeItem = (index: number) => {
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const updateItem = (index: number, field: string, value: string | number) => {
    setForm((prev) => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleCreate = async () => {
    if (!form.customerName.trim() || !form.customerPhone.trim() || !form.customerEmail.trim() || form.items.length === 0) return;
    if (form.items.some((item) => !item.productId)) {
      toast.error("Please select a product for each item");
      return;
    }
    setSaving(true);
    try {
      const vendorId = localStorage.getItem("userId") || "";
      const res = await invoiceService.create({
        vendorId,
        customerPhone: form.customerPhone.trim(),
        customerName: form.customerName.trim(),
        customerEmail: form.customerEmail.trim(),
        items: form.items.map((item) => ({
          id: Number(item.productId),
          quantity: item.quantity || 1,
        })),
      });
      if (res.isSuccess) {
        setCreatedInvoice({
          authorizedUrl: res.data.authorizedUrl,
          reference: res.data.reference,
          customerPhone: form.customerPhone.trim(),
        });
        setForm({ customerName: "", customerPhone: "", customerEmail: "", items: [{ productId: "", quantity: 1 }] });
        loadData();
      } else {
        toast.error(res.error || "Failed to create invoice");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create invoice");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <ToastContainer />
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900" style={{ fontFamily: "Sora, sans-serif" }}>Invoices</h1>
          <p className="text-sm text-gray-500 mt-0.5">Create and manage invoices</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-1.5 lg:gap-2 bg-[#057F44] text-white rounded-full px-3 lg:px-5 py-1.5 lg:py-2 text-xs lg:text-sm font-semibold hover:bg-[#045f35] transition-colors">
          <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          Create Invoice
        </button>
      </div>

      <div className="bg-white rounded-2xl overflow-hidden">
        <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "Sora, sans-serif" }}>All Invoices</h2>
          <div className="flex items-center gap-2">
            {(["All", "Paid", "Pending", "Failed"] as Status[]).map((s) => (
              <button
                key={s}
                onClick={() => { setStatusFilter(s); setPage(1); }}
                className={`px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-xs lg:text-sm font-medium transition-colors ${
                  statusFilter === s ? "bg-[#057F44] text-white" : "border border-gray-200 text-gray-600 bg-white hover:bg-gray-50"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="p-8 flex justify-center">
            <div className="w-8 h-8 border-4 border-[#057F44] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-sm text-red-500 mb-3">{error}</p>
            <button onClick={loadData} className="text-sm text-[#057F44] font-semibold hover:underline">Try again</button>
          </div>
        ) : paginated.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-400">No invoices yet.</div>
        ) : (
          <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-3 lg:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Customer</th>
                  <th className="px-3 lg:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Phone</th>
                  <th className="px-3 lg:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</th>
                  <th className="px-3 lg:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
                  <th className="px-3 lg:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Amount</th>
                  <th className="px-3 lg:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginated.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-3 lg:px-6 py-3 lg:py-4">
                      <span className="text-sm font-medium text-[#057F44]">{inv.customerName}</span>
                    </td>
                    <td className="px-3 lg:px-6 py-3 lg:py-4 text-sm text-gray-600">{inv.customerPhone || "—"}</td>
                    <td className="px-3 lg:px-6 py-3 lg:py-4 text-sm text-gray-600">{inv.customerEmail || "—"}</td>
                    <td className="px-3 lg:px-6 py-3 lg:py-4 text-sm text-gray-600">{formatDate(inv.created)}</td>
                    <td className="px-3 lg:px-6 py-3 lg:py-4 text-sm font-medium text-gray-800">{formatPrice(inv.amount)}</td>
                    <td className="px-3 lg:px-6 py-3 lg:py-4"><StatusBadge status={inv.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="px-4 lg:px-6 py-3 lg:py-4 border-t border-gray-100 flex items-center justify-center gap-1.5 lg:gap-2">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-3 lg:px-4 py-1.5 rounded-full border border-gray-200 text-xs lg:text-sm text-gray-600 disabled:opacity-40 hover:bg-gray-50 transition-colors">Prev</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} onClick={() => setPage(p)} className={`w-7 h-7 lg:w-8 lg:h-8 rounded-full text-xs lg:text-sm font-medium transition-colors ${p === page ? "bg-[#057F44] text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>{p}</button>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 lg:px-4 py-1.5 rounded-full border border-gray-200 text-xs lg:text-sm text-gray-600 disabled:opacity-40 hover:bg-gray-50 transition-colors">Next</button>
        </div>
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 lg:p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => { setShowAdd(false); setCreatedInvoice(null); }} />
          <div className="relative bg-white rounded-2xl w-full max-w-lg mx-4 p-6 max-h-[90vh] overflow-y-auto">

            {createdInvoice ? (
              <div className="space-y-5">
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-3 bg-green-50 rounded-full flex items-center justify-center">
                    <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: "Sora, sans-serif" }}>Invoice Created</h3>
                  <p className="text-sm text-gray-500 mt-1">Share this payment link with your customer</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Payment Link</label>
                  <p className="text-sm text-gray-800 break-all">{createdInvoice.authorizedUrl}</p>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(createdInvoice.authorizedUrl);
                      toast.success("Link copied!");
                    }}
                    className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-full py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy Link
                  </button>

                  <a
                    href={`https://wa.me/${createdInvoice.customerPhone.replace(/^0/, "234")}?text=${encodeURIComponent(`Hi, please pay your invoice using this link: ${createdInvoice.authorizedUrl}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-full py-2.5 text-sm font-semibold hover:bg-[#1da851] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Send via WhatsApp
                  </a>
                </div>

                <button
                  onClick={() => { setShowAdd(false); setCreatedInvoice(null); }}
                  className="w-full border border-gray-200 rounded-full py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 mx-auto bg-gray-50 rounded-full flex items-center justify-center">
                  <svg className="w-7 h-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: "Sora, sans-serif" }}>No products yet</h3>
                  <p className="text-sm text-gray-500 mt-1">You need to add at least one product before creating an invoice.</p>
                </div>
                <a href="/dashboard/products" className="inline-flex items-center gap-2 bg-[#057F44] text-white rounded-full px-6 py-2.5 text-sm font-semibold hover:bg-[#045f35] transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  Add Products
                </a>
                <div>
                  <button onClick={() => setShowAdd(false)} className="text-sm text-gray-500 hover:text-gray-700 underline">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: "Sora, sans-serif" }}>Create Invoice</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
                    <input type="text" value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#057F44]" placeholder="e.g. John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Customer Phone *</label>
                    <input type="tel" value={form.customerPhone} onChange={(e) => setForm({ ...form, customerPhone: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#057F44]" placeholder="e.g. 09012345678" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Customer Email (Optional)</label>
                    <input type="email" value={form.customerEmail} onChange={(e) => setForm({ ...form, customerEmail: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#057F44]" placeholder="e.g. john@example.com" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">Items *</label>
                      <button onClick={addItemRow} className="text-xs text-[#057F44] font-medium hover:underline">+ Add Item</button>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-end gap-2">
                        <div className="flex-1">
                          <label className="block text-xs font-medium text-gray-500 mb-1">Product</label>
                        </div>
                        <div className="w-20">
                          <label className="block text-xs font-medium text-gray-500 mb-1">Quantity</label>
                        </div>
                        <div className="w-8" />
                      </div>
                      {form.items.map((item, index) => (
                        <div key={index} className="flex items-end gap-2">
                          <div className="flex-1">
                            <select
                              value={item.productId}
                              onChange={(e) => updateItem(index, "productId", e.target.value)}
                              className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#057F44] bg-white"
                            >
                              <option value="">Select product...</option>
                              {products.map((p) => (
                                <option key={p.id} value={p.id}>{p.name} - {formatPrice(p.price)}</option>
                              ))}
                            </select>
                          </div>
                          <div className="w-20">
                            <input type="number" min="1" value={item.quantity === "" ? "" : item.quantity} onChange={(e) => { const raw = e.target.value; if (raw === "") { updateItem(index, "quantity", ""); } else { const num = parseInt(raw, 10); if (!isNaN(num)) updateItem(index, "quantity", num); } }} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#057F44]" placeholder="Qty" />
                          </div>
                          <button onClick={() => removeItem(index)} disabled={form.items.length === 1} className="p-2 text-red-500 hover:text-red-700 disabled:opacity-30">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <button onClick={() => { setShowAdd(false); setCreatedInvoice(null); }} className="flex-1 border border-gray-200 rounded-full py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
                  <button onClick={handleCreate} disabled={saving} className="flex-1 bg-[#057F44] text-white rounded-full py-2.5 text-sm font-semibold hover:bg-[#045f35] transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                    {saving ? <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg> : "Create Invoice"}
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
