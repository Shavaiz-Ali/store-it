import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  // Paths to exclude from middleware
  const publicPaths = [
    "/_next/static",
    "/_next/image",
    "/favicon.ico",
    "/api/",
    "/images/",
  ];

  // Check if the current path should be excluded
  const isExcludedPath = publicPaths.some((path) => pathname.startsWith(path));

  // Define route types
  const isAuthPath = pathname.startsWith("/auth");
  const isDashboardPath = pathname.startsWith("/dashboard");
  const isHomePath = pathname === "/";

  // If excluded path, continue without middleware
  if (isExcludedPath) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users from dashboard or home to login
  if (
    (!accessToken && (isDashboardPath || isHomePath)) ||
    (isDashboardPath && !accessToken)
  ) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Redirect authenticated users from auth routes to dashboard
  if (accessToken && (isAuthPath || isHomePath)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Continue with the request for other routes
  return NextResponse.next();
}

// Specify which routes this middleware should run on
export const config = {
  matcher: ["/", "/auth/:path*", "/dashboard/:path*"],
};
