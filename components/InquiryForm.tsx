"use client";

import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { TrackedLink } from "@/components/TrackedLink";
import { getWhatsAppHref, products } from "@/lib/site-data";
import { trackTikTokEvent } from "@/lib/tiktok-events";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function InquiryForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setState("submitting");
    setMessage("");

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = (await response.json()) as { success: boolean; message: string };

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Submission failed.");
      }

      trackTikTokEvent("SubmitForm", { form_name: "Wholesale Inquiry" });
      trackTikTokEvent("Lead", { form_name: "Wholesale Inquiry" });

      form.reset();
      setState("success");
      setMessage("Thank you. We have received your inquiry. You can also contact us directly on WhatsApp for a faster quote.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Please try again later.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 rounded-[8px] bg-white p-5 shadow-soft sm:p-7">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="WhatsApp" name="whatsapp" />
        <Field label="Country" name="country" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-graphite">
          Product Interest
          <select
            name="productInterest"
            className="h-12 rounded-[8px] border border-line bg-white px-3 text-ink outline-none transition focus:border-ocean"
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.name} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
        </label>
        <Field label="Quantity" name="quantity" placeholder="e.g. 1,000 pcs" />
      </div>

      <label className="grid gap-2 text-sm font-medium text-graphite">
        Message
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell us your target product, color, logo, packaging and order quantity."
          className="resize-none rounded-[8px] border border-line bg-white px-3 py-3 text-ink outline-none transition focus:border-ocean"
        />
      </label>

      <button
        type="submit"
        disabled={state === "submitting"}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] bg-ink px-6 text-sm font-semibold text-white transition hover:bg-graphite disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send size={18} />
        {state === "submitting" ? "Submitting..." : "Submit Inquiry"}
      </button>

      {message ? (
        <div
          className={`rounded-[8px] border px-4 py-3 text-sm ${
            state === "success" ? "border-ocean/30 bg-ocean/10 text-ink" : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          <p>{message}</p>
          {state === "success" ? (
            <TrackedLink
              href={getWhatsAppHref()}
              target="_blank"
              rel="noreferrer"
              eventName="Contact"
              eventProperties={{ contact_method: "whatsapp", location: "inquiry_success" }}
              className="mt-3 inline-flex items-center gap-2 font-semibold text-ocean"
            >
              <MessageCircle size={17} />
              Contact on WhatsApp
            </TrackedLink>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-graphite">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="h-12 rounded-[8px] border border-line bg-white px-3 text-ink outline-none transition focus:border-ocean"
      />
    </label>
  );
}
