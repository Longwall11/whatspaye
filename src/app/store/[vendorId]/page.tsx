import { Metadata } from "next";
import StorefrontClient from "./StorefrontClient";

export const metadata: Metadata = {
  title: "Store",
  description: "Browse products and pricing",
};

export default async function StorePage({ params }: { params: Promise<{ vendorId: string }> }) {
  const { vendorId } = await params;
  return <StorefrontClient vendorId={vendorId} />;
}
