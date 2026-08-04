export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Create an invoice",
      description: "Fill in the details and amount",
    },
    {
      number: "2",
      title: "Share the payment link",
      description: "Send directly via WhatsApp",
    },
    {
      number: "3",
      title: "Get paid and track status",
      description: "Receive payments instantly",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-3xl lg:text-4xl font-bold text-center mb-12 lg:mb-16"
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          How WhatsPaye Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-[#057F44] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">{step.number}</span>
              </div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                {step.title}
              </h3>
              <p className="text-[#1a1a1a]/70 text-sm">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="max-w-md mx-auto">
          <div className="bg-[#e8f5ee] rounded-2xl p-6 shadow-lg">
            <div className="bg-white rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-[#057F44] rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-semibold text-[#1a1a1a]">Payment Link Generated!</span>
              </div>
              <div className="bg-[#f5f5f5] rounded-lg p-3">
                <p className="font-mono text-sm text-[#057F44]">wa.pay/inv/abc123fy</p>
              </div>
              <button className="w-full mt-3 bg-[#057F44] text-white py-2 rounded-lg text-sm font-medium">
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}