import type { Metadata } from "next";
import { ProductShowcase } from "@/components/products/ProductShowcase";

export const metadata: Metadata = {
  title: "Our Products | keynex",
};

// route wrapper, all the actual content lives in ProductShowcase
export default function ProductsPage() {
  return <ProductShowcase />;
}
