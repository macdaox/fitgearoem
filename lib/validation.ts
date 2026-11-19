export type InquiryPayload = {
  name: string;
  email: string;
  whatsapp?: string;
  country?: string;
  productInterest?: string;
  productCategory?: string;
  productType?: string;
  buyerType?: string;
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
    name: clean(source.name, 120) || "Website Inquiry",
    email: clean(source.email, 180).toLowerCase(),
    whatsapp: clean(source.whatsapp, 80),
    country: clean(source.country, 100),
    productInterest: clean(source.productInterest, 140),
    productCategory: clean(source.productCategory, 140),
    productType: clean(source.productType, 140),
    buyerType: clean(source.buyerType, 100),
    quantity: clean(source.quantity, 80),
    message: clean(source.message, 1500) || "Quick contact request from website."
  };

  if (!data.email) {
    return { ok: false, message: "Email is required." };
  }

  if (!emailPattern.test(data.email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  const usesProductFields = "productCategory" in source || "productType" in source || "buyerType" in source;
  if (usesProductFields && source.quantity != null) {
    const quantity = typeof source.quantity === "string" ? source.quantity.trim() : null;
    if (quantity !== "" && (quantity === null || !/^[1-9][0-9]{0,79}$/.test(quantity))) {
      return { ok: false, message: "Please enter a positive whole number for quantity." };
    }
  }

  return { ok: true, data };
}
