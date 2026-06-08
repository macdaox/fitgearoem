import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

const cookieName = "admin_session";
const maxAge = 60 * 60 * 8;

function secret() {
  return process.env.ADMIN_PASSWORD || "change-this-password";
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

export function createAdminSessionValue() {
  const payload = JSON.stringify({ role: "admin", exp: Date.now() + maxAge * 1000 });
  const encoded = Buffer.from(payload).toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}

export async function isAdminAuthenticated() {
  const store = await cookies();
  const value = store.get(cookieName)?.value;

  if (!value) {
    return false;
  }

  const [encoded, signature] = value.split(".");
  if (!encoded || !signature) {
    return false;
  }

  const expected = sign(encoded);
  const valid = signature.length === expected.length && timingSafeEqual(Buffer.from(signature), Buffer.from(expected));

  if (!valid) {
    return false;
  }

  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as { exp?: number };
    return typeof payload.exp === "number" && payload.exp > Date.now();
  } catch {
    return false;
  }
}

export function getAdminCookieOptions() {
  return {
    name: cookieName,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge
  };
}

export const adminCookieName = cookieName;
