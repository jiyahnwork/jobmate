import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("Middleware - Auth Check:", {
    path: req.nextUrl.pathname,
    hasSession: !!session,
    userId: session?.user?.id,
    email: session?.user?.email,
  });

  // Protected routes that require authentication
  const protectedRoutes = ["/training-catalog", "/skill-audit", "/work-tracker"];
  const isProtectedRoute = protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route));

  // If trying to access protected route without session, redirect to login
  if (isProtectedRoute && !session) {
    console.log("Middleware - Redirecting to login:", {
      from: req.nextUrl.pathname,
      reason: "No active session",
    });
    const redirectUrl = new URL("/login", req.url);
    redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: ["/training-catalog/:path*", "/skill-audit/:path*", "/work-tracker/:path*"],
};
