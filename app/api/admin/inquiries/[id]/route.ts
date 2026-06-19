import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { softDeleteInquiry, updateInquiryNote, updateInquiryStatus } from "@/lib/inquiry-store";
import { isInquiryStatus } from "@/lib/site-data";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { status?: string; note?: string } | null;
  if (!body || (body.status === undefined && body.note === undefined)) {
    return NextResponse.json({ success: false, message: "Nothing to update." }, { status: 400 });
  }

  if (body.status !== undefined && !isInquiryStatus(body.status)) {
    return NextResponse.json({ success: false, message: "Invalid status." }, { status: 400 });
  }

  const { id } = await params;

  try {
    if (body.status !== undefined) {
      await updateInquiryStatus(id, body.status);
    }

    if (body.note !== undefined) {
      await updateInquiryNote(id, body.note.trim().slice(0, 1000));
    }

    return NextResponse.json({ success: true, message: "Inquiry updated." });
  } catch (error) {
    console.error("Inquiry update failed", error);
    return NextResponse.json({ success: false, message: "Unable to update inquiry." }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;

  try {
    await softDeleteInquiry(id);

    return NextResponse.json({ success: true, message: "Inquiry deleted." });
  } catch (error) {
    console.error("Inquiry delete failed", error);
    return NextResponse.json({ success: false, message: "Unable to delete inquiry." }, { status: 500 });
  }
}
