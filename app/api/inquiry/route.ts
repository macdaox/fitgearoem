import { NextRequest, NextResponse } from "next/server";
import { createInquiry } from "@/lib/inquiry-store";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendInquiryNotification } from "@/lib/mail";
import { validateInquiryPayload } from "@/lib/validation";

export async function POST(request: NextRequest) {
  if (!checkRateLimit(request)) {
    return NextResponse.json({ success: false, message: "Too many submissions. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid JSON payload." }, { status: 400 });
  }

  const result = validateInquiryPayload(body);
  if (!result.ok) {
    return NextResponse.json({ success: false, message: result.message }, { status: 400 });
  }

  try {
    await createInquiry(result.data);

    await sendInquiryNotification(result.data).catch((error) => {
      console.error("Inquiry notification failed", error);
    });

    return NextResponse.json({ success: true, message: "Inquiry submitted successfully" });
  } catch (error) {
    console.error("Inquiry submission failed", error);
    return NextResponse.json({ success: false, message: "Unable to submit inquiry right now." }, { status: 500 });
  }
}
