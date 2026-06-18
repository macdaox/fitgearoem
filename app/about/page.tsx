import Image from "next/image";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Download,
  Mail,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Truck
} from "lucide-react";
import { TrackedLink } from "@/components/TrackedLink";
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
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#071016]/80 px-4 backdrop-blur-xl">
      <nav className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between gap-5">
        <a href="/" className="grid leading-none text-white">
          <span className="text-2xl font-black uppercase italic tracking-tight">
            {content.brand.name.split(" ")[0]} <span className="text-[#1d82ff]">OEM</span>
          </span>
          <span className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-white/75">
            Fitness Equipment Manufacturer
          </span>
        </a>
        <div className="hidden items-center gap-7 text-xs font-bold uppercase tracking-[0.04em] text-white/75 lg:flex">
          <a href="/" className="py-6 transition hover:text-white">
            Home
          </a>
          <a href="/#products" className="py-6 transition hover:text-white">
            Products
          </a>
          <a href="/#oem" className="py-6 transition hover:text-white">
            OEM / ODM Service
          </a>
          <a href="/#factory" className="py-6 transition hover:text-white">
            Factory
          </a>
          <a href="/about" className="border-b-2 border-[#1d82ff] py-6 text-white">
            About Us
          </a>
          <a href="/#inquiry" className="py-6 transition hover:text-white">
            Contact Us
          </a>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/#inquiry"
            className="inline-flex h-10 items-center gap-2 rounded-[6px] bg-[#0d7cff] px-4 text-xs font-bold uppercase text-white shadow-[0_10px_24px_rgba(13,124,255,0.25)] transition hover:bg-[#006be6]"
          >
            Get Factory Quote
          </a>
          <a
            href="/#products"
            className="hidden h-10 items-center gap-2 rounded-[6px] border border-white/28 px-4 text-xs font-bold uppercase text-white transition hover:border-white sm:inline-flex"
          >
            Download Catalog
          </a>
        </div>
      </nav>
    </header>
  );
}

