import Link from "next/link";

export default function Footer() {
  const productLinks = [
    { label: "How it Works", href: "#how-it-works" },
    { label: "Benefits", href: "#benefits" },
    { label: "FAQs", href: "#faqs" },
    { label: "Pricing", href: "#pricing" },
  ];

  const supportLinks = [
    { label: "FAQs", href: "#faqs" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer id="contact" className="bg-[#1a1a1a] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img
                src="/whatspaye-logo.png"
                alt="WhatsPaye"
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-white/70 leading-relaxed">
              Get paid on WhatsApp instantly. Perfect for Nigerian small businesses.
            </p>
          </div>

          <div>
            <h4
              className="font-semibold mb-4"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Product
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="font-semibold mb-4"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Support
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-white/60 text-sm">
            &copy; 2026 WhatsPaye. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}