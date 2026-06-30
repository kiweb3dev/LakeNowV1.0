import { NextRequest, NextResponse } from "next/server";
import { DISPATCH_COOKIE_NAME, isDispatchAuthorized } from "@/lib/dispatchAuth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dispatch/login")) {
    return NextResponse.next();
  }

  const isAuthorized = await isDispatchAuthorized(
    request.cookies.get(DISPATCH_COOKIE_NAME)?.value
  );

  if (isAuthorized) {
    return NextResponse.next();
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/dispatch/login";
  loginUrl.searchParams.set("next", pathname);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/dispatch/:path*"],
};
