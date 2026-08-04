export default function About() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <img
              src="/whats-image.png"
              alt="WhatsPaye for Nigerian businesses"
              className="w-full h-auto rounded-3xl shadow-lg"
            />
          </div>

          <div className="order-1 lg:order-2">
            <h2
              className="text-3xl lg:text-4xl font-bold mb-6"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              About WhatsPaye
            </h2>
            <p className="text-[#1a1a1a]/80 mb-6 leading-relaxed">
              WhatsPaye is a modern invoicing and payment platform designed specifically
              for Nigerian small businesses that sell through WhatsApp. We simplify
              the payment collection process so you can focus on growing your business.
            </p>
            <p className="text-[#1a1a1a]/80 mb-8 leading-relaxed">
              Created with Nigerian entrepreneurs in mind, WhatsPaye eliminates the
              need for complex payment setups and lets you accept payments directly
              through WhatsApp chat.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <svg className="w-6 h-6 text-[#057F44]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Create and send professional invoices in seconds.</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-6 h-6 text-[#057F44]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Share secure payment links directly in your chats.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}