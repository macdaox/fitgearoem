import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, BadgeCheck, ChevronRight, Mail, MessageCircle, PackageCheck, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { getSiteContent, type SiteContent } from "@/lib/site-content";
import { getWhatsAppHref } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us | Fitness OEM Supplier",
  description: "Learn about our OEM fitness product supply, jump rope customization, export support and wholesale service."
};

export default async function AboutPage() {
  const content = await getSiteContent();

  return (
    <main className="overflow-hidden bg-white">
      <AboutHeader content={content} />
      <AboutHero content={content} />
      <AboutIntro content={content} />
      <Capabilities content={content} />
      <FactorySection content={content} />
      <ValuesSection content={content} />
      <AboutCta content={content} />
      <AboutFooter content={content} />
    </main>
  );
}

function AboutHeader({ content }: { content: SiteContent }) {
  return (
    <header className="fixed left-0 right-0 top-4 z-50 px-4 sm:top-5">
      <nav className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between rounded-full border border-white/55 bg-white/42 px-4 shadow-[0_18px_60px_rgba(40,64,90,0.16)] backdrop-blur-2xl backdrop-saturate-150 sm:px-5">
        <a href="/" className="rounded-full px-2 text-sm font-bold text-ink transition hover:bg-white/35">
          {content.brand.name}
        </a>
        <div className="hidden items-center rounded-full border border-white/45 bg-white/24 px-2 py-1 text-sm font-medium text-graphite shadow-inner shadow-white/20 md:flex">
          <a href="/" className="rounded-full px-4 py-2 transition hover:bg-white/55 hover:text-ink">
            Home
          </a>
          <a href="/#products" className="rounded-full px-4 py-2 transition hover:bg-white/55 hover:text-ink">
            Products
          </a>
          <a href="/#oem" className="rounded-full px-4 py-2 transition hover:bg-white/55 hover:text-ink">
            OEM Service
          </a>
        </div>
        <a
          href="/#inquiry"
          className="inline-flex h-10 items-center gap-2 rounded-full border border-white/50 bg-ink/88 px-4 text-sm font-semibold text-white shadow-[0_10px_26px_rgba(16,17,20,0.18)] transition hover:bg-ink"
        >
          Quote
          <ChevronRight size={16} />
        </a>
      </nav>
    </header>
  );
}

function AboutHero({ content }: { content: SiteContent }) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-mist">
      <Image
        src={content.about.heroImage}
        width={1672}
        height={941}
        priority
        alt="Fitness OEM product supply and wholesale service"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: content.about.imagePosition }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/96 via-white/72 to-white/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-white/20" />

      <div className="section-shell relative z-10 flex min-h-screen items-end pb-12 pt-28 sm:pb-16 lg:pb-20">
        <div className="max-w-4xl">
          <p className="eyebrow">{content.about.eyebrow}</p>
          <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[1.02] text-ink sm:text-7xl lg:text-8xl">
            {content.about.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-graphite">{content.about.description}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="/#inquiry"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] bg-ink px-6 text-sm font-semibold text-white transition hover:bg-graphite"
            >
              <Mail size={18} />
              {content.about.primaryCta}
            </a>
            <a
              href={getWhatsAppHref(undefined, content.brand.whatsapp)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] border border-line bg-white/70 px-6 text-sm font-semibold text-ink backdrop-blur transition hover:border-ink hover:bg-white"
            >
              <MessageCircle size={18} />
              {content.about.secondaryCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutIntro({ content }: { content: SiteContent }) {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="section-shell grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-end">
        <div>
          <p className="eyebrow">{content.about.introEyebrow}</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            {content.about.introTitle}
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-8 text-graphite">{content.about.introText}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {content.about.stats.map((stat) => (
            <div key={`${stat.value}-${stat.label}`} className="rounded-[8px] border border-line bg-mist p-5">
              <p className="text-3xl font-semibold text-ink">{stat.value}</p>
              <p className="mt-2 text-sm leading-6 text-graphite">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Capabilities({ content }: { content: SiteContent }) {
  const icons = [PackageCheck, Sparkles, Truck];

  return (
    <section className="bg-mist py-20 sm:py-28">
      <div className="section-shell">
        <div className="max-w-3xl">
          <p className="eyebrow">{content.about.capabilitiesEyebrow}</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight text-ink sm:text-5xl">{content.about.capabilitiesTitle}</h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {content.about.capabilities.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <article key={item.title} className="rounded-[8px] border border-line bg-white p-6 shadow-soft">
                <Icon size={26} className="text-ocean" />
                <h3 className="mt-5 text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-graphite">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FactorySection({ content }: { content: SiteContent }) {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="section-shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="overflow-hidden rounded-[8px] bg-mist">
          <Image
            src={content.about.factoryImage}
            width={1672}
            height={941}
            alt="OEM fitness products and packaging options"
            className="aspect-[4/3] h-full w-full object-cover"
          />
        </div>
        <div>
          <p className="eyebrow">{content.about.factoryEyebrow}</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight text-ink sm:text-5xl">{content.about.factoryTitle}</h2>
          <p className="mt-6 text-base leading-8 text-graphite">{content.about.factoryText}</p>
          <div className="mt-8 grid gap-3">
            {content.about.processSteps.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-[8px] border border-line bg-white px-4 py-3 shadow-soft">
                <BadgeCheck size={19} className="text-ocean" />
                <span className="text-sm font-semibold text-ink">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ValuesSection({ content }: { content: SiteContent }) {
  return (
    <section className="bg-ink py-20 text-white sm:py-28">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-volt">{content.about.valuesEyebrow}</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">{content.about.valuesTitle}</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {content.about.values.map((value) => (
            <div key={value} className="rounded-[8px] border border-white/12 bg-white/8 px-5 py-4">
              <ShieldCheck size={20} className="text-volt" />
              <p className="mt-3 text-sm font-semibold leading-6 text-white/86">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutCta({ content }: { content: SiteContent }) {
  return (
    <section className="bg-mist py-20 sm:py-28">
      <div className="section-shell">
        <div className="grid gap-8 rounded-[8px] border border-line bg-white p-7 shadow-soft sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="eyebrow">{content.about.ctaEyebrow}</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-ink sm:text-5xl">{content.about.ctaTitle}</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-graphite">{content.about.ctaDescription}</p>
          </div>
          <a
            href="/#inquiry"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] bg-ink px-6 text-sm font-semibold text-white transition hover:bg-graphite"
          >
            {content.about.ctaButton}
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

function AboutFooter({ content }: { content: SiteContent }) {
  return (
    <footer className="bg-white py-10">
      <div className="section-shell flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold text-ink">{content.brand.name}</p>
          <p className="mt-2 text-sm text-graphite">Professional fitness products for wholesale and OEM buyers.</p>
        </div>
        <div className="flex flex-wrap gap-5 text-sm font-medium text-graphite">
          <a href="/" className="hover:text-ink">
            Home
          </a>
          <a href="/#products" className="hover:text-ink">
            Products
          </a>
          <a href="/#inquiry" className="hover:text-ink">
            Inquiry
          </a>
          <a href={`mailto:${content.brand.email}`} className="hover:text-ink">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
