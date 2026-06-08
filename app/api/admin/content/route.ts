import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getSiteContent, saveSiteContent, type SiteContent } from "@/lib/site-content";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ success: false, message: "未登录或登录已过期。" }, { status: 401 });
  }

  return NextResponse.json({ success: true, content: await getSiteContent() });
}

export async function PUT(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ success: false, message: "未登录或登录已过期。" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { content?: SiteContent } | null;
  if (!body?.content) {
    return NextResponse.json({ success: false, message: "内容不能为空。" }, { status: 400 });
  }

  await saveSiteContent(body.content);
  return NextResponse.json({ success: true, message: "网站内容已保存。" });
}
