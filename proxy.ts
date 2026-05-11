import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth/auth";

export async function proxy(request: NextRequest) {
  const sessionCookie =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  const { pathname } = request.nextUrl;

  const isLoginPage = pathname.startsWith("/login");
  const isPublicPage = pathname === "/";
  const isAdminPage = pathname.startsWith("/admin");

  // No session → block protected routes
  if (!sessionCookie && !isLoginPage && !isPublicPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Logged in → prevent going back to login
  if (sessionCookie && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Role-based guard — only check if there's a session and it's a protected route
  if (sessionCookie && isAdminPage) {
    const session = await auth.api.getSession({ headers: request.headers });
    const role = session?.user?.role;

    if (role !== "Admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
