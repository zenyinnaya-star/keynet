import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";

let client: ReturnType<typeof createBrowserClient<Database>> | undefined;

// Supabase client for use in Client Components — reuses one instance instead of creating a new one on every call
export function createClient() {
  if (!client) {
    client = createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    );
  }
  return client;
}
