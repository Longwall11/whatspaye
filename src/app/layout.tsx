import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://whatspaye.com"),
  title: {
    default: "WhatsPaye - Get Paid on WhatsApp Instantly",
    template: "%s | WhatsPaye",
  },
  description: "WhatsPaye helps Nigerian small businesses send professional invoices and get paid fast via WhatsApp. No website needed, no technical knowledge required.",
  keywords: ["WhatsApp payments", "Nigerian payments", "invoice generator", "online payments", "small business Nigeria", "USSD payments", "mobile payments", "digital payments"],
  authors: [{ name: "WhatsPaye" }],
  creator: "WhatsPaye",
  publisher: "WhatsPaye",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://whatspaye.com",
    siteName: "WhatsPaye",
    title: "WhatsPaye - Get Paid on WhatsApp Instantly",
    description: "WhatsPaye helps Nigerian small businesses send professional invoices and get paid fast via WhatsApp. No website needed, no technical knowledge required.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WhatsPaye - Get Paid on WhatsApp Instantly",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsPaye - Get Paid on WhatsApp Instantly",
    description: "WhatsPaye helps Nigerian small businesses send professional invoices and get paid fast via WhatsApp.",
    images: ["/og-image.png"],
    creator: "@whatspaye",
  },
  alternates: {
    canonical: "https://whatspaye.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="icon" type="image/png" href="/whatspaye-logo.png" />
        <link rel="apple-touch-icon" href="/whatspaye-logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#057F44" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}