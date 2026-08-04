"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { invoiceService } from "@/services/invoiceService";
import { Invoice } from "@/types/invoice";

export const dynamic = "force-dynamic";

interface UserInfo {
  userName: string;
}

const quickActions = [
  {
    label: "Create Invoice",
    description: "Send invoices to clients",
    href: "/dashboard/invoices",
    bg: "#e8f5ee",
    iconColor: "#057F44",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    label: "Products",
    description: "Manage your products",
    href: "/dashboard/products",
    bg: "#e8f5ee",
    iconColor: "#057F44",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    label: "Help Centre",
    description: "Get support anytime",
    href: "/dashboard/settings",
    bg: "#e8f5ee",
    iconColor: "#057F44",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

function formatPrice(amount: number) {
  return `₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function statusBadge(status: string) {
  const s = status.toLowerCase();
  if (s === "paid" || s === "success")
    return <span className="text-[#057F44] font-medium text-sm">{status}</span>;
  if (s === "pending")
    return <span className="text-amber-500 font-medium text-sm">{status}</span>;
  return <span className="text-red-500 font-medium text-sm">{status}</span>;
}

export default function DashboardPage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (userName) setUserInfo({ userName });
  }, []);

  const fetchInvoices = () => {
    const vendorId = localStorage.getItem("userId");
    if (!vendorId) return;
    setLoading(true);
    setError(false);
    invoiceService.getHistory(vendorId).then((res) => {
      if (res.isSuccess) setInvoices(res.data);
      else setError(true);
    }).catch(() => {
      setError(true);
    }).finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const firstName = userInfo?.userName?.split(" ")[0] ?? "User";
  const router = useRouter();
  const [vendorId, setVendorId] = useState<string | null>(null);

  useEffect(() => {
    setVendorId(localStorage.getItem("userId"));
  }, []);

  const totalRevenue = invoices
    .filter((inv) => {
      const s = inv.status.toLowerCase();
      return s === "success" || s === "paid";
    })
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="flex flex-col xl:flex-row gap-4 lg:gap-6">
      {/* Main content */}
      <div className="flex-1 min-w-0 space-y-4 lg:space-y-6">
        {/* Greeting */}
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900" style={{ fontFamily: "Sora, sans-serif" }}>
            Hello, <span className="font-bold">{firstName}</span>
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">What do you want to do today?</p>
        </div>

        {/* Revenue overview card */}
        <div className="bg-white rounded-2xl p-4 lg:p-6 flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#e8f5ee] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#057F44]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Total Revenue</p>
              {loading ? (
                <div className="mt-1">
                  <svg className="animate-spin h-5 w-5 text-[#057F44]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                </div>
              ) : error ? (
                <button
                  onClick={fetchInvoices}
                  className="text-xs text-red-500 hover:text-red-600 mt-1 flex items-center gap-1"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Retry
                </button>
              ) : (
                <p className="text-xl lg:text-2xl font-bold text-gray-900 mt-0.5">{formatPrice(totalRevenue)}</p>
              )}
            </div>
          </div>

          <div className="w-full lg:w-px h-px lg:h-12 bg-gray-200" />

          <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 w-full">
            <p className="text-sm text-gray-500">
              Create invoices or generate payment links to start receiving payments
            </p>
            <Link
              href="/dashboard/invoices"
              className="flex items-center gap-2 border border-[#057F44] text-[#057F44] rounded-full px-5 py-2 text-sm font-semibold hover:bg-[#e8f5ee] transition-colors whitespace-nowrap"
            >
              <span className="text-base leading-none">+</span>
              Create Invoice
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-base font-semibold text-gray-800 mb-3" style={{ fontFamily: "Sora, sans-serif" }}>
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="bg-white rounded-2xl p-4 lg:p-5 transition-all hover:-translate-y-0.5 flex items-start gap-3 lg:gap-4 group"
              >
                <div
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: action.bg, color: action.iconColor }}
                >
                  {action.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{action.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Your Store CTA */}
        {vendorId && (
          <div className="bg-gradient-to-r from-[#057F44] to-[#045f35] rounded-2xl p-4 lg:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Your Store</p>
                <p className="text-xs text-white/70">Share your public store link with customers</p>
              </div>
            </div>
            <button
              onClick={() => window.open(`/store/${vendorId}`, "_blank")}
              className="flex items-center gap-2 bg-white text-[#057F44] rounded-full px-5 py-2 text-sm font-semibold hover:bg-gray-50 transition-colors whitespace-nowrap"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Store
            </button>
          </div>
        )}
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="px-4 lg:px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "Sora, sans-serif" }}>
              Recent Activity
            </h2>
            <Link
              href="/dashboard/invoices"
              className="text-xs text-[#057F44] font-medium hover:underline"
            >
              View all
            </Link>
          </div>

          {invoices.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-400">No invoices yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Customer</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Phone</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Amount</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 lg:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#e8f5ee] flex items-center justify-center shrink-0">
                            <svg className="w-4 h-4 text-[#057F44]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                           <span className="text-sm text-[#057F44] font-medium">{inv.customerName}</span>
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-500">{inv.customerPhone || "—"}</td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-500">{formatDate(inv.created)}</td>
                      <td className="px-4 lg:px-6 py-4 text-sm font-medium text-gray-800">{formatPrice(inv.amount)}</td>
                      <td className="px-4 lg:px-6 py-4">{statusBadge(inv.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Right panel - stacks below on mobile */}
      <div className="w-full xl:w-72 shrink-0 space-y-4 lg:space-y-5">
        {/* Recent Customers */}
        {/*
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="px-4 lg:px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "Sora, sans-serif" }}>
              Recent Customers
            </h2>
            <Link href="/dashboard/customers" className="text-xs text-[#057F44] font-medium hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentCustomers.map((c, i) => (
              <div key={i} className="px-4 lg:px-5 py-3.5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#e8f5ee] flex items-center justify-center text-[#057F44] text-sm font-bold shrink-0">
                  {c.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{c.name}</p>
                  <p className="text-xs text-gray-500">{c.phone}</p>
                </div>
                <span className="ml-auto text-xs text-gray-400 whitespace-nowrap">{c.type}</span>
              </div>
            ))}
          </div>
        </div>
        */}
      </div>
    </div>
  );
}
