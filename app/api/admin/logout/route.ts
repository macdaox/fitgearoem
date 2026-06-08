import { NextRequest, NextResponse } from "next/server";
import { adminCookieName } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/admin/login", request.url));
  response.cookies.delete(adminCookieName);
  return response;
}
