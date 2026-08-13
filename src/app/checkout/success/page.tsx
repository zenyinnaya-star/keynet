import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ShopHeader } from "@/components/products/ShopHeader";
import { formatPrice } from "@/lib/utils";
import { ClearCartOnMount } from "./ClearCartOnMount";

export const metadata: Metadata = {
  title: "Order Confirmed | keynex",
};

// shown after returning from Stripe — looks up the order and shows "paid" or "still processing" depending on webhook timing
export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order_id?: string }>;
}) {
  const { order_id: orderId } = await searchParams;
  if (!orderId) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) notFound();

  // scoped to this user so nobody can view someone else's order by guessing an id
  const { data: order } = await supabase
    .from("orders")
    .select("id, status, total, shipping_address")
    .eq("id", orderId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!order) notFound();

  const address = order.shipping_address as {
    firstName?: string;
    address?: string;
    city?: string;
  } | null;

  const isPaid = order.status === "paid";

  return (
    <div className="min-h-screen bg-black text-white">
      <ShopHeader />
      <ClearCartOnMount />
      <div className="mx-auto max-w-lg px-6 pb-24 pt-12 text-center sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-500">
          {isPaid ? "Order confirmed" : "Finalizing your order"}
        </p>
        <h1 className="mt-3 text-3xl font-semibold">
          {isPaid ? `Thanks${address?.firstName ? `, ${address.firstName}` : ""}.` : "Almost there..."}
        </h1>
        <p className="mt-3 text-sm leading-6 text-white/60">
          {isPaid ? (
            <>
              Your order <span className="font-semibold text-white">#{order.id.slice(0, 8)}</span>{" "}
              for {formatPrice(order.total)} is confirmed
              {address?.address
                ? ` and headed to ${address.address}${address.city ? `, ${address.city}` : ""}`
                : ""}
              .
            </>
          ) : (
            "We're confirming your payment with Stripe — this usually takes just a moment. Refresh in a few seconds if the status doesn't update."
          )}
        </p>
        <Link
          href="/products"
          className="mt-8 inline-block rounded-full bg-gradient-to-r from-teal-600 to-teal-500 px-6 py-3 text-sm font-bold text-white transition-all hover:shadow-[0_0_20px_rgba(242,210,255,0.3)]"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
