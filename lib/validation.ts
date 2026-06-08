export type InquiryPayload = {
  name: string;
  email: string;
  whatsapp?: string;
  country?: string;
  productInterest?: string;
  quantity?: string;
  message: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

export function validateInquiryPayload(input: unknown): { ok: true; data: InquiryPayload } | { ok: false; message: string } {
  if (!input || typeof input !== "object") {
    return { ok: false, message: "Invalid inquiry payload." };
  }

  const source = input as Record<string, unknown>;
  const data = {
    name: clean(source.name, 120),
    email: clean(source.email, 180).toLowerCase(),
    whatsapp: clean(source.whatsapp, 80),
    country: clean(source.country, 100),
    productInterest: clean(source.productInterest, 140),
    quantity: clean(source.quantity, 80),
    message: clean(source.message, 1500)
  };

  if (!data.name || !data.email || !data.message) {
    return { ok: false, message: "Name, email and message are required." };
  }

  if (!emailPattern.test(data.email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  return { ok: true, data };
}
