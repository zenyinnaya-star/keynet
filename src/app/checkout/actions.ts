"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe";

const EXPRESS_SHIPPING = 15;
const PROMO_CODE = "KEYNEX10";
const PROMO_DISCOUNT = 0.1;

export type PlaceOrderInput = {
  items: { slug: string; quantity: number }[];
  shippingAddress: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    country: string;
    city: string;
    address: string;
    zip: string;
  };
  delivery: "standard" | "express";
  promoCode: string;
};

export async function placeOrder(input: PlaceOrderInput): Promise<{ error: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to check out." };
  }
  if (input.items.length === 0) {
    return { error: "Your cart is empty." };
  }

  // Never trust client-submitted prices — resolve real products/prices from the DB.
  const slugs = input.items.map((item) => item.slug);
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("id, slug, name, price")
    .in("slug", slugs);

  if (productsError || !products || products.length !== slugs.length) {
    return { error: "Some items in your cart are no longer available." };
  }

  const lines = input.items.map((item) => ({
    product: products.find((product) => product.slug === item.slug)!,
    quantity: item.quantity,
  }));

  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const shippingCost = input.delivery === "express" ? EXPRESS_SHIPPING : 0;
  const promoApplied = input.promoCode.trim().toUpperCase() === PROMO_CODE;
  const discount = promoApplied ? subtotal * PROMO_DISCOUNT : 0;
  const total = Math.max(subtotal + shippingCost - discount, 0);

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      status: "pending",
      subtotal,
      total,
      currency: "usd",
      shipping_address: input.shippingAddress,
    })
    .select("id")
    .single();

  if (orderError || !order) {
    return { error: "Couldn't create your order. Please try again." };
  }

  const { error: itemsError } = await supabase.from("order_items").insert(
    lines.map((line) => ({
      order_id: order.id,
      product_id: line.product.id,
      quantity: line.quantity,
      unit_price: line.product.price,
    })),
  );

  if (itemsError) {
    return { error: "Couldn't save your order items. Please try again." };
  }

  const origin = (await headers()).get("origin") ?? "http://localhost:3000";
  const discountRatio = subtotal > 0 ? (subtotal - discount) / subtotal : 1;

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = lines.map((line) => ({
    price_data: {
      currency: "usd",
      product_data: { name: line.product.name },
      unit_amount: Math.round(line.product.price * discountRatio * 100),
    },
    quantity: line.quantity,
  }));

  if (shippingCost > 0) {
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: { name: "Express shipping" },
        unit_amount: Math.round(shippingCost * 100),
      },
      quantity: 1,
    });
  }

  let session: Stripe.Checkout.Session;
  try {
    session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${origin}/checkout/success?order_id=${order.id}`,
      cancel_url: `${origin}/checkout`,
      client_reference_id: order.id,
      customer_email: user.email ?? undefined,
      metadata: { order_id: order.id },
    });
  } catch {
    return { error: "Couldn't start payment. Please try again." };
  }

  if (!session.url) {
    return { error: "Couldn't start payment. Please try again." };
  }

  redirect(session.url);
}
