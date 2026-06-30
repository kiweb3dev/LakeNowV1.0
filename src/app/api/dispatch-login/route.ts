import { NextResponse } from "next/server";
import { createDispatchToken, DISPATCH_COOKIE_NAME } from "@/lib/dispatchAuth";

export async function POST(request: Request) {
  const secret = process.env.DISPATCH_PASSWORD;

  if (!secret) {
    return NextResponse.json(
      { error: "Dispatch password is not configured." },
      { status: 500 }
    );
  }

  const body = await request.json().catch(() => ({}));
  const password = typeof body.password === "string" ? body.password : "";

  if (password !== secret) {
    return NextResponse.json(
      { error: "Incorrect dispatch password." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(DISPATCH_COOKIE_NAME, await createDispatchToken(secret), {
    httpOnly: true,
    maxAge: 60 * 60 * 12,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
