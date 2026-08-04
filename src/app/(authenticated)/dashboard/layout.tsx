"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

interface UserInfo {
  userName: string;
  id: string;
}

function IconDashboard({ active }: { active: boolean }) {
  return (
    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke={active ? "white" : "currentColor"} strokeWidth={1.8}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" stroke={active ? "white" : "currentColor"} />
      <rect x="14" y="3" width="7" height="7" rx="1.5" stroke={active ? "white" : "currentColor"} />
      <rect x="3" y="14" width="7" height="7" rx="1.5" stroke={active ? "white" : "currentColor"} />
      <rect x="14" y="14" width="7" height="7" rx="1.5" stroke={active ? "white" : "currentColor"} />
    </svg>
  );
}

function IconInvoices({ active }: { active: boolean }) {
  return (
    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke={active ? "white" : "currentColor"} strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function IconCustomers({ active }: { active: boolean }) {
  return (
    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke={active ? "white" : "currentColor"} strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function IconProducts({ active }: { active: boolean }) {
  return (
    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke={active ? "white" : "currentColor"} strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );
}

function IconSettings({ active }: { active: boolean }) {
  return (
    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke={active ? "white" : "currentColor"} strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function IconLogout() {
  return (
    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  );
}

function IconChevron() {
  return (
    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

const navItems = [
  { label: "Dashboard", href: "/dashboard", Icon: IconDashboard },
  { label: "Invoices", href: "/dashboard/invoices", Icon: IconInvoices },
  // { label: "Customers", href: "/dashboard/customers", Icon: IconCustomers },
  { label: "Products", href: "/dashboard/products", Icon: IconProducts },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(() => {
    const userName = localStorage.getItem("userName");
    const userId = localStorage.getItem("userId");
    if (userName && userId) return { userName, id: userId };
    return null;
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    router.push("/auth/signin");
  };

  const handleLogoutFromDropdown = () => {
    setShowDropdown(false);
    handleLogout();
  };

  useEffect(() => {
    if (!showDropdown) return;
    const handleClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".user-dropdown")) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [showDropdown]);

  if (!userInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
        <div className="w-8 h-8 border-4 border-[#057F44] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const initials = userInfo.userName.charAt(0).toUpperCase();
  const displayName =
    userInfo.userName.length > 12
      ? userInfo.userName.slice(0, 12) + "..."
      : userInfo.userName;

  const sidebarContent = (
    <>
      <nav className="flex-1 px-4 pt-6 flex flex-col gap-1">
        {navItems.map(({ label, href, Icon }) => {
          const isActive =
            href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#057F44] text-white"
                  : "text-gray-500 hover:text-gray-800 hover:bg-white"
              }`}
            >
              <Icon active={isActive} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 pb-8">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-full text-sm font-medium text-gray-500 hover:text-gray-800 hover:bg-white transition-all"
        >
          <IconLogout />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="flex flex-col h-screen bg-[#f5f5f5] overflow-hidden">

      {/* Top bar */}
      <header className="bg-white border-b border-gray-100 flex items-center justify-between shrink-0 px-4 lg:px-0">
        {/* Logo area with hamburger on mobile */}
        <div className="flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 mr-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          <div className="w-40 lg:w-60 shrink-0 px-2 lg:px-7 py-4 lg:py-5">
            <div className="relative w-32 lg:w-36 h-8 lg:h-9">
              <Image
                src="/whatspaye-logo.png"
                alt="WhatsPaye"
                fill
                className="object-contain object-left"
              />
            </div>
          </div>
        </div>

        {/* User dropdown */}
        <div className="flex items-center gap-2 lg:gap-4 px-2 lg:px-8">
          <div className="relative user-dropdown">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-1.5 lg:gap-2.5 border border-gray-200 rounded-full px-2 lg:px-3 py-1.5 hover:bg-gray-50 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-[#e8f5ee] flex items-center justify-center text-[#057F44] text-xs font-bold shrink-0">
                {initials}
              </div>
              <span className="text-sm font-medium text-gray-800 hidden sm:block">{displayName}</span>
              <IconChevron />
            </button>

            {showDropdown && (
              <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-2xl shadow-lg border border-gray-100 py-2 z-50">
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    router.push("/dashboard/settings");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#e8f5ee] transition-colors text-left"
                >
                  <IconSettings active={false} />
                  Settings
                </button>
                <div className="my-1 border-t border-gray-100" />
                <button
                  onClick={handleLogoutFromDropdown}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors text-left"
                >
                  <IconLogout />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Body row */}
      <div className="flex flex-1 min-h-0 relative">

        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-60 shrink-0 flex-col">
          {sidebarContent}
        </aside>

        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
          <div className="flex flex-col h-full">
            {/* Mobile header */}
            <div className="flex items-center justify-between px-4 py-5 border-b border-gray-100">
              <div className="relative w-36 h-9">
                <Image
                  src="/whatspaye-logo.png"
                  alt="WhatsPaye"
                  fill
                  className="object-contain object-left"
                />
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {sidebarContent}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>

      </div>
    </div>
  );
}
