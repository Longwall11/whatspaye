export default function VisionMission() {
  return (
    <section className="py-20 lg:py-28 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-3xl lg:text-4xl font-bold text-center mb-12 lg:mb-16"
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          Our Vision & Mission
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="w-14 h-14 bg-[#e8f5ee] rounded-full flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-[#057F44]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
              </svg>
            </div>
            <h3
              className="text-xl font-semibold mb-4"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Our Vision
            </h3>
            <p className="text-[#1a1a1a]/80 leading-relaxed">
              To become the go-to payment solution for every Nigerian small business
              selling on WhatsApp, making payment collection as easy as sending a message.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="w-14 h-14 bg-[#e8f5ee] rounded-full flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-[#057F44]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
            </div>
            <h3
              className="text-xl font-semibold mb-4"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Our Mission
            </h3>
            <p className="text-[#1a1a1a]/80 leading-relaxed">
              To empower Nigerian entrepreneurs with simple, secure, and fast payment
              tools that integrate seamlessly with WhatsApp, helping them grow their
              businesses without technical barriers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}