"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/useCart";
import { getProductBySlug } from "@/lib/products";
import { cn, formatPrice } from "@/lib/utils";
import { ShopHeader } from "@/components/products/ShopHeader";

type Delivery = "standard" | "express";
type PaymentMethod = "card" | "paypal" | "applepay";

const EXPRESS_SHIPPING = 15;
const PROMO_CODE = "KEYNEX10";
const PROMO_DISCOUNT = 0.1;

const inputClass =
  "w-full rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-teal-500 focus:outline-none";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 block text-xs text-white/50">{children}</label>;
}

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");

  const [delivery, setDelivery] = useState<Delivery>("standard");
  const [payment, setPayment] = useState<PaymentMethod>("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const [promoInput, setPromoInput] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderTotal, setOrderTotal] = useState(0);

  const cartLines = useMemo(
    () =>
      items
        .map((item) => ({ item, product: getProductBySlug(item.slug) }))
        .filter((line): line is { item: typeof items[number]; product: NonNullable<ReturnType<typeof getProductBySlug>> } => !!line.product),
    [items],
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const shippingCost = delivery === "express" ? EXPRESS_SHIPPING : 0;
  const discount = promoApplied ? subtotal * PROMO_DISCOUNT : 0;
  const total = subtotal + shippingCost - discount;

  const applyPromo = () => {
    setPromoError("");
    if (promoInput.trim().toUpperCase() === PROMO_CODE) {
      setPromoApplied(true);
    } else {
      setPromoApplied(false);
      setPromoError("Invalid promo code.");
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!firstName.trim() || !lastName.trim() || !phone.trim() || !email.trim()) {
      setError("Fill in all personal information fields.");
      return;
    }
    if (!email.includes("@")) {
      setError("Enter a valid email.");
      return;
    }
    if (!country.trim() || !city.trim() || !address.trim() || !zip.trim()) {
      setError("Fill in all shipping information fields.");
      return;
    }
    if (payment === "card" && (!cardNumber.trim() || !cardName.trim() || !cardExpiry.trim() || !cardCvv.trim())) {
      setError("Fill in all card details.");
      return;
    }
    if (!agree) {
      setError("You must agree to data processing to continue.");
      return;
    }

    setOrderId(`KX-${Date.now().toString().slice(-6)}`);
    setOrderTotal(total);
    clear();
  };

  if (orderId) {
    return (
      <div className="min-h-screen bg-black text-white">
        <ShopHeader />
        <div className="mx-auto max-w-lg px-6 pb-24 pt-12 text-center sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-500">
            Order confirmed
          </p>
          <h1 className="mt-3 text-3xl font-semibold">Thanks, {firstName}.</h1>
          <p className="mt-3 text-sm leading-6 text-white/60">
            Your order <span className="font-semibold text-white">#{orderId}</span> for{" "}
            {formatPrice(orderTotal)} is on its way to {address}, {city}. A confirmation was sent to{" "}
            {email}.
          </p>
          <p className="mt-4 text-xs text-white/30">
            This is a demo store — checkout isn&apos;t connected to real payments, and nothing was
            actually charged or shipped.
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

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white">
        <ShopHeader />
        <div className="mx-auto max-w-3xl px-6 pb-24 sm:px-10">
          <h1 className="text-3xl font-semibold">Checkout</h1>
          <div className="mt-12 text-center">
            <p className="text-sm text-white/60">Your cart is empty.</p>
            <Link
              href="/products"
              className="mt-6 inline-block rounded-full bg-gradient-to-r from-teal-600 to-teal-500 px-5 py-2.5 text-xs font-bold text-white transition-all hover:shadow-[0_0_15px_rgba(242,210,255,0.3)]"
            >
              Browse products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <ShopHeader />

      <div className="mx-auto max-w-5xl px-6 pb-24 sm:px-10">
        <h1 className="text-3xl font-semibold">Checkout</h1>

        <form
          onSubmit={handleSubmit}
          className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start"
        >
          {/* Left: form */}
          <div className="space-y-10">
            <section>
              <h2 className="text-lg font-semibold">Information</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <FieldLabel>First name</FieldLabel>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <FieldLabel>Last name</FieldLabel>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <FieldLabel>Phone number</FieldLabel>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <FieldLabel>Email</FieldLabel>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              <h3 className="mt-6 text-sm font-semibold text-white/70">Shipping information</h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <FieldLabel>Country / Region</FieldLabel>
                  <input
                    type="text"
                    value={country}
                    onChange={(event) => setCountry(event.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <FieldLabel>City</FieldLabel>
                  <input
                    type="text"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <FieldLabel>Address</FieldLabel>
                  <input
                    type="text"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <FieldLabel>Zip / Postal code</FieldLabel>
                  <input
                    type="text"
                    value={zip}
                    onChange={(event) => setZip(event.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold">Delivery</h2>
              <div className="mt-4 space-y-3">
                <label
                  className={cn(
                    "flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 transition-colors",
                    delivery === "standard"
                      ? "border-teal-500 bg-teal-500/10"
                      : "border-white/15 hover:border-white/30",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      checked={delivery === "standard"}
                      onChange={() => setDelivery("standard")}
                      className="h-4 w-4 accent-teal-600"
                    />
                    <span>
                      <span className="block text-sm font-semibold">Standard delivery</span>
                      <span className="block text-xs text-white/40">Delivery within 5–7 days</span>
                    </span>
                  </span>
                  <span className="text-sm font-semibold text-teal-500">Free</span>
                </label>

                <label
                  className={cn(
                    "flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 transition-colors",
                    delivery === "express"
                      ? "border-teal-500 bg-teal-500/10"
                      : "border-white/15 hover:border-white/30",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      checked={delivery === "express"}
                      onChange={() => setDelivery("express")}
                      className="h-4 w-4 accent-teal-600"
                    />
                    <span>
                      <span className="block text-sm font-semibold">Express shipping</span>
                      <span className="block text-xs text-white/40">Delivery within 1–3 days</span>
                    </span>
                  </span>
                  <span className="text-sm font-semibold text-teal-500">
                    {formatPrice(EXPRESS_SHIPPING)}
                  </span>
                </label>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold">Payment</h2>
              <div className="mt-4 space-y-3">
                <label
                  className={cn(
                    "block cursor-pointer rounded-xl border px-4 py-3 transition-colors",
                    payment === "card"
                      ? "border-teal-500 bg-teal-500/10"
                      : "border-white/15 hover:border-white/30",
                  )}
                >
                  <span className="flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={payment === "card"}
                        onChange={() => setPayment("card")}
                        className="h-4 w-4 accent-teal-600"
                      />
                      <span className="text-sm font-semibold">Credit card</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-wide text-white/50">
                      <span className="rounded border border-white/20 px-1.5 py-0.5">VISA</span>
                      <span className="rounded border border-white/20 px-1.5 py-0.5">MC</span>
                    </span>
                  </span>

                  {payment === "card" && (
                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <FieldLabel>Card number</FieldLabel>
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="1234 1234 1234 1234"
                          value={cardNumber}
                          onChange={(event) => setCardNumber(event.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <FieldLabel>Cardholder name</FieldLabel>
                        <input
                          type="text"
                          value={cardName}
                          onChange={(event) => setCardName(event.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <FieldLabel>Expiration date (MM/YY)</FieldLabel>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(event) => setCardExpiry(event.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <FieldLabel>CVV</FieldLabel>
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="CVV"
                          value={cardCvv}
                          onChange={(event) => setCardCvv(event.target.value)}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  )}
                </label>

                <label
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors",
                    payment === "paypal"
                      ? "border-teal-500 bg-teal-500/10"
                      : "border-white/15 hover:border-white/30",
                  )}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === "paypal"}
                    onChange={() => setPayment("paypal")}
                    className="h-4 w-4 accent-teal-600"
                  />
                  <span className="text-sm font-semibold">PayPal</span>
                </label>

                <label
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors",
                    payment === "applepay"
                      ? "border-teal-500 bg-teal-500/10"
                      : "border-white/15 hover:border-white/30",
                  )}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === "applepay"}
                    onChange={() => setPayment("applepay")}
                    className="h-4 w-4 accent-teal-600"
                  />
                  <span className="text-sm font-semibold">Apple Pay</span>
                </label>
              </div>

              <label className="mt-4 flex items-center gap-2 text-xs text-white/50">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(event) => setAgree(event.target.checked)}
                  className="h-4 w-4 accent-teal-600"
                />
                I agree to the terms and data processing.
              </label>

              {error && <p className="mt-3 text-xs text-teal-500">{error}</p>}

              <button
                type="submit"
                className="mt-6 w-full rounded-full bg-gradient-to-r from-teal-600 to-teal-500 py-3 text-sm font-bold text-white transition-all hover:shadow-[0_0_20px_rgba(242,210,255,0.3)]"
              >
                Pay and place order
              </button>
              <p className="mt-2 text-center text-xs text-white/30">
                This is a demo store — checkout isn&apos;t connected to real payments.
              </p>
            </section>
          </div>

          {/* Right: order summary */}
          <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-6 lg:sticky lg:top-24">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">
                Shopping bag ({itemCount})
              </h2>
              <Link href="/cart" className="text-xs text-white/50 hover:text-white">
                Edit cart
              </Link>
            </div>

            <div className="mt-4 space-y-4">
              {cartLines.map(({ item, product }) => (
                <div key={item.slug} className="flex items-center gap-3">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-black/40">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={product.imageWidth}
                        height={product.imageHeight}
                        sizes="56px"
                        style={{ filter: product.filter }}
                        className="h-full w-auto object-contain"
                      />
                    ) : (
                      <span className="text-[7px] font-medium tracking-widest text-white/30 uppercase">
                        Soon
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">{product.name}</p>
                    <p className="text-xs text-white/40">Quantity: {item.quantity}</p>
                  </div>
                  <p className="shrink-0 text-sm font-semibold text-white">
                    {formatPrice(product.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-2">
              <input
                type="text"
                value={promoInput}
                onChange={(event) => {
                  setPromoInput(event.target.value);
                  setPromoError("");
                }}
                placeholder="Promo code"
                className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-teal-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={applyPromo}
                className="shrink-0 rounded-lg border border-white/20 px-4 text-xs font-semibold text-white/70 transition-colors hover:border-white/50 hover:text-white"
              >
                Apply
              </button>
            </div>
            {promoError && <p className="mt-1.5 text-xs text-teal-500">{promoError}</p>}
            {promoApplied && (
              <p className="mt-1.5 text-xs text-teal-500">Promo code applied — 10% off.</p>
            )}

            <div className="mt-6 space-y-2 border-t border-white/10 pt-4 text-sm">
              <div className="flex justify-between text-white/60">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-teal-500">
                  <span>Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
              <span className="text-sm font-semibold text-white/70">Total</span>
              <span className="text-2xl font-bold text-white">{formatPrice(total)}</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
