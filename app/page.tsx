import Image from "next/image";
import type { ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Boxes,
  Building2,
  ChevronRight,
  ClipboardCheck,
  Cog,
  Factory,
  FileText,
  Globe2,
  Handshake,
  Mail,
  MessageCircle,
  PackageCheck,
  Search,
  Truck,
  UsersRound,
} from "lucide-react";
import { InquiryForm } from "@/components/InquiryForm";
import { ProductDetailsCarousel } from "@/components/ProductDetailsCarousel";
import { ScrollAnimations } from "@/components/ScrollAnimations";
import { TrackedLink } from "@/components/TrackedLink";
import { getSiteContent, type HomeIconName, type SiteContent } from "@/lib/site-content";
import {
  getWhatsAppHref,
  products,
  specs,
  trustItems
} from "@/lib/site-data";

export const dynamic = "force-dynamic";

const homeIcons: Record<HomeIconName, typeof BadgeCheck> = {
  factory: Building2,
  lines: Cog,
  workers: UsersRound,
  warehouse: Boxes,
  globe: Globe2,
  delivery: ClipboardCheck,
  search: Search,
  quotation: FileText,
  sample: Handshake,
  production: Factory,
  truck: Truck
};

export default async function Home() {
  const content = await getSiteContent();

  return (
    <main className="overflow-hidden">
      <ScrollAnimations />
      <Header content={content} />
      <Hero content={content} />
      <HomeStats content={content} />
      <ProductDetails content={content} />
      <WholesaleTrust />
      <OemModule content={content} />
      <ProductSeries />
      <TrainingScenes content={content} />
      <Specifications />
      <ServiceProcess content={content} />
      <InquirySection content={content} />
      <Footer content={content} />
    </main>
  );
}

function Header({ content }: { content: SiteContent }) {
  return (
    <header className="fixed left-0 right-0 top-4 z-50 px-4 sm:top-5">
      <nav className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between rounded-full border border-white/55 bg-white/38 px-4 shadow-[0_18px_60px_rgba(40,64,90,0.16)] backdrop-blur-2xl backdrop-saturate-150 sm:px-5">
        <a href="/" className="rounded-full px-2 text-sm font-bold text-ink transition hover:bg-white/35">
          {content.brand.name}
        </a>
        <div className="hidden items-center rounded-full border border-white/45 bg-white/24 px-2 py-1 text-sm font-medium text-graphite shadow-inner shadow-white/20 md:flex">
          <a href="/about" className="rounded-full px-4 py-2 transition hover:bg-white/55 hover:text-ink">
            About Us
          </a>
          <a href="#products" className="rounded-full px-4 py-2 transition hover:bg-white/55 hover:text-ink">
            Products
          </a>
          <a href="#oem" className="rounded-full px-4 py-2 transition hover:bg-white/55 hover:text-ink">
            OEM Service
          </a>
          <a href="#specs" className="rounded-full px-4 py-2 transition hover:bg-white/55 hover:text-ink">
            Specifications
          </a>
        </div>
        <a
          href="#inquiry"
          className="inline-flex h-10 items-center gap-2 rounded-full border border-white/50 bg-ink/88 px-4 text-sm font-semibold text-white shadow-[0_10px_26px_rgba(16,17,20,0.18)] transition hover:bg-ink"
        >
          Quote
          <ChevronRight size={16} />
        </a>
      </nav>
    </header>
  );
}

