"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types/product";

function formatPrice(amount: number) {
  return `₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function ProductCard({ product }: { product: Product }) {
  const initials = product.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-32 bg-gradient-to-br from-[#e8f5ee] to-[#d4edda] flex items-center justify-center">
        <span className="text-2xl font-bold text-[#057F44] opacity-60">{initials}</span>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-900 leading-snug">{product.name}</h3>
        <p className="text-lg font-bold text-[#057F44] mt-2">{formatPrice(product.price)}</p>
      </div>
    </div>
  );
}

export default function StorefrontClient({ vendorId }: { vendorId: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/storefront/get-products?vendorId=${vendorId}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.isSuccess) {
          setProducts(json.data);
        } else {
          setError(json.error || "Failed to load products");
        }
      })
      .catch(() => setError("Unable to load products"))
      .finally(() => setLoading(false));
  }, [vendorId]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#057F44] to-[#045f35]">
        <div className="max-w-lg mx-auto px-4 py-6 text-center">
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-white" style={{ fontFamily: "Sora, sans-serif" }}>Store</h1>
          <p className="text-sm text-white/70 mt-1">Browse products & pricing</p>
          {!loading && !error && products.length > 0 && (
            <span className="inline-block mt-3 text-xs font-medium bg-white/20 text-white px-3 py-1 rounded-full">
              {products.length} {products.length === 1 ? "product" : "products"}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-lg mx-auto px-4 py-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-8 h-8 border-4 border-[#057F44] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-gray-400">Loading products...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-700 mb-1">Something went wrong</p>
            <p className="text-xs text-gray-400">{error}</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-500">No products yet</p>
            <p className="text-xs text-gray-400 mt-1">Check back later</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-lg mx-auto px-4 py-8 text-center">
        <p className="text-xs text-gray-300">
          Powered by <span className="font-semibold text-gray-400">WhatsPaye</span>
        </p>
      </footer>
    </div>
  );
}
