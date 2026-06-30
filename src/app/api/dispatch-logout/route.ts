import { NextResponse } from "next/server";
import { DISPATCH_COOKIE_NAME } from "@/lib/dispatchAuth";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(DISPATCH_COOKIE_NAME, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
