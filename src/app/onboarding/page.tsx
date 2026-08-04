"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { customerService } from "@/services/customerService";
import type { Bank } from "@/types/customer";

export const dynamic = "force-dynamic";

export default function OnboardingPage() {
  const router = useRouter();

  const [pageReady, setPageReady] = useState(false);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loading, setLoading] = useState(false);
  const [banksLoading, setBanksLoading] = useState(true);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    accountNumber: "",
    bankId: "",
    bankCode: "",
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.push("/auth/signin");
      return;
    }

    customerService.getInfo(userId).then((res) => {
      if (res.isSuccess && res.data) {
        if (res.data.status === "completed" || res.data.status === "pending") {
          router.push("/dashboard");
          return;
        }
      }
      setPageReady(true);
    });
  }, [router]);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const res = await customerService.getBanks();
        if (res.isSuccess) {
          setBanks(res.data);
        } else {
          toast.error("Failed to load banks");
        }
      } catch {
        toast.error("Failed to load banks");
      } finally {
        setBanksLoading(false);
      }
    };
    fetchBanks();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "bankId") {
      const selected = banks.find((b) => b.id.toString() === value);
      setForm({
        ...form,
        bankId: value,
        bankCode: selected?.code || "",
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("User not found. Please log in again.");
      router.push("/auth/signin");
      return;
    }

    try {
      const res = await customerService.createInfo({
        firstName: form.firstName,
        lastName: form.lastName,
        accountNumber: form.accountNumber,
        bankCode: form.bankCode,
        userId,
        requestId: 0,
        bankId: Number(form.bankId),
        isValid: true,
      });

      if (res.isSuccess) {
        toast.success("Profile created successfully!");
        router.push("/dashboard");
      } else {
        toast.error(res.error || "Failed to create profile");
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Something went wrong. Please try again.";
      toast.error(message);
      console.error("Create customer error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!pageReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
        <div className="w-8 h-8 border-4 border-[#057F44] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
        <div className="w-full max-w-md bg-white rounded-2xl p-8 space-y-6">
          <div className="mb-6 text-center">
            <h1
              className="text-2xl font-bold text-gray-900"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Complete Your Profile
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Set up your account to start receiving payments
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#057F44]"
                  placeholder="First name"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#057F44]"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Account Number
              </label>
              <input
                id="accountNumber"
                name="accountNumber"
                type="text"
                required
                value={form.accountNumber}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#057F44]"
                placeholder="Enter your bank account number"
              />
            </div>

            <div>
              <label htmlFor="bankId" className="block text-sm font-medium text-gray-700 mb-1">
                Bank
              </label>
              <select
                id="bankId"
                name="bankId"
                required
                value={form.bankId}
                onChange={handleChange}
                disabled={banksLoading}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#057F44] bg-white"
              >
                <option value="">
                  {banksLoading ? "Loading banks..." : "Select your bank"}
                </option>
                {banks.map((bank) => (
                  <option key={bank.id} value={bank.id}>
                    {bank.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading || banksLoading}
              className="w-full bg-[#057F44] text-white rounded-full py-3 text-sm font-semibold hover:bg-[#045f35] transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                "Complete Setup"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
