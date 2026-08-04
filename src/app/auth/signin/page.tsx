"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authService } from "@/services/authService";
import { customerService } from "@/services/customerService";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authService.login(formData);

      if (response.isSuccess && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("userName", response.data.userName);

        const customerInfo = await customerService.getInfo(response.data.id);

        toast.success("Login successful!");
        if (customerInfo.isSuccess && customerInfo.data?.status === "completed") {
          router.push("/dashboard");
        } else if (customerInfo.isSuccess && customerInfo.data?.status === "pending") {
          router.push("/dashboard");
        } else {
          router.push("/onboarding");
        }
      } else {
        toast.error(response.error || "Login failed");
      }
    } catch (error: unknown) {
      console.error("Login error:", error);
      const axiosErr = error as { response?: { data?: { error?: string } } };
      const message = axiosErr.response?.data?.error || (error instanceof Error ? error.message : "Login failed. Please try again.");
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex">
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Sora, sans-serif" }}>Login</h1>
              <p className="text-gray-600 mt-1">Welcome back! Sign in to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  id="userName"
                  name="userName"
                  type="tel"
                  required
                  value={formData.userName}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#057F44]"
                  placeholder="Phone Number"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#057F44]"
                  placeholder="Enter your password"
                />
              </div>

              <Link href="/forgot-password" className="text-sm text-[#057F44] hover:underline block">
                Forgot password?
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#057F44] text-white rounded-full py-3 text-sm font-semibold hover:bg-[#045f35] transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-gray-600">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="text-[#057F44] font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden lg:flex lg:w-1/2 bg-[#057F44] items-center justify-center p-8">
          <div className="text-center">
            <div className="w-80 h-80 mx-auto mb-6">
              <img src="/hero-section.png" alt="Get Paid on WhatsApp Instantly!" className="w-full h-full object-contain" />
            </div>
            <p className="text-white text-2xl font-bold">Get Paid on WhatsApp Instantly!</p>
          </div>
        </div>
      </div>
    </>
  );
}