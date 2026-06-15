"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { BadgeCheck, Cable, ChevronLeft, ChevronRight, Rotate3D, ShieldCheck, Zap } from "lucide-react";
import type { IconName, SiteContent } from "@/lib/site-content";

const detailIcons: Record<IconName, typeof Rotate3D> = {
  rotate: Rotate3D,
  shield: ShieldCheck,
  cable: Cable,
  zap: Zap,
  badge: BadgeCheck
};

export function ProductDetailsCarousel({ items }: { items: SiteContent["productDetails"] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex] || items[0];
  const Icon = useMemo(() => detailIcons[activeItem?.icon] || BadgeCheck, [activeItem?.icon]);

  if (!activeItem) return null;

  function goTo(index: number) {
    setActiveIndex((index + items.length) % items.length);
  }

  return (
    <div className="detail-card relative min-h-screen overflow-hidden bg-ink">
      {items.map((item, index) => (
        <Image
          key={`${item.image}-${index}`}
          src={item.image}
          width={1672}
          height={941}
          alt={`${item.title} jump rope detail`}
          className={`absolute inset-0 h-full w-full object-cover object-center transition duration-700 ease-out ${
            index === activeIndex ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"
          }`}
          priority={index === 0}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/84 via-ink/38 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />

      <div className="section-shell relative z-10 flex min-h-screen items-end py-12 sm:py-16 lg:py-20">
        <div className="max-w-xl text-white">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-[8px] bg-white text-ocean shadow-soft">
            <Icon size={22} />
          </div>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-white/62">
            {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </p>
          <h3 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">{activeItem.title}</h3>
          <p className="mt-5 text-base leading-7 text-white/78 sm:text-lg">{activeItem.description}</p>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/18 bg-white/12 p-2 backdrop-blur-xl">
        <button
          type="button"
          aria-label="Previous product detail"
          onClick={() => goTo(activeIndex - 1)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/88 text-ink transition hover:bg-white"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-2 px-1">
          {items.map((item, index) => (
            <button
              key={`${item.title}-${index}`}
              type="button"
              aria-label={`Show ${item.title}`}
              onClick={() => goTo(index)}
              className={`h-2.5 rounded-full transition ${
                index === activeIndex ? "w-8 bg-white" : "w-2.5 bg-white/45 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next product detail"
          onClick={() => goTo(activeIndex + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/88 text-ink transition hover:bg-white"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
