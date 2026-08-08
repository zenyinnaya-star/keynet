import type { Metadata } from "next";
import { ProductShowcase } from "@/components/products/ProductShowcase";

export const metadata: Metadata = {
  title: "Our Products | keynex",
};

export default function ProductsPage() {
  return <ProductShowcase />;
}
