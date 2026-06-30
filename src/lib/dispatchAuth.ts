export const DISPATCH_COOKIE_NAME = "lakenow_dispatch";

const encoder = new TextEncoder();
const dispatchMessage = "lakenow-dispatch-access";

function bytesToHex(bytes: Uint8Array) {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function createDispatchToken(secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(dispatchMessage)
  );

  return bytesToHex(new Uint8Array(signature));
}

export async function isDispatchAuthorized(cookieValue?: string) {
  const secret = process.env.DISPATCH_PASSWORD;

  if (!secret || !cookieValue) return false;

  const expectedToken = await createDispatchToken(secret);
  return cookieValue === expectedToken;
}
