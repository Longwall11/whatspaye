import Link from "next/link";

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-3xl lg:text-4xl font-bold text-center mb-2"
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          Simple, Transparent Pricing
        </h2>
        <p className="text-center text-[#057F44] font-medium mb-4">
          No Monthly Fee
        </p>
        <p className="text-center text-[#1a1a1a]/70 max-w-xl mx-auto mb-12">
          WhatsPaye is free to start. Generate invoices and share payment links at no cost,
          then pay a small fee only when you receive payment.
        </p>

        <div className="max-w-sm mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3
              className="text-xl font-semibold text-center mb-6"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Pay as you get paid
            </h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#057F44]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>No subscription or setup fees</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#057F44]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Only pay a small fee per successful transaction</span>
              </li>
            </ul>
            <Link
              href="/auth/signup"
              className="block w-full bg-[#057F44] text-white py-4 rounded-full font-semibold text-center hover:bg-[#045f35] transition-colors"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}