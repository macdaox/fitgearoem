import { NextRequest, NextResponse } from "next/server";
import { createAdminSessionValue, getAdminCookieOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { password?: string } | null;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedPassword || body?.password !== expectedPassword) {
    return NextResponse.json({ success: false, message: "Invalid admin password." }, { status: 401 });
  }

  const response = NextResponse.json({ success: true, message: "Logged in." });
  response.cookies.set({
    ...getAdminCookieOptions(),
    value: createAdminSessionValue()
  });

  return response;
}
