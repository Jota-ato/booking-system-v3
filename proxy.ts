import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-server";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const { session, isAuth } = await requireAuth();

  if (!isAuth || !session?.user) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const role = session.user.role;

  if (role === "pending") {
    if (pathname !== "/waiting-approval") {
      return NextResponse.redirect(new URL("/waiting-approval", req.url));
    }
    return NextResponse.next();
  }

  if (pathname === "/waiting-approval") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (role === "admin") {
    return NextResponse.next();
  }

  if (role === "staff") {
    const restrictedRoutes = ["/dashboard/staff"];
    const isRestricted = restrictedRoutes.some((route) =>
      pathname.startsWith(route),
    );

    if (isRestricted) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: ["/dashboard/:path*", "/waiting-approval"],
};
