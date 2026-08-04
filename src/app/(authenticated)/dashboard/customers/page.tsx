"use client";

import { useState } from "react";
import StatusBadge from "@/components/StatusBadge";

type Status = "All" | "Active" | "Inactive";
type ModalMode = "add" | "edit" | "delete";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: "Active" | "Inactive";
}

const mockCustomers: Customer[] = [
  { id: "1", name: "Chukwuemeka Ltd", email: "info@chukwuemeka.com", phone: "08141422340", address: "12 Lagos St, Lagos", status: "Active" },
  { id: "2", name: "Adaeze Fashion", email: "adaeze@fashion.ng", phone: "07035123540", address: "45 Victoria Island, Lagos", status: "Active" },
  { id: "3", name: "TechBridge NG", email: "hello@techbridge.ng", phone: "09016300380", address: "78 Yaba Tech Hub, Lagos", status: "Active" },
  { id: "4", name: "Kemi Stores", email: "kemi@kemistores.com", phone: "08023400190", address: "22 Ikeja City Mall, Lagos", status: "Inactive" },
  { id: "5", name: "GreenLeaf Agro", email: "sales@greenleaf.ng", phone: "07011234567", address: "90 Abeokuta Rd, Ogun", status: "Active" },
  { id: "6", name: "BoltFast Dispatch", email: "ops@boltfast.com", phone: "08099887766", address: "33 Lekki Phase 1, Lagos", status: "Inactive" },
  { id: "7", name: "Sunrise Bakery", email: "sunrise@bakery.ng", phone: "08155443322", address: "15 Surulere, Lagos", status: "Active" },
  { id: "8", name: "Nduka Electronics", email: "nduka@electronics.ng", phone: "07066554433", address: "60 Alaba Market, Lagos", status: "Active" },
  { id: "9", name: "Lagos Fabrics Co.", email: "info@lagosfabrics.com", phone: "09033221100", address: "88 Balogun St, Lagos", status: "Active" },
  { id: "10", name: "Pinnacle Logistics", email: "contact@pinnacle.ng", phone: "08177665544", address: "42 Apapa Port, Lagos", status: "Inactive" },
];