function Hero({ content }: { content: SiteContent }) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-mist">
      <Image
        src={content.hero.image}
        width={1672}
        height={941}
        priority
        alt="Premium pastel speed jump rope product display"
        className="hero-product absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: content.hero.imagePosition }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/96 via-white/72 to-white/8" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/55 via-transparent to-white/25" />

      <div className="section-shell relative z-10 flex min-h-screen items-end pb-20 pt-28 sm:pb-24 lg:pb-32">
        <div className="reveal max-w-3xl text-ink">
          <p className="eyebrow">{content.hero.eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] text-ink sm:text-7xl lg:text-8xl">
            {content.hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-graphite">{content.hero.description}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#inquiry"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] bg-ink px-6 text-sm font-semibold text-white transition hover:bg-graphite"
            >
              <Mail size={18} />
              Get Wholesale Quote
            </a>
            <a
              href="#products"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] border border-line bg-white/70 px-6 text-sm font-semibold text-ink backdrop-blur transition hover:border-ink hover:bg-white"
            >
              <ArrowDown size={18} />
              View Products
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeStats({ content }: { content: SiteContent }) {
  return (
    <section className="relative z-20 bg-white py-10 sm:py-12 lg:py-14">
      <div className="section-shell">
        <div className="mx-auto max-w-7xl rounded-[8px] border border-white/80 bg-white/92 p-4 shadow-[0_18px_46px_rgba(40,64,90,0.11)] backdrop-blur-2xl sm:p-5 lg:p-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6 lg:gap-6">
            {content.homeStats.items.map((item, index) => {
              const Icon = homeIcons[item.icon] || BadgeCheck;
              return (
                <div key={`${item.label}-${index}`} className="flex min-h-32 flex-col items-center justify-center rounded-[8px] px-4 py-5 text-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-mist text-ocean">
                    <Icon size={24} strokeWidth={1.8} />
                  </div>
                  <p className="mt-4 text-2xl font-semibold leading-none text-ink lg:text-[1.7rem]">{item.value}</p>
                  <p className="mt-2 text-sm font-medium leading-5 text-graphite">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductDetails({ content }: { content: SiteContent }) {
  return (
    <section className="relative z-10 bg-white">
      <div>
        <ProductDetailsCarousel items={content.productDetails} />
      </div>
    </section>
  );
}

function WholesaleTrust() {
  return (
    <section className="bg-mist py-24 sm:py-32">
      <div className="section-shell">
        <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">B2B Supply</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              Why wholesale buyers choose us.
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-graphite">
            Built around clear communication, repeatable quality and export-ready order support.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="reveal rounded-[8px] border border-line bg-white p-6 shadow-soft">
                <Icon className="text-ocean" size={26} />
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

function OemModule({ content }: { content: SiteContent }) {
  return (
    <section id="oem" className="relative min-h-screen overflow-hidden bg-ink py-24 sm:py-32">
      <Image
        src={content.oem.image}
        width={1672}
        height={941}
        alt="Custom color jump rope display for OEM programs"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/94 via-white/78 to-white/10" />
      <div className="section-shell relative z-10 flex min-h-[calc(100vh-10rem)] items-center">
        <div className="reveal max-w-2xl">
          <p className="eyebrow">{content.oem.eyebrow}</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight text-ink sm:text-6xl">{content.oem.title}</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-graphite">{content.oem.description}</p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {content.oem.options.map((option) => (
              <div
                key={option}
                className="rounded-[8px] border border-white/70 bg-white/78 px-4 py-3 text-sm font-semibold text-ink shadow-soft backdrop-blur transition hover:-translate-y-1 hover:border-ocean hover:bg-white"
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductSeries() {
  return (
    <section id="products" className="bg-mist py-24 sm:py-32">
      <div className="section-shell">
        <div className="reveal max-w-3xl">
          <p className="eyebrow">Product Series</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight text-ink sm:text-5xl">A complete line for wholesale programs.</h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {products.map((product) => (
            <article key={product.name} className="reveal rounded-[8px] border border-line bg-white p-4 shadow-soft">
              <Image
                src={product.image}
                width={900}
                height={1200}
                alt={`${product.name} product photo`}
                className="aspect-[4/5] w-full rounded-[8px] bg-mist object-cover"
              />
              <h3 className="mt-5 text-xl font-semibold text-ink">{product.name}</h3>
              <p className="mt-3 min-h-20 text-sm leading-6 text-graphite">{product.description}</p>
              <div className="mt-5 grid gap-2">
                <a
                  href="#specs"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-[8px] border border-line text-sm font-semibold text-ink transition hover:border-ink"
                >
                  <PackageCheck size={16} />
                  View Details
                </a>
                <a
                  href="#inquiry"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-[8px] bg-ink text-sm font-semibold text-white transition hover:bg-graphite"
                >
                  <Mail size={16} />
                  Get Quote
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrainingScenes({ content }: { content: SiteContent }) {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-white sm:py-32">
      <Image
        src={content.factoryShowcase.backgroundImage}
        width={1600}
        height={900}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.16]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/96 via-ink/86 to-ink/94" />

      <div className="section-shell relative z-10 grid gap-12 lg:grid-cols-[0.8fr_1.35fr] lg:items-center">
        <div className="reveal">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-volt">{content.factoryShowcase.eyebrow}</p>
          <h2 className="mt-4 text-4xl font-semibold uppercase leading-tight sm:text-5xl">{content.factoryShowcase.title}</h2>
          <div className="mt-8 grid gap-5">
            {content.factoryShowcase.features.map((item) => {
              const Icon = homeIcons[item.icon] || BadgeCheck;
              return (
                <article key={item.title} className="grid grid-cols-[auto_1fr] gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/28 text-white">
                    <Icon size={24} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold uppercase leading-tight">{item.title}</h3>
                    <p className="mt-2 max-w-md text-sm leading-6 text-white/68">{item.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
          <a
            href="/about"
            className="mt-9 inline-flex h-12 min-w-40 items-center justify-center rounded-[8px] bg-ocean px-6 text-sm font-bold uppercase tracking-[0.06em] text-white transition hover:bg-[#1671c9]"
          >
            {content.factoryShowcase.buttonText}
          </a>
        </div>

        <div className="reveal grid gap-3 sm:grid-cols-2">
          {content.factoryShowcase.images.map((item) => (
            <article key={item.title} className="group relative overflow-hidden rounded-[8px] bg-white/10">
              <Image
                src={item.image}
                width={900}
                height={520}
                alt={`${item.title} factory photo`}
                className="aspect-[16/9] h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/82 to-transparent px-5 pb-4 pt-14">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Specifications() {
  return (
    <section id="specs" className="bg-white py-24 sm:py-32">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="reveal">
          <p className="eyebrow">Specifications</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight text-ink sm:text-5xl">Ready for sampling and production.</h2>
          <p className="mt-5 text-base leading-7 text-graphite">
            Standard specifications can be adjusted by rope type, packaging plan and target order quantity.
          </p>
        </div>
        <div className="reveal overflow-hidden rounded-[8px] border border-line">
          <table className="w-full border-collapse text-left text-sm">
            <tbody>
              {specs.map(([item, detail]) => (
                <tr key={item} className="border-b border-line last:border-0">
                  <th className="w-36 bg-mist px-4 py-4 font-semibold text-ink sm:w-52 sm:px-6">{item}</th>
                  <td className="px-4 py-4 leading-6 text-graphite sm:px-6">{detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function ServiceProcess({ content }: { content: SiteContent }) {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="section-shell">
        <div className="reveal mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold uppercase leading-tight tracking-[0.02em] text-ink sm:text-3xl">
            {content.serviceProcess.title}
          </h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-ocean" />
        </div>

        <div className="mt-12 hidden grid-cols-[minmax(0,1fr)_4rem_minmax(0,1fr)_4rem_minmax(0,1fr)_4rem_minmax(0,1fr)_4rem_minmax(0,1fr)] items-start gap-2 lg:grid">
          {content.serviceProcess.steps.map((step, index) => (
            <div key={`${step.number}-${step.title}`} className="contents">
              <ProcessStep step={step} />
              {index < content.serviceProcess.steps.length - 1 ? (
                <div className="flex h-20 items-center justify-center pt-1 text-ocean">
                  <ArrowRight size={28} strokeWidth={2.2} />
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 lg:hidden">
          {content.serviceProcess.steps.map((step, index) => (
            <div key={`${step.number}-${step.title}`} className="reveal grid grid-cols-[auto_1fr] gap-4">
              <div className="flex flex-col items-center">
                <div className="h-3 w-3 rounded-full bg-ocean" />
                {index < content.serviceProcess.steps.length - 1 ? <div className="mt-2 h-full min-h-16 w-px bg-line" /> : null}
              </div>
              <ProcessStep step={step} align="left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessStep({
  step,
  align = "center"
}: {
  step: SiteContent["serviceProcess"]["steps"][number];
  align?: "center" | "left";
}) {
  const Icon = homeIcons[step.icon] || BadgeCheck;

  return (
    <article
      className={`reveal flex flex-col ${
        align === "center" ? "min-h-48 items-center text-center" : "text-left"
      }`}
    >
      <div
        className={`flex h-16 w-16 items-center justify-center text-ocean ${
          align === "center" ? "mx-auto" : ""
        }`}
      >
        <Icon size={46} strokeWidth={1.9} />
      </div>
      <p className="mt-3 text-lg font-bold leading-none text-ink">{step.number}</p>
      <h3 className="mt-1 text-sm font-bold text-ink">{step.title}</h3>
      <p className="mt-5 max-w-56 text-sm leading-6 text-graphite">{step.description}</p>
    </article>
  );
}

function InquirySection({ content }: { content: SiteContent }) {
  return (
    <section id="inquiry" className="bg-mist py-24 sm:py-32">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="reveal">
          <p className="eyebrow">{content.inquiry.eyebrow}</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight text-ink sm:text-5xl">{content.inquiry.title}</h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-graphite">{content.inquiry.description}</p>
          <div className="mt-8 flex flex-col gap-3 text-sm font-semibold text-graphite">
            <TrackedLink
              href={`mailto:${content.brand.email}`}
              eventProperties={{ contact_method: "email", location: "inquiry_section" }}
              className="inline-flex items-center gap-2 transition hover:text-ink"
            >
              <Mail size={18} />
              {content.brand.email}
            </TrackedLink>
            <div className="group relative w-fit">
              <TrackedLink
                href={getWhatsAppHref(undefined, content.brand.whatsapp)}
                target="_blank"
                rel="noreferrer"
                eventProperties={{ contact_method: "whatsapp", location: "inquiry_section" }}
                className="inline-flex items-center gap-2 transition hover:text-ink"
              >
                <MessageCircle size={18} />
                WhatsApp faster quote
              </TrackedLink>
              <div className="pointer-events-none absolute left-0 top-full z-20 mt-3 w-44 translate-y-2 rounded-[8px] border border-line bg-white p-3 opacity-0 shadow-soft transition group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <Image
                  src={getQrCodeUrl(getWhatsAppHref(undefined, content.brand.whatsapp))}
                  width={160}
                  height={160}
                  alt="WhatsApp QR code"
                  className="aspect-square w-full rounded-[8px]"
                />
                <p className="mt-2 text-center text-xs font-medium text-graphite">Scan to chat on WhatsApp</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-2">
              <Truck size={18} />
              Global shipping support
            </span>
          </div>
          <div className="mt-7 flex items-center gap-3">
            <SocialLink href={content.brand.tiktok} label="TikTok">
              <TikTokIcon />
            </SocialLink>
            <SocialLink href={content.brand.instagram} label="Instagram">
              <InstagramIcon />
            </SocialLink>
            <SocialLink href={content.brand.facebook} label="Facebook">
              <FacebookIcon />
            </SocialLink>
          </div>
        </div>
        <div className="reveal">
          <InquiryForm />
        </div>
      </div>
    </section>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  if (!href) return null;

  return (
    <TrackedLink
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      eventProperties={{ contact_method: label.toLowerCase(), location: "inquiry_section" }}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-graphite shadow-soft transition hover:-translate-y-0.5 hover:border-ink hover:text-ink"
    >
      {children}
    </TrackedLink>
  );
}

function getQrCodeUrl(value: string) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=10&data=${encodeURIComponent(value)}`;
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

function Footer({ content }: { content: SiteContent }) {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Products", href: "#products" },
    { label: "OEM/ODM", href: "#oem" },
    { label: "Specifications", href: "#specs" },
    { label: "Contact Us", href: "#inquiry" }
  ];

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <Image
        src="/images/training-set.jpg"
        width={1600}
        height={900}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.18]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#071016]/96 via-[#071016]/92 to-[#071016]/96" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/12" />

      <div className="section-shell relative z-10 py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.45fr_0.9fr_1fr_1.5fr_1.35fr]">
          <div>
            <a href="/" className="text-2xl font-black uppercase italic tracking-tight text-white sm:text-3xl">
              {content.brand.name}
            </a>
            <p className="mt-6 max-w-sm text-sm leading-7 text-white/68">
              {content.brand.name} is a professional OEM/ODM supplier for jump ropes, fitness accessories and wholesale private-label programs.
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

          <FooterColumn title="Quick Links">
            {quickLinks.map((link) => (
              <a key={link.label} href={link.href} className="footer-link">
                {link.label}
              </a>
            ))}
          </FooterColumn>

          <FooterColumn title="Products">
            {products.map((product) => (
              <a key={product.name} href="#products" className="footer-link">
                {product.name}
              </a>
            ))}
          </FooterColumn>

          <FooterColumn title="Contact Us">
            <div className="grid gap-3 text-sm leading-6 text-white/70">
              <TrackedLink
                href={`mailto:${content.brand.email}`}
                eventProperties={{ contact_method: "email", location: "footer" }}
                className="transition hover:text-white"
              >
                Email: {content.brand.email}
              </TrackedLink>
              <TrackedLink
                href={getWhatsAppHref(undefined, content.brand.whatsapp)}
                target="_blank"
                rel="noreferrer"
                eventProperties={{ contact_method: "whatsapp", location: "footer" }}
                className="transition hover:text-white"
              >
                WhatsApp: {content.brand.whatsapp}
              </TrackedLink>
              <p>OEM Service: Custom logo, color, packaging and bulk production support.</p>
              <p>Global shipping support for wholesale buyers.</p>
            </div>
          </FooterColumn>

          <FooterColumn title="Newsletter">
            <p className="text-sm leading-6 text-white/70">Subscribe to get product updates and OEM supply notes.</p>
            <form className="mt-5 grid gap-3">
              <label className="sr-only" htmlFor="footer-email">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="Your email address"
                className="h-11 rounded-[8px] border border-white/14 bg-white px-4 text-sm text-ink outline-none transition placeholder:text-graphite/70 focus:border-ocean"
              />
              <button
                type="button"
                className="h-11 rounded-[8px] bg-ocean px-5 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#1671c9]"
              >
                Subscribe
              </button>
            </form>
          </FooterColumn>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-white/56">
          © 2026 {content.brand.name}. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
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
      eventProperties={{ contact_method: label.toLowerCase(), location: "footer" }}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-white/8 text-white/82 transition hover:-translate-y-0.5 hover:border-ocean hover:bg-ocean hover:text-white"
    >
      {children}
    </TrackedLink>
  );
}
