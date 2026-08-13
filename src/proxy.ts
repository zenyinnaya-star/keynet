import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// middleware entry point — refreshes the Supabase session on every matched request
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

// run on every route except static assets, images, and the favicon
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
