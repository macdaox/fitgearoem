"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, X } from "lucide-react";
import { InquiryForm } from "@/components/InquiryForm";
import type { SiteContent } from "@/lib/site-content";

const tkBadges = ["Low MOQ", "OEM / ODM", "Fast Sample", "Factory Direct"];

export function TkLanding({ content }: { content: SiteContent }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <main className="min-h-[100svh] overflow-hidden bg-[#071016] text-white">
      <section className="relative flex min-h-[100svh] flex-col">
        <Image
          src={content.promo.image}
          width={1672}
          height={941}
          priority
          alt="OEM jump rope and fitness product hero display"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: content.promo.imagePosition }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,16,22,0.72),rgba(7,16,22,0.34)_42%,rgba(7,16,22,0.96))]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,16,22,0.78),rgba(7,16,22,0.16)_64%,rgba(7,16,22,0.36))]" />

        <header className="relative z-10 flex items-center justify-between px-5 py-5">
          <a href="/" className="grid leading-none">
            <span className="text-xl font-black uppercase italic tracking-tight">
              {content.brand.name.split(" ")[0]} <span className="text-[#1d82ff]">OEM</span>
            </span>
            <span className="mt-1 text-[0.56rem] font-bold uppercase tracking-[0.14em] text-white/75">Fitness Equipment Manufacturer</span>
          </a>
          <a
            href="/"
            className="rounded-full border border-white/20 bg-white/10 px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-white backdrop-blur transition hover:bg-white/15"
          >
            Home
          </a>
        </header>

        <div className="relative z-10 flex flex-1 items-center px-5 pb-10 pt-4">
          <div className="w-full">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#48a5ff]">{content.promo.eyebrow}</p>
            <h1 className="mt-4 max-w-[22rem] text-[2.55rem] font-black uppercase leading-[1.02] tracking-tight text-white">
              {content.promo.title}
            </h1>
            <p className="mt-5 max-w-[21rem] text-base font-medium leading-7 text-white/82">{content.promo.description}</p>

            <div className="mt-5 grid max-w-[21rem] grid-cols-2 gap-2.5 text-xs font-semibold text-white/85">
              {tkBadges.map((badge) => (
                <span key={badge} className="inline-flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#1d82ff]" />
                  {badge}
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="mt-8 inline-flex h-14 w-full max-w-[22rem] items-center justify-center gap-3 rounded-[8px] bg-[#0d7cff] px-6 text-sm font-black uppercase tracking-[0.04em] text-white shadow-[0_18px_38px_rgba(13,124,255,0.34)] transition hover:bg-[#006be6]"
            >
              {content.promo.buttonText}
              <ArrowRight size={19} />
            </button>
          </div>
        </div>
      </section>

      {open ? (
        <div className="fixed inset-0 z-50 grid items-end bg-[#071016]/78 p-0 backdrop-blur-sm sm:items-center sm:p-5">
          <button type="button" aria-label="Close quote form" className="absolute inset-0 cursor-default" onClick={() => setOpen(false)} />
          <div className="relative max-h-[88svh] overflow-y-auto rounded-t-[16px] bg-white p-4 shadow-[0_-18px_60px_rgba(0,0,0,0.34)] sm:mx-auto sm:w-full sm:max-w-2xl sm:rounded-[12px] sm:p-5">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#0d7cff]">Wholesale Inquiry</p>
                <h2 className="mt-1 text-2xl font-black uppercase leading-tight text-[#081422]">Request a factory quote</h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-mist text-ink transition hover:border-ink"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
            <InquiryForm />
          </div>
        </div>
      ) : null}
    </main>
  );
}
