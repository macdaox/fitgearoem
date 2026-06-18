"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { trackTikTokEvent } from "@/lib/tiktok-events";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function FooterSubscribeForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") || "").trim();

    setState("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          productInterest: "Newsletter",
          message: "Newsletter subscription from footer."
        })
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
        throw new Error(result.message || "Subscription failed.");
      }

      trackTikTokEvent("SubmitForm", {
        form_name: "Footer Newsletter",
        event_id: result.eventIds?.submitForm
      });
      trackTikTokEvent("Lead", {
        form_name: "Footer Newsletter",
        event_id: result.eventIds?.lead
      });

      form.reset();
      setState("success");
      setMessage("Subscribed. We will send product updates to this email.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Please try again later.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 grid gap-3">
      <label className="sr-only" htmlFor="footer-email">
        Email address
      </label>
      <input
        id="footer-email"
        name="email"
        type="email"
        required
        placeholder="Your email address"
        className="h-11 rounded-[8px] border border-white/15 bg-white px-4 text-sm text-ink outline-none transition placeholder:text-graphite/70 focus:border-[#0d7cff]"
      />
      <button
        type="submit"
        disabled={state === "submitting"}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-[#0d7cff] px-5 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#006be6] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send size={15} />
        {state === "submitting" ? "Submitting" : "Subscribe"}
      </button>
      {message ? (
        <p className={`text-xs leading-5 ${state === "success" ? "text-white/80" : "text-red-200"}`}>{message}</p>
      ) : null}
    </form>
  );
}