function AboutHero({ content }: { content: SiteContent }) {
  return (
    <section className="relative min-h-screen bg-[#071016] text-white">
      <Image
        src={content.about.heroImage}
        width={1672}
        height={941}
        priority
        alt="Fitness OEM product supply and wholesale service"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: content.about.imagePosition }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,16,22,0.96),rgba(7,16,22,0.76)_44%,rgba(7,16,22,0.16)_78%,rgba(7,16,22,0.32))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_36%,rgba(13,124,255,0.13),transparent_34%)]" />
      <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#071016] via-[#071016]/70 to-transparent" />

      <div className="section-shell relative z-10 flex min-h-screen items-center pb-24 pt-28 lg:pt-24">
        <div className="max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#48a5ff]">{content.about.eyebrow}</p>
          <h1 className="mt-5 max-w-5xl text-4xl font-black uppercase leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {content.about.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-white/80">{content.about.description}</p>
          <div className="mt-6 grid max-w-xl grid-cols-2 gap-3 text-sm font-semibold text-white/80 sm:grid-cols-3">
            {content.about.stats.map((stat) => (
              <span key={`${stat.value}-${stat.label}`} className="inline-flex items-start gap-2">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#1d82ff]" />
                <span>
                  <strong className="block text-white">{stat.value}</strong>
                  {stat.label}
                </span>
              </span>
            ))}
          </div>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="/#inquiry"
              className="inline-flex h-[52px] items-center justify-center gap-3 rounded-[6px] bg-[#0d7cff] px-7 text-sm font-bold uppercase text-white shadow-[0_12px_30px_rgba(13,124,255,0.28)] transition hover:bg-[#006be6]"
            >
              <Mail size={18} />
              {content.about.primaryCta}
            </a>
            <a
              href={getWhatsAppHref(undefined, content.brand.whatsapp)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-[52px] items-center justify-center gap-3 rounded-[6px] border border-white/30 bg-white/5 px-7 text-sm font-bold uppercase text-white backdrop-blur transition hover:border-white hover:bg-white/10"
            >
              <MessageCircle size={18} />
              {content.about.secondaryCta}
            </a>
            <a
              href="/#products"
              className="inline-flex h-[52px] items-center justify-center gap-3 rounded-[6px] border border-white/30 bg-white/5 px-7 text-sm font-bold uppercase text-white backdrop-blur transition hover:border-white hover:bg-white/10"
            >
              Download Catalog
              <Download size={17} />
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
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/#products" },
    { label: "OEM/ODM", href: "/#oem" },
    { label: "Factory", href: "/#factory" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/#inquiry" }
  ];

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <Image
        src={content.about.factoryImage || content.about.heroImage}
        width={1600}
        height={900}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.16]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#071016]/96 via-[#071016]/92 to-[#071016]/96" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

      <div className="section-shell relative z-10 py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.45fr_0.9fr_1fr_1.5fr_1.35fr]">
          <div>
            <a href="/" className="grid w-fit leading-none text-white">
              <span className="text-2xl font-black uppercase italic tracking-tight sm:text-3xl">
                {content.brand.name.split(" ")[0]} <span className="text-[#1d82ff]">OEM</span>
              </span>
              <span className="mt-2 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-white/65">
                Fitness Equipment Manufacturer
              </span>
            </a>
            <p className="mt-6 max-w-sm text-sm leading-7 text-white/70">
              {content.about.introText}
            </p>
            <div className="mt-7 flex items-center gap-3">
              <FooterSocialLink href={content.brand.facebook} label="Facebook">
                <FacebookIcon />
              </FooterSocialLink>
              <FooterSocialLink href={content.brand.instagram} label="Instagram">
                <InstagramIcon />
              </FooterSocialLink>
              <FooterSocialLink href={content.brand.tiktok} label="TikTok">
                <TikTokIcon />
              </FooterSocialLink>
            </div>
          </div>

          <AboutFooterColumn title="Quick Links">
            {quickLinks.map((link) => (
              <a key={link.label} href={link.href} className="footer-link">
                {link.label}
              </a>
            ))}
          </AboutFooterColumn>

          <AboutFooterColumn title="Products">
            {content.homeProducts.categories.map((product) => (
              <a key={product.name} href="/#products" className="footer-link">
                {product.name}
              </a>
            ))}
          </AboutFooterColumn>

          <AboutFooterColumn title="Contact Us">
            <div className="grid gap-3 text-sm leading-6 text-white/70">
              <TrackedLink
                href={`mailto:${content.brand.email}`}
                eventProperties={{ contact_method: "email", location: "about_footer" }}
                className="transition hover:text-white"
              >
                Email: {content.brand.email}
              </TrackedLink>
              <TrackedLink
                href={getWhatsAppHref(undefined, content.brand.whatsapp)}
                target="_blank"
                rel="noreferrer"
                eventProperties={{ contact_method: "whatsapp", location: "about_footer" }}
                className="transition hover:text-white"
              >
                WhatsApp: {content.brand.whatsapp}
              </TrackedLink>
              <p>{content.about.factoryText}</p>
            </div>
          </AboutFooterColumn>

          <AboutFooterColumn title="Request a Quote">
            <p className="text-sm leading-6 text-white/70">{content.about.ctaDescription}</p>
            <a
              href="/#inquiry"
              className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-[8px] bg-[#0d7cff] px-5 text-sm font-bold uppercase text-white transition hover:bg-[#006be6]"
            >
              {content.about.ctaButton}
              <ArrowRight size={16} />
            </a>
          </AboutFooterColumn>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-white/60">
          © 2026 {content.brand.name}. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

function AboutFooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-bold uppercase tracking-[0.08em] text-white">{title}</h2>
      <div className="mt-6 grid gap-3 text-sm text-white/70">{children}</div>
    </div>
  );
}

function FooterSocialLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  if (!href) return null;

  return (
    <TrackedLink
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      eventProperties={{ contact_method: label.toLowerCase(), location: "about_footer" }}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/80 transition hover:-translate-y-0.5 hover:border-[#0d7cff] hover:bg-[#0d7cff] hover:text-white"
    >
      {children}
    </TrackedLink>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
      <path d="M16.7 3c.3 2.2 1.6 3.8 3.8 4v3.1a7.4 7.4 0 0 1-3.7-1.1v5.7c0 3.7-2.5 6.3-6 6.3A5.8 5.8 0 0 1 5 15.2c0-3.3 2.6-5.8 5.9-5.8.4 0 .8 0 1.1.1v3.3a3 3 0 0 0-1.2-.2 2.5 2.5 0 0 0-2.6 2.6 2.5 2.5 0 0 0 2.5 2.5c1.6 0 2.6-1 2.6-2.9V3h3.4Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M17.4 6.6h.01" strokeLinecap="round" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
      <path d="M14.3 8.4V6.9c0-.7.5-.9 1-.9h1.8V3.1c-.3 0-1.5-.1-2.8-.1-2.8 0-4.7 1.7-4.7 4.8v.6H6.9v3.2h2.7V21h3.5v-9.4h2.9l.5-3.2h-3.4Z" />
    </svg>
  );
}
