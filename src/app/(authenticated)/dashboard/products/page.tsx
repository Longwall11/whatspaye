"use client";

import { useState, useEffect } from "react";
import { productService } from "@/services/productService";
import { Product } from "@/types/product";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PAGE_SIZE = 10;

function formatPrice(amount: number) {
  return `₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", price: "" });
  const [showEdit, setShowEdit] = useState(false);
  const [editForm, setEditForm] = useState({ id: 0, name: "", price: "" });
  const [editing, setEditing] = useState(false);

  const loadData = () => {
    const vendorId = localStorage.getItem("userId");
    if (!vendorId) return;
    setLoading(true);
    setError(null);
    productService.getList(vendorId).then((res) => {
      if (res.isSuccess) {
        setProducts(res.data);
      } else {
        setError(res.error || "Failed to load products");
      }
    }).catch(() => {
      setError("Unable to load products");
    }).finally(() => setLoading(false));
  };

  useEffect(loadData, []);

  const totalPages = Math.max(1, Math.ceil(products.length / pageSize));
  const paginated = products.slice((page - 1) * pageSize, page * pageSize);

  const handleCreate = async () => {
    if (!form.name.trim() || !form.price.trim()) return;
    const priceNum = parseFloat(form.price);
    if (isNaN(priceNum) || priceNum < 0) return;
    setSaving(true);
    try {
      const ownerId = localStorage.getItem("userId") || "";
      const res = await productService.create({ name: form.name.trim(), ownerId, price: priceNum });
      if (res.isSuccess) {
        setProducts((prev) => [res.data, ...prev]);
        setShowAdd(false);
        setForm({ name: "", price: "" });
        toast.success("Product created!");
      } else {
        toast.error(res.error || "Failed to create product");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create product");
    } finally {
      setSaving(false);
    }
  };

  const openEdit = (product: Product) => {
    setEditForm({ id: product.id, name: product.name, price: String(product.price) });
    setShowEdit(true);
  };

  const handleEdit = async () => {
    if (!editForm.name.trim() || !editForm.price.trim()) return;
    const priceNum = parseFloat(editForm.price);
    if (isNaN(priceNum) || priceNum < 0) return;
    setEditing(true);
    try {
      const ownerId = localStorage.getItem("userId") || "";
      const res = await productService.edit({ id: editForm.id, name: editForm.name.trim(), ownerId, price: priceNum });
      if (res.isSuccess) {
        setProducts((prev) => prev.map((p) => (p.id === editForm.id ? res.data : p)));
        setShowEdit(false);
        toast.success("Product updated!");
      } else {
        toast.error(res.error || "Failed to update product");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update product");
    } finally {
      setEditing(false);
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <ToastContainer />
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900" style={{ fontFamily: "Sora, sans-serif" }}>Products</h1>
          <p className="text-sm text-gray-500 mt-0.5">View and manage your products</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => { const id = localStorage.getItem("userId"); if (id) window.open(`/store/${id}`, "_blank"); }} className="flex items-center gap-1.5 lg:gap-2 border border-[#057F44] text-[#057F44] rounded-full px-3 lg:px-5 py-1.5 lg:py-2 text-xs lg:text-sm font-semibold hover:bg-[#e8f5ee] transition-colors">
            <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View Store
          </button>
          <button onClick={() => setShowAdd(true)} className="flex items-center gap-1.5 lg:gap-2 bg-[#057F44] text-white rounded-full px-3 lg:px-5 py-1.5 lg:py-2 text-xs lg:text-sm font-semibold hover:bg-[#045f35] transition-colors">
            <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            Add Product
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl overflow-hidden">
        <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "Sora, sans-serif" }}>All Products</h2>
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
          <div className="p-8 text-center text-sm text-gray-400">No products yet. Click "Add Product" to create one.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-gray-100">
                  {/* <th className="px-3 lg:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">ID</th> */}
                  <th className="px-3 lg:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</th>
                  <th className="px-3 lg:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Price</th>
                  <th className="px-3 lg:px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginated.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                    {/* <td className="px-3 lg:px-6 py-3 lg:py-4 text-sm text-gray-500">{product.id}</td> */}
                    <td className="px-3 lg:px-6 py-3 lg:py-4">
                      <span className="text-sm font-medium text-[#057F44]">{product.name}</span>
                    </td>
                    <td className="px-3 lg:px-6 py-3 lg:py-4 text-sm font-medium text-gray-800">{formatPrice(product.price)}</td>
                    <td className="px-3 lg:px-6 py-3 lg:py-4 text-right">
                      <button onClick={() => openEdit(product)} className="text-xs font-medium text-[#057F44] hover:underline">Edit</button>
                    </td>
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
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowAdd(false)} />
          <div className="relative bg-white rounded-2xl w-full max-w-lg mx-4 p-6 space-y-5">
            <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: "Sora, sans-serif" }}>Add Product</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#057F44]" placeholder="Product name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₦) *</label>
                <input type="number" min="0" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#057F44]" placeholder="0.00" />
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button onClick={() => setShowAdd(false)} className="flex-1 border border-gray-200 rounded-full py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleCreate} disabled={saving} className="flex-1 bg-[#057F44] text-white rounded-full py-2.5 text-sm font-semibold hover:bg-[#045f35] transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                {saving ? <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg> : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 lg:p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowEdit(false)} />
          <div className="relative bg-white rounded-2xl w-full max-w-lg mx-4 p-6 space-y-5">
            <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: "Sora, sans-serif" }}>Edit Product</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input type="text" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#057F44]" placeholder="Product name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₦) *</label>
                <input type="number" min="0" step="0.01" value={editForm.price} onChange={(e) => setEditForm({ ...editForm, price: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#057F44]" placeholder="0.00" />
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button onClick={() => setShowEdit(false)} className="flex-1 border border-gray-200 rounded-full py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleEdit} disabled={editing} className="flex-1 bg-[#057F44] text-white rounded-full py-2.5 text-sm font-semibold hover:bg-[#045f35] transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                {editing ? <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg> : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
