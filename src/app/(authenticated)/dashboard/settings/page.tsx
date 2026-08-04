"use client";

import { useState, useEffect } from "react";
import { invoiceService } from "@/services/invoiceService";
import { Invoice } from "@/types/invoice";
import StatusBadge from "@/components/StatusBadge";

export const dynamic = "force-dynamic";

type SettingsTab =
  | "business-info"
  | "payouts"
  | "help-center"
  | "change-password";



const mockFAQs = [
  { q: "How do I create an invoice?", a: "Go to the Invoices page and click 'Create Invoice'. Fill in the customer details, add items, and save. You can then send it via WhatsApp or email." },
  { q: "How do I set up payment links?", a: "Navigate to Payment Links and click 'Create Link'. Enter the amount and description, then share the generated link with your customers." },
  { q: "When will I receive my payout?", a: "Payouts are processed within 24-48 hours after a payment is confirmed. You can request a payout from the Payouts section." },
  { q: "Is there a monthly subscription fee?", a: "No, WhatsPaye has no monthly fees. You only pay a small transaction fee when you receive payments." },
];



function formatPrice(amount: number) {
  return `₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("payouts");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [successInvoices, setSuccessInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  // Password form
  const [pwdForm, setPwdForm] = useState({ current: "", new: "", confirm: "" });

  useEffect(() => {
    const vendorId = localStorage.getItem("userId");
    if (!vendorId) { setLoading(false); return; }
    invoiceService.getHistory(vendorId).then((res) => {
      if (res.isSuccess) {
        const s = res.data.filter((inv) => {
          const st = inv.status.toLowerCase();
          return st === "success" || st === "paid";
        });
        setSuccessInvoices(s);
      }
      if (!res.isSuccess) setLoadError(true);
    }).catch(() => {
      setLoadError(true);
    }).finally(() => setLoading(false));
  }, []);

  const tabs = [
    // { key: "business-info" as SettingsTab, label: "Business Info" },
    { key: "payouts" as SettingsTab, label: "Payment Received" },
    { key: "help-center" as SettingsTab, label: "Help Centre" },
    { key: "change-password" as SettingsTab, label: "Change Password" },
  ];

  // const saveBusinessInfo = () => {
  //   alert("Business info updated successfully!");
  // };



  const changePassword = () => {
    if (!pwdForm.current || !pwdForm.new || !pwdForm.confirm) return;
    if (pwdForm.new !== pwdForm.confirm) {
      alert("New passwords do not match!");
      return;
    }
    alert("Password changed successfully!");
    setPwdForm({ current: "", new: "", confirm: "" });
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <div>
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900" style={{ fontFamily: "Sora, sans-serif" }}>
          Settings
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your account and preferences</p>
      </div>

      {/* Mobile Tab Bar */}
      <div className="lg:hidden overflow-x-auto -mx-4 px-4">
        <div className="flex gap-2 pb-2">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === key
                  ? "bg-[#057F44] text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4 lg:gap-6">
        {/* Inner Sidebar - Desktop only */}
        <aside className="hidden lg:block w-56 shrink-0">
          <nav className="space-y-1">
            {tabs.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-left ${
                  activeTab === key
                    ? "bg-[#e8f5ee] text-[#057F44] border-l-4 border-[#057F44]"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* ===== Business Info ===== */}
          {/* {activeTab === "business-info" && (
            <div className="bg-white rounded-2xl p-4 lg:p-6 space-y-4 lg:space-y-5">
              <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: "Sora, sans-serif" }}>Business Info</h2>
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-2xl bg-[#e8f5ee] flex items-center justify-center shrink-0">
                  <svg className="w-10 h-10 text-[#057F44]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h2M7 3h10M9 7h6m-6 4h6m-6 4h6m-6 4h6" />
                  </svg>
                </div>
                <button className="text-sm text-[#057F44] font-medium hover:underline">Change Logo</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                  <input
                    type="text"
                    value={bizForm.name}
                    onChange={(e) => setBizForm({ ...bizForm, name: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#057F44]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={bizForm.email}
                    onChange={(e) => setBizForm({ ...bizForm, email: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#057F44]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={bizForm.phone}
                    onChange={(e) => setBizForm({ ...bizForm, phone: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#057F44]"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    value={bizForm.address}
                    onChange={(e) => setBizForm({ ...bizForm, address: e.target.value })}
                    rows={2}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#057F44] resize-none"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button onClick={saveBusinessInfo} className="bg-[#057F44] text-white rounded-full px-6 py-2.5 text-sm font-semibold hover:bg-[#045f35] transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          )} */}

          


          {/* ===== Payment Received ===== */}
          {activeTab === "payouts" && (
            <div className="space-y-5">
              <div className="bg-white rounded-2xl overflow-hidden">
                <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "Sora, sans-serif" }}>Payment History</h3>
                </div>
                <div className="overflow-x-auto">
                  {loading ? (
                    <div className="p-8 flex justify-center">
                      <div className="w-8 h-8 border-4 border-[#057F44] border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : loadError ? (
                    <div className="p-8 text-center text-sm text-red-500">Unable to load payment history.</div>
                  ) : successInvoices.length === 0 ? (
                    <div className="p-8 text-center text-sm text-gray-400">No successful payments yet.</div>
                  ) : (
                    <table className="w-full min-w-[500px]">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="px-3 lg:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Customer</th>
                          <th className="px-3 lg:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
                          <th className="px-3 lg:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Amount</th>
                          <th className="px-3 lg:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {successInvoices.map((inv) => (
                          <tr key={inv.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-3 lg:px-6 py-3 lg:py-4">
                              <span className="text-sm font-medium text-[#057F44]">{inv.customerName}</span>
                            </td>
                            <td className="px-3 lg:px-6 py-3 lg:py-4 text-sm text-gray-600">{formatDate(inv.created)}</td>
                            <td className="px-3 lg:px-6 py-3 lg:py-4 text-sm font-medium text-gray-800">{formatPrice(inv.amount)}</td>
                            <td className="px-3 lg:px-6 py-3 lg:py-4"><StatusBadge status={inv.status} /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ===== Help Centre ===== */}
          {activeTab === "help-center" && (
            <div className="bg-white rounded-2xl p-4 lg:p-6 space-y-4 lg:space-y-5">
              <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: "Sora, sans-serif" }}>Help Centre</h2>
              <div className="space-y-3">
                {mockFAQs.map((faq, index) => (
                  <div key={index} className="border border-gray-100 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                      className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-800">{faq.q}</span>
                      <svg className={`w-4 h-4 text-gray-400 transition-transform ${expandedFAQ === index ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {expandedFAQ === index && (
                      <div className="px-4 pb-4 pt-0">
                        <p className="text-sm text-gray-600">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-5">
                <p className="text-sm text-gray-600">Still need help?</p>
                <a href="mailto:support@whatspaye.com" className="inline-flex items-center gap-2 mt-2 text-sm text-[#057F44] font-medium hover:underline">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Support: support@whatspaye.com
                </a>
              </div>
            </div>
          )}

          {/* ===== Change Password ===== */}
          {activeTab === "change-password" && (
            <div className="bg-white rounded-2xl p-4 lg:p-6 space-y-4 lg:space-y-5 w-full lg:max-w-md">
              <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: "Sora, sans-serif" }}>Change Password</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    value={pwdForm.current}
                    onChange={(e) => setPwdForm({ ...pwdForm, current: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#057F44]"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    value={pwdForm.new}
                    onChange={(e) => setPwdForm({ ...pwdForm, new: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#057F44]"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    value={pwdForm.confirm}
                    onChange={(e) => setPwdForm({ ...pwdForm, confirm: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#057F44]"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button onClick={changePassword} className="bg-[#057F44] text-white rounded-full px-6 py-2.5 text-sm font-semibold hover:bg-[#045f35] transition-colors">
                  Change Password
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
