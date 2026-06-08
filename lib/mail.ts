import { Resend } from "resend";
import type { InquiryPayload } from "./validation";

export async function sendInquiryNotification(inquiry: InquiryPayload) {
  if (!process.env.RESEND_API_KEY || !process.env.ADMIN_EMAIL) {
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const submittedAt = new Date().toISOString();

  await resend.emails.send({
    from: "Wholesale Inquiry <onboarding@resend.dev>",
    to: process.env.ADMIN_EMAIL,
    subject: `New Wholesale Inquiry from ${inquiry.name}`,
    text: [
      `Name: ${inquiry.name}`,
      `Email: ${inquiry.email}`,
      `WhatsApp: ${inquiry.whatsapp || "-"}`,
      `Country: ${inquiry.country || "-"}`,
      `Product Interest: ${inquiry.productInterest || "-"}`,
      `Quantity: ${inquiry.quantity || "-"}`,
      `Message: ${inquiry.message}`,
      `Submit Time: ${submittedAt}`
    ].join("\n")
  });
}
