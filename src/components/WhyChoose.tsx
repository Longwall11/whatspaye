export default function WhyChoose() {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
        </svg>
      ),
      title: "Create invoices in under 60 seconds",
      description: "Generate professional invoices quickly with our simple dashboard.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
        </svg>
      ),
      title: "Share secure payment links in chat",
      description: "Send payment links directly to customers via WhatsApp.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
        </svg>
      ),
      title: "Accept card, transfer & USSD payments",
      description: "Give your customers multiple payment options to choose from.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      ),
      title: "Track paid and unpaid invoices",
      description: "Keep tabs on your payment status with an easy-to-use dashboard.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.6c-.17-.61-1-1.16-1.79-1.37l1.05-1.58c.41.17.77.43 1.05.78.27.35.42.77.42 1.22l-1.53.95z"/>
        </svg>
      ),
      title: "No website needed",
      description: "Start accepting payments without setting up any website.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>
      ),
      title: "No technical knowledge required",
      description: "Simple and intuitive platform anyone can use.",
    },
  ];

  return (
    <section id="benefits" className="py-20 lg:py-28 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-3xl lg:text-4xl font-bold text-center mb-12 lg:mb-16"
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          Why Businesses Choose WhatsPaye
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-[#e8f5ee] rounded-xl flex items-center justify-center mb-4 text-[#057F44]">
                {feature.icon}
              </div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                {feature.title}
              </h3>
              <p className="text-[#1a1a1a]/70 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-xl font-semibold text-[#057F44]" style={{ fontFamily: "Sora, sans-serif" }}>
            Free to start
          </p>
          <p className="text-[#1a1a1a]/70 mt-2">
            No hidden fees - start invoicing your customers today
          </p>
        </div>
      </div>
    </section>
  );
}