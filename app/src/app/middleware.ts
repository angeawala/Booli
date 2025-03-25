// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkAuth } from "@/utils/authUtils";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const protectedPaths = ["/dashboard", "/profile"];
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname.startsWith("/library/books/") && pathname.includes("/pdf-access")) {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/library/books/:path*/pdf-access"],
};