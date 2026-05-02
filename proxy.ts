import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const session = request.cookies.get("better-auth.session_token");

  const { pathname } = request.nextUrl;

  const isLoginPage = pathname.startsWith("/login");
  const isPublicPage = pathname === "/"; // ONLY root

  // No session → block protected routes only
  if (!session && !isLoginPage && !isPublicPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Logged in → prevent going back to login
  if (session && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
