"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/whatspaye-logo.png"
              alt="WhatsPaye"
              className="h-10 w-auto"
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#how-it-works" className="text-[#1a1a1a] hover:text-[#057F44] transition-colors">
              How it Works
            </Link>
            <Link href="#benefits" className="text-[#1a1a1a] hover:text-[#057F44] transition-colors">
              Benefits
            </Link>
            <Link href="#pricing" className="text-[#1a1a1a] hover:text-[#057F44] transition-colors">
              Pricing
            </Link>
            <Link href="#faqs" className="text-[#1a1a1a] hover:text-[#057F44] transition-colors">
              FAQs
            </Link>
            <Link href="#contact" className="text-[#1a1a1a] hover:text-[#057F44] transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/auth/signin"
              className="text-[#1a1a1a] hover:text-[#057F44] transition-colors hidden sm:block"
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="bg-[#057F44] text-white px-5 py-2.5 rounded-full font-medium hover:bg-[#045f35] transition-colors"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}