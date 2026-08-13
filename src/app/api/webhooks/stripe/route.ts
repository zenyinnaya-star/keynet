import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";

// Writes here go through the service-role client because they're
// authorized by Stripe's signature, not a logged-in user's session — the
// `orders`/`transactions` RLS policies intentionally have no insert/update
// path for the anon/authenticated roles, by design (see
// supabase/migrations/20260805090400_orders_and_transactions.sql).
export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const supabase = createAdminClient();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.client_reference_id ?? session.metadata?.order_id;
    if (!orderId) {
      return NextResponse.json({ error: "Missing order reference" }, { status: 400 });
    }

    await supabase.from("orders").update({ status: "paid" }).eq("id", orderId);

    await supabase.from("transactions").insert({
      order_id: orderId,
      stripe_payment_intent_id:
        typeof session.payment_intent === "string" ? session.payment_intent : null,
      stripe_checkout_session_id: session.id,
      stripe_customer_id: typeof session.customer === "string" ? session.customer : null,
      amount: (session.amount_total ?? 0) / 100,
      currency: session.currency ?? "usd",
      status: "succeeded",
    });
  }

  if (event.type === "checkout.session.expired") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.client_reference_id ?? session.metadata?.order_id;
    if (orderId) {
      await supabase.from("orders").update({ status: "cancelled" }).eq("id", orderId);
    }
  }

  return NextResponse.json({ received: true });
}
