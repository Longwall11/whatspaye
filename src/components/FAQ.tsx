"use client";

import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Do I need a website to use WhatsPaye?",
      answer: "No! That's the beauty of WhatsPaye. You don't need a website at all. Simply create an invoice through our dashboard and share the payment link directly via WhatsApp.",
    },
    {
      question: "Who is WhatsPaye for?",
      answer: "WhatsPaye is perfect for Nigerian small businesses and entrepreneurs who sell products or services through WhatsApp. If you often send invoices or request payments via WhatsApp, WhatsPaye is built for you.",
    },
    {
      question: "Is there a monthly subscription?",
      answer: "No, WhatsPaye is free to start. There are no monthly fees or subscription costs. You only pay a small transaction fee when you successfully receive a payment.",
    },
    {
      question: "What payment methods are supported?",
      answer: "WhatsPaye supports multiple payment methods including card payments (Visa, Mastercard), bank transfers, and USSD payments. Customers can pay using whichever method is most convenient for them.",
    },
  ];

  return (
    <section id="faqs" className="py-20 lg:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-3xl lg:text-4xl font-bold text-center mb-12 lg:mb-16"
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-medium text-[#1a1a1a]">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-[#057F44] transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5">
                  <p className="text-[#1a1a1a]/70 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}