import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  // Excluded paths (Regex for broader matching)
  const publicPaths = [
    /^\/_next\/static/,
    /^\/_next\/image/,
    /^\/favicon\.ico$/,
    /^\/api\//,
    /^\/images\//,
  ];

  const isExcludedPath = publicPaths.some((regex) => regex.test(pathname));

  // Define route types with precise matching
  const isAuthPath = pathname === "/auth" || pathname.startsWith("/auth/");
  const isDashboardPath =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  const isHomePath = pathname === "/";

  // Exclude static and API paths from middleware
  if (isExcludedPath) return NextResponse.next();

  // Redirect unauthenticated users to login
  if (!accessToken && (isDashboardPath || isHomePath)) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Redirect authenticated users away from auth routes
  if (accessToken && (isAuthPath || isHomePath)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Continue with the request
  return NextResponse.next();
}

// Refine matcher to reduce unnecessary middleware calls
export const config = {
  matcher: ["/", "/auth/:path*", "/dashboard/:path*"],
};
