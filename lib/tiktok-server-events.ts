import type { NextRequest } from "next/server";
import type { InquiryPayload } from "@/lib/validation";

type TikTokServerEventName = "Lead" | "SubmitForm";

type TikTokServerEventPayload = {
  event: TikTokServerEventName;
  event_id: string;
  event_time: number;
  user: {
    email?: string;
    phone?: string;
    ip?: string;
    user_agent?: string;
    ttp?: string;
    ttclid?: string;
  };
  page: {
    url: string;
    referrer?: string;
  };
  properties: {
    content_id: string;
    content_name: string;
    content_type: string;
    currency: string;
    value: number;
    description: string;
  };
};

type TikTokEventIds = {
  submitForm: string;
  lead: string;
};

const tiktokEventsApiUrl = "https://business-api.tiktok.com/open_api/v1.3/event/track/";

export function createTikTokEventIds(): TikTokEventIds {
  const token = typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;

  return {
    submitForm: `inquiry-submit-${token}`,
    lead: `inquiry-lead-${token}`
  };
}

export async function sendTikTokInquiryEvents({
  eventIds,
  inquiry,
  request
}: {
  eventIds: TikTokEventIds;
  inquiry: InquiryPayload;
  request: NextRequest;
}) {
  const pixelCode = process.env.TIKTOK_PIXEL_CODE || "D8O4HJ3C77U56UIVD6Q0";
  const accessToken = process.env.TIKTOK_ACCESS_TOKEN;

  if (!accessToken || !pixelCode) {
    return;
  }

  const eventTime = Math.floor(Date.now() / 1000);
  const user = await buildTikTokUser(request, inquiry);
  const page = buildTikTokPage(request);
  const properties = buildTikTokProperties(inquiry);
  const events: TikTokServerEventPayload[] = [
    {
      event: "SubmitForm",
      event_id: eventIds.submitForm,
      event_time: eventTime,
      user,
      page,
      properties
    },
    {
      event: "Lead",
      event_id: eventIds.lead,
      event_time: eventTime,
      user,
      page,
      properties
    }
  ];

  const body: Record<string, unknown> = {
    event_source: "web",
    event_source_id: pixelCode,
    data: events
  };

  if (process.env.TIKTOK_TEST_EVENT_CODE) {
    body.test_event_code = process.env.TIKTOK_TEST_EVENT_CODE;
  }

  const response = await fetch(tiktokEventsApiUrl, {
    method: "POST",
    headers: {
      "Access-Token": accessToken,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const responseText = await response.text().catch(() => "");
    throw new Error(`TikTok Events API failed with ${response.status}: ${responseText.slice(0, 500)}`);
  }
}

async function buildTikTokUser(request: NextRequest, inquiry: InquiryPayload): Promise<TikTokServerEventPayload["user"]> {
  const email = await sha256(normalizeEmail(inquiry.email));
  const phone = await sha256(normalizePhone(inquiry.whatsapp || ""));
  const userAgent = request.headers.get("user-agent") || undefined;
  const ip = getClientIp(request);
  const ttp = request.cookies.get("_ttp")?.value;
  const ttclid = request.nextUrl.searchParams.get("ttclid") || request.cookies.get("ttclid")?.value || undefined;

  return removeEmptyValues({
    email,
    phone,
    ip,
    user_agent: userAgent,
    ttp,
    ttclid
  });
}

function buildTikTokPage(request: NextRequest): TikTokServerEventPayload["page"] {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
  const referrer = request.headers.get("referer") || undefined;

  return removeEmptyValues({
    url: referrer || siteUrl,
    referrer
  });
}

function buildTikTokProperties(inquiry: InquiryPayload): TikTokServerEventPayload["properties"] {
  const productName = inquiry.productInterest || "Wholesale Inquiry";

  return {
    content_id: productName,
    content_name: productName,
    content_type: "product",
    currency: "USD",
    value: 1,
    description: `Product inquiry submitted; WhatsApp: ${inquiry.whatsapp ? "provided" : "not provided"}`
  };
}

function getClientIp(request: NextRequest) {
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    undefined
  );
}

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function normalizePhone(value: string) {
  return value.replace(/[^\d+]/g, "");
}

async function sha256(value: string) {
  if (!value) return undefined;

  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function removeEmptyValues<T extends Record<string, unknown>>(value: T): T {
  return Object.fromEntries(Object.entries(value).filter(([, item]) => item !== undefined && item !== "")) as T;
}
