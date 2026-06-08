import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { updateInquiryStatus } from "@/lib/inquiry-store";
import { isInquiryStatus } from "@/lib/site-data";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { status?: string } | null;
  if (!body?.status || !isInquiryStatus(body.status)) {
    return NextResponse.json({ success: false, message: "Invalid status." }, { status: 400 });
  }

  const { id } = await params;

  try {
    await updateInquiryStatus(id, body.status);

    return NextResponse.json({ success: true, message: "Status updated." });
  } catch (error) {
    console.error("Inquiry status update failed", error);
    return NextResponse.json({ success: false, message: "Unable to update inquiry." }, { status: 500 });
  }
}
