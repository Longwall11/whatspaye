"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { customerService } from "@/services/customerService";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "completed" | "pending">("loading");
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");

    if (!token || !userId || !userName) {
      router.push("/auth/signin");
      return;
    }

    const checkStatus = async () => {
      try {
        const res = await customerService.getInfo(userId);
        if (res.isSuccess && res.data) {
          if (res.data.status === "completed") {
            setStatus("completed");
          } else if (res.data.status === "pending") {
            setStatus("pending");
            if (!pollingRef.current) {
              pollingRef.current = setInterval(async () => {
                try {
                  const pollRes = await customerService.getInfo(userId);
                  if (pollRes.isSuccess && pollRes.data?.status === "completed") {
                    if (pollingRef.current) {
                      clearInterval(pollingRef.current);
                      pollingRef.current = null;
                    }
                    router.push("/dashboard");
                  }
                } catch {
                  // silent
                }
              }, 30000);
            }
          } else {
            router.push("/onboarding");
          }
        } else {
          router.push("/onboarding");
        }
      } catch {
        router.push("/onboarding");
      }
    };

    checkStatus();

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    };
  }, [router]);

  if (status === "pending") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5f5] px-4">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-amber-50 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Account Pending Verification</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Your account is being currently verified, please check back shortly.
          </p>
        </div>
      </div>
    );
  }

  if (status !== "completed") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
        <div className="w-8 h-8 border-4 border-[#057F44] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
