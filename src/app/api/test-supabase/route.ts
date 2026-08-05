import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

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
