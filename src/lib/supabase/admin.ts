import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// Service-role client — bypasses Row Level Security entirely. Only import
// this from trusted server code that isn't driven by arbitrary client input
// (e.g. the Stripe webhook handler, which authenticates via Stripe's
// signature instead of a user session). Never use it in a Server Action or
// Client Component.
export function createAdminClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
