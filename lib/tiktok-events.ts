type TikTokEventName = "Contact" | "Lead" | "SubmitForm" | "ViewContent";

declare global {
  interface Window {
    ttq?: {
      track?: (eventName: TikTokEventName, properties?: Record<string, unknown>) => void;
    };
  }
}

export function trackTikTokEvent(eventName: TikTokEventName, properties?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  window.ttq?.track?.(eventName, properties);
}
