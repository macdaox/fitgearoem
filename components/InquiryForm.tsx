"use client";

import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { TrackedLink } from "@/components/TrackedLink";
import { getWhatsAppHref } from "@/lib/site-data";
import { trackTikTokEvent } from "@/lib/tiktok-events";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function InquiryForm({ compact = false }: { compact?: boolean }) {
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
      const result = (await response.json()) as {
        success: boolean;
        message: string;
        eventIds?: {
          submitForm?: string;
          lead?: string;
        };
      };

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Submission failed.");
      }

      trackTikTokEvent("SubmitForm", {
        form_name: "Wholesale Inquiry",
        event_id: result.eventIds?.submitForm
      });
      trackTikTokEvent("Lead", {
        form_name: "Wholesale Inquiry",
        event_id: result.eventIds?.lead
      });

      form.reset();
      setState("success");
      setMessage("Thank you. We have received your inquiry. You can also contact us directly on WhatsApp for a faster quote.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Please try again later.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? "grid gap-4" : "grid gap-4 rounded-[8px] bg-white p-5 shadow-soft sm:p-7"}>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Email" name="email" type="email" required />
        <Field label="WhatsApp" name="whatsapp" />
      </div>

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
