import { NextRequest, NextResponse } from "next/server";
import { createInquiry } from "@/lib/inquiry-store";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendInquiryNotification } from "@/lib/mail";
import { createTikTokEventIds, sendTikTokInquiryEvents } from "@/lib/tiktok-server-events";
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
    const tiktokEventIds = createTikTokEventIds();

    await createInquiry(result.data);

    await sendInquiryNotification(result.data).catch((error) => {
      console.error("Inquiry notification failed", error);
    });

    await sendTikTokInquiryEvents({
      eventIds: tiktokEventIds,
      inquiry: result.data,
      request
    }).catch((error) => {
      console.error("TikTok server event failed", error);
    });

    return NextResponse.json({
      success: true,
      message: "Inquiry submitted successfully",
      eventIds: tiktokEventIds
    });
  } catch (error) {
    console.error("Inquiry submission failed", error);
    return NextResponse.json({ success: false, message: "Unable to submit inquiry right now." }, { status: 500 });
  }
}
