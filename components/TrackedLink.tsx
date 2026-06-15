"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackTikTokEvent } from "@/lib/tiktok-events";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  eventName?: "Contact" | "Lead" | "SubmitForm" | "ViewContent";
  eventProperties?: Record<string, unknown>;
};

export function TrackedLink({
  children,
  eventName = "Contact",
  eventProperties,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackTikTokEvent(eventName, eventProperties);
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
