import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// health-check endpoint: confirms the Supabase connection works and returns how many products exist
export async function GET() {
  const supabase = await createClient();

  // head: true means Postgres only returns the count, not the actual rows
  const { count, error } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true });

  if (error) {
    return NextResponse.json(
      { connected: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    connected: true,
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    productCount: count,
  });
}
