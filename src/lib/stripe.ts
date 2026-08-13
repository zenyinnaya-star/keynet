import Stripe from "stripe";

let client: Stripe | undefined;

// Lazy-constructed so importing this module doesn't crash the app before
// STRIPE_SECRET_KEY is configured — the Stripe SDK throws synchronously at
// construction time if the key is missing.
export function getStripe() {
  if (!client) {
    client = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }
  return client;
}
