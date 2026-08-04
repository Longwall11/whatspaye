export default function NigerianBusinesses() {
  const tags = [
    "Optimized for WhatsApp sellers",
    "Supports local payment methods",
    "Designed for mobile-first usage",
    "Built for small teams and solo entrepreneurs",
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2
            className="text-3xl lg:text-4xl font-bold mb-4"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            Built for Nigerian Businesses
          </h2>
          <p className="text-[#1a1a1a]/70">
            Everything you need to accept payments from your WhatsApp customers
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-6 py-3 border-2 border-[#057F44] text-[#057F44] rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}