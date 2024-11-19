import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  const isAuthPath = pathname.startsWith("/auth");
  // const isDashboardPath = pathname.startsWith("/dashboard");

  // Redirect to login if no access token and not on an auth path
  if (!accessToken && !isAuthPath && !pathname.startsWith("/")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Redirect to home if access token exists but user is on an auth path
  if (accessToken && isAuthPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}

export const config = {
  matcher: [
    // Allow only home, auth, and dashboard routes
    "/",
    "/auth/:path*",
    "/dashboard/:path*",
  ],
};
