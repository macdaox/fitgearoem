type TikTokEventName = "Contact" | "Lead" | "SubmitForm" | "ViewContent";

declare global {
  interface Window {
    ttq?: {
      identify?: (customerInfo: Record<string, string>) => void;
      track?: (eventName: TikTokEventName, properties?: Record<string, unknown>) => void;
    };
  }
}

export function identifyTikTokUser({
  email,
  phone
}: {
  email?: FormDataEntryValue | string | null;
  phone?: FormDataEntryValue | string | null;
}) {
  if (typeof window === "undefined") return;

  const customerInfo = removeEmptyValues({
    email: normalizeValue(email).toLowerCase(),
    phone_number: normalizePhone(phone),
    external_id: getFitGearExternalId()
  });

  if (Object.keys(customerInfo).length === 0) return;

  window.ttq?.identify?.(customerInfo);
}

export function trackTikTokEvent(eventName: TikTokEventName, properties?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  window.ttq?.track?.(eventName, properties);
}

function getFitGearExternalId() {
  try {
    return window.localStorage?.getItem("fitgear_external_id") || "";
  } catch {
    return "";
  }
}

function normalizeValue(value?: FormDataEntryValue | string | null) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizePhone(value?: FormDataEntryValue | string | null) {
  return normalizeValue(value).replace(/[^\d+]/g, "");
}

function removeEmptyValues<T extends Record<string, string>>(value: T): T {
  return Object.fromEntries(Object.entries(value).filter(([, item]) => item !== "")) as T;
}
