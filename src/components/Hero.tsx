import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#e8f5ee] via-[#fafafa] to-[#fafafa]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Get Paid on WhatsApp{" "}
              <span className="text-[#057F44]">Instantly!</span>
            </h1>
            <p className="text-lg text-[#1a1a1a]/80 mb-8 leading-relaxed">
              WhatsPaye helps small businesses who sell via WhatsApp send professional
              invoices and get paid fast. No screenshots. No stories. Just payment.
            </p>
            <Link
              href="/auth/signup"
              className="inline-block bg-[#057F44] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#045f35] transition-colors"
            >
              Get Started Free
            </Link>
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <div className="flex items-center gap-2 text-sm text-[#1a1a1a]/70">
                <svg className="w-5 h-5 text-[#057F44]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No monthly fees
              </div>
              <div className="flex items-center gap-2 text-sm text-[#1a1a1a]/70">
                <svg className="w-5 h-5 text-[#057F44]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Built for Nigerian businesses
              </div>
            </div>
            <p className="text-sm text-[#1a1a1a]/60 mt-4">
              We&apos;re with WhatsApp & chat
            </p>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative mx-auto max-w-xs lg:max-w-sm">
              <img
                src="/hero-section.png"
                alt="Get Paid on WhatsApp Instantly"
                className="w-full h-auto rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}