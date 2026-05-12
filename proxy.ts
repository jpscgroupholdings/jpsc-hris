import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth/auth";
import { canAccess } from "@/lib/auth/permission";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const sessionCookie =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  const isLoginPage = pathname.startsWith("/login");
  const isPublicPage = pathname === "/";

  // No session → block protected routes
  if (!sessionCookie && !isLoginPage && !isPublicPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Logged in → prevent going back to login
  if (sessionCookie && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Role-based guard — only check if there's a session
  if (sessionCookie && !isLoginPage && !isPublicPage) {
    const session = await auth.api.getSession({ headers: request.headers });
    const roleCode = (session?.user?.roleCode as string) ?? "user";

    if (!canAccess(roleCode, pathname)) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    // Forward role info to server components via headers
    const res = NextResponse.next();
    res.headers.set("x-role-code", roleCode);
    res.headers.set(
      "x-role-name",
      (session?.user?.roleName as string) ?? "User",
    );
    res.headers.set("x-user-id", session?.user?.id ?? "");
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