const PAGE_SIZE = 10;
let nextId = 11;

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [statusFilter, setStatusFilter] = useState<Status>("All");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);

  const [modalMode, setModalMode] = useState<ModalMode | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", status: "Active" as "Active" | "Inactive" });

  const filtered = customers.filter((c) =>
    statusFilter === "All" ? true : c.status === statusFilter
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const openAdd = () => {
    setSelectedCustomer(null);
    setForm({ name: "", email: "", phone: "", address: "", status: "Active" });
    setModalMode("add");
  };

  const openEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setForm({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      status: customer.status,
    });
    setModalMode("edit");
  };

  const openDelete = (customer: Customer) => {
    setSelectedCustomer(customer);
    setModalMode("delete");
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) return;
    if (modalMode === "add") {
      const newCustomer: Customer = {
        id: String(nextId++),
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        status: form.status,
      };
      setCustomers((prev) => [newCustomer, ...prev]);
    } else if (selectedCustomer) {
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === selectedCustomer.id
            ? { ...c, name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim(), address: form.address.trim(), status: form.status }
            : c
        )
      );
    }
    setModalMode(null);
  };

  const handleDelete = () => {
    if (!selectedCustomer) return;
    setCustomers((prev) => prev.filter((c) => c.id !== selectedCustomer.id));
    setModalMode(null);
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900" style={{ fontFamily: "Sora, sans-serif" }}>
            Customers
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">View and manage your customers</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button className="flex items-center gap-2 border border-gray-200 rounded-full px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm text-gray-600 bg-white hover:bg-gray-50 transition-colors">
            All Customers
            <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          <button className="flex items-center gap-2 border border-gray-200 rounded-full px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm text-gray-600 bg-white hover:bg-gray-50 transition-colors">
            Select date
            <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
        </div>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl overflow-hidden">
        <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "Sora, sans-serif" }}>All Customers</h2>
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <div className="flex flex-wrap items-center gap-2">
              {(["All", "Active", "Inactive"] as Status[]).map((s) => (
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
            <button onClick={openAdd} className="flex items-center gap-1.5 lg:gap-2 bg-[#057F44] text-white rounded-full px-3 lg:px-5 py-1.5 lg:py-2 text-xs lg:text-sm font-semibold hover:bg-[#045f35] transition-colors ml-auto sm:ml-0">
              <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              <span className="hidden sm:inline">Add Customer</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Customer</th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Phone</th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Address</th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginated.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-3 lg:px-6 py-3 lg:py-4">
                    <div className="flex items-center gap-2 lg:gap-3">
                      <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-[#e8f5ee] flex items-center justify-center text-[#057F44] text-sm font-bold shrink-0">{customer.name.charAt(0)}</div>
                      <span className="text-sm font-medium text-[#057F44]">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-3 lg:px-6 py-3 lg:py-4 text-sm text-gray-600">{customer.email}</td>
                  <td className="px-3 lg:px-6 py-3 lg:py-4 text-sm text-gray-600">{customer.phone}</td>
                  <td className="px-3 lg:px-6 py-3 lg:py-4 text-sm text-gray-500 truncate max-w-[160px] hidden md:table-cell">{customer.address}</td>
                  <td className="px-3 lg:px-6 py-3 lg:py-4"><StatusBadge status={customer.status} /></td>
                  <td className="px-3 lg:px-6 py-3 lg:py-4">
                    <div className="flex items-center gap-1">
                      <button onClick={() => openEdit(customer)} className="p-1.5 rounded-lg hover:bg-[#e8f5ee] transition-colors" title="Edit">
                        <svg className="w-4 h-4 text-[#057F44]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button onClick={() => openDelete(customer)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors" title="Delete">
                        <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 lg:px-6 py-3 lg:py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Show</span>
            <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className="border border-gray-200 rounded-full px-3 py-1 text-sm text-gray-600 bg-white focus:outline-none">
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="flex items-center gap-1.5 lg:gap-2">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-3 lg:px-4 py-1.5 rounded-full border border-gray-200 text-xs lg:text-sm text-gray-600 disabled:opacity-40 hover:bg-gray-50 transition-colors">Prev</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} onClick={() => setPage(p)} className={`w-7 h-7 lg:w-8 lg:h-8 rounded-full text-xs lg:text-sm font-medium transition-colors ${p === page ? "bg-[#057F44] text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>{p}</button>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 lg:px-4 py-1.5 rounded-full border border-gray-200 text-xs lg:text-sm text-gray-600 disabled:opacity-40 hover:bg-gray-50 transition-colors">Next</button>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {modalMode === "add" || modalMode === "edit" ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setModalMode(null)} />
          <div className="relative bg-white rounded-2xl w-full max-w-md mx-4 p-6 space-y-5">
            <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: "Sora, sans-serif" }}>{modalMode === "add" ? "Add Customer" : "Edit Customer"}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#057F44]" placeholder="Customer name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#057F44]" placeholder="Email address" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#057F44]" placeholder="Phone number" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input type="text" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#057F44]" placeholder="Address (optional)" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as "Active" | "Inactive" })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#057F44] bg-white">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button onClick={() => setModalMode(null)} className="flex-1 border border-gray-200 rounded-full py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleSave} className="flex-1 bg-[#057F44] text-white rounded-full py-2.5 text-sm font-semibold hover:bg-[#045f35] transition-colors">{modalMode === "add" ? "Add Customer" : "Save Changes"}</button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Delete Confirmation Modal */}
      {modalMode === "delete" && selectedCustomer ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setModalMode(null)} />
          <div className="relative bg-white rounded-2xl w-full max-w-sm mx-4 p-6 space-y-5 text-center">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto">
              <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: "Sora, sans-serif" }}>Delete Customer</h3>
            <p className="text-sm text-gray-500">Are you sure you want to delete <span className="font-semibold text-gray-800">{selectedCustomer.name}</span>? This action cannot be undone.</p>
            <div className="flex items-center gap-3 pt-2">
              <button onClick={() => setModalMode(null)} className="flex-1 border border-gray-200 rounded-full py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleDelete} className="flex-1 bg-red-500 text-white rounded-full py-2.5 text-sm font-semibold hover:bg-red-600 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
