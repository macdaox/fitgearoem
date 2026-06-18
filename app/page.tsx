import Image from "next/image";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Barcode,
  BookOpen,
  Boxes,
  Building2,
  ChevronRight,
  CheckCircle2,
  ClipboardCheck,
  Cog,
  Download,
  Factory,
  FileText,
  Globe2,
  Handshake,
  Mail,
  MessageCircle,
  PackageCheck,
  Palette,
  Ruler,
  ShieldCheck,
  Ship,
  Search,
  Truck,
  UsersRound,
  Wrench,
} from "lucide-react";
import { InquiryForm } from "@/components/InquiryForm";
import { ScrollAnimations } from "@/components/ScrollAnimations";
import { TrackedLink } from "@/components/TrackedLink";
import { getSiteContent, type HomeIconName, type SiteContent } from "@/lib/site-content";
import { getWhatsAppHref } from "@/lib/site-data";

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

const heroBadges = ["Low MOQ", "OEM / ODM Available", "Fast Sample Service", "15-25 Days Lead Time"];

const oemServiceItems = [
  { label: "Custom Logo", icon: BadgeCheck },
  { label: "Custom Color", icon: Palette },
  { label: "Product Design", icon: Ruler },
  { label: "Private Mold", icon: Wrench },
  { label: "Retail Packaging", icon: Boxes },
  { label: "Amazon Packaging", icon: PackageCheck },
  { label: "Instruction Manual", icon: BookOpen },
  { label: "Barcode Label", icon: Barcode },
  { label: "Quality Testing", icon: ShieldCheck }
];

const buyerTypes = ["Fitness Brands", "Amazon Sellers", "Distributors", "Gym Chains", "Sports Stores", "Boxing Clubs"];

const shippingMethods = ["FOB", "EXW", "DDP", "Sea Freight", "Air Freight", "Express"];

export default async function Home() {
  const content = await getSiteContent();

  return (
    <main className="overflow-hidden">
      <ScrollAnimations />
      <Header content={content} />
      <Hero content={content} />
      <FactoryShowcase content={content} />
      <OemServiceBand content={content} />
      <ProductSeries content={content} />
      <ProductCollections content={content} />
      <TrustPanels />
      <ServiceProcess content={content} />
      <InquirySection content={content} />
      <Footer content={content} />
    </main>
  );
}

function Header({ content }: { content: SiteContent }) {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#071016]/80 px-4 backdrop-blur-xl">
      <nav className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between gap-5">
        <a href="/" className="grid leading-none text-white">
          <span className="text-2xl font-black uppercase italic tracking-tight">
            {content.brand.name.split(" ")[0]} <span className="text-[#1d82ff]">OEM</span>
          </span>
          <span className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-white/75">Fitness Equipment Manufacturer</span>
        </a>
        <div className="hidden items-center gap-7 text-xs font-bold uppercase tracking-[0.04em] text-white/75 lg:flex">
          <a href="/" className="border-b-2 border-[#1d82ff] py-6 text-white">
            Home
          </a>
          <a href="#products" className="py-6 transition hover:text-white">
            Products
          </a>
          <a href="#oem" className="py-6 transition hover:text-white">
            OEM / ODM Service
          </a>
          <a href="#factory" className="py-6 transition hover:text-white">
            Factory
          </a>
          <a href="/about" className="py-6 transition hover:text-white">
            About Us
          </a>
          <a href="#inquiry" className="py-6 transition hover:text-white">
            Contact Us
          </a>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="#inquiry"
            className="hidden h-10 items-center gap-2 rounded-[6px] bg-[#0d7cff] px-4 text-xs font-bold uppercase text-white shadow-[0_10px_24px_rgba(13,124,255,0.25)] transition hover:bg-[#006be6] sm:inline-flex"
          >
            Get Factory Quote
          </a>
          <a
            href="#products"
            className="hidden h-10 items-center gap-2 rounded-[6px] border border-white/28 px-4 text-xs font-bold uppercase text-white transition hover:border-white sm:inline-flex"
          >
            Download Catalog
          </a>
          <a
            href="#inquiry"
            className="inline-flex h-10 items-center gap-2 rounded-[6px] bg-[#0d7cff] px-3 text-xs font-bold uppercase text-white sm:hidden"
          >
            Quote
            <ChevronRight size={16} />
          </a>
        </div>
      </nav>
    </header>
  );
}

function Hero({ content }: { content: SiteContent }) {
  return (
    <section className="relative min-h-screen bg-[#071016] text-white">
      <Image
        src={content.hero.image}
        width={1672}
        height={941}
        priority
        alt="OEM jump rope and fitness product hero display"
        className="hero-product absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: content.hero.imagePosition }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,16,22,0.96),rgba(7,16,22,0.74)_42%,rgba(7,16,22,0.12)_76%,rgba(7,16,22,0.28))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,rgba(13,124,255,0.12),transparent_34%)]" />
      <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#071016] via-[#071016]/70 to-transparent" />

      <div className="section-shell relative z-10 flex min-h-screen items-center pb-36 pt-28 lg:pt-24">
        <div className="max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#48a5ff]">{content.hero.eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black uppercase leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Build your fitness brand{" "}
            <span className="text-[#1d82ff]">with factory-direct manufacturing</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg font-medium leading-8 text-white/80">
            OEM / ODM jump ropes, kids ropes, massage guns and fitness accessories for wholesale buyers.
          </p>
          <div className="mt-6 grid max-w-xl grid-cols-2 gap-3 text-sm font-semibold text-white/80 sm:grid-cols-4">
            {heroBadges.map((badge) => (
              <span key={badge} className="inline-flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#1d82ff]" />
                {badge}
              </span>
            ))}
          </div>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#inquiry"
              className="inline-flex h-[52px] items-center justify-center gap-3 rounded-[6px] bg-[#0d7cff] px-7 text-sm font-bold uppercase text-white shadow-[0_12px_30px_rgba(13,124,255,0.28)] transition hover:bg-[#006be6]"
            >
              Get Factory Quote
              <ArrowRight size={18} />
            </a>
            <a
              href="#products"
              className="inline-flex h-[52px] items-center justify-center gap-3 rounded-[6px] border border-white/30 bg-white/5 px-7 text-sm font-bold uppercase text-white backdrop-blur transition hover:border-white hover:bg-white/10"
            >
              Download Catalog
              <Download size={17} />
            </a>
          </div>
        </div>
      </div>

      <FloatingContact content={content} />
      <HomeStats content={content} />
    </section>
  );
}

function HomeStats({ content }: { content: SiteContent }) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-30 translate-y-1/2">
      <div className="section-shell">
        <div className="mx-auto overflow-hidden rounded-[8px] border border-white/10 bg-[#08141d]/95 shadow-[0_22px_52px_rgba(6,14,20,0.24)] backdrop-blur-xl">
          <div className="grid grid-cols-2 divide-x-0 divide-y divide-white/10 sm:grid-cols-3 lg:grid-cols-6 lg:divide-x lg:divide-y-0">
            {content.homeStats.items.map((item, index) => {
              const Icon = homeIcons[item.icon] || BadgeCheck;
              return (
                <div key={`${item.label}-${index}`} className="flex min-h-24 items-center justify-center gap-3 px-4 py-5 text-left lg:min-h-28 xl:gap-4 xl:px-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center text-white">
                    <Icon size={32} strokeWidth={1.65} />
                  </div>
                  <div>
                    <p className="whitespace-nowrap text-xl font-black leading-none text-white xl:text-2xl">{item.value}</p>
                    <p className="mt-1 whitespace-nowrap text-[0.72rem] font-medium leading-5 text-white/70 xl:text-xs">{item.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function FactoryShowcase({ content }: { content: SiteContent }) {
  const factoryFeatures = content.factoryShowcase.features.slice(0, 4);

  return (
    <section id="factory" className="bg-[#f4f7fb] pb-7 pt-24 lg:pt-28">
      <div className="section-shell">
        <div className="grid gap-5 rounded-[8px] border border-line bg-white p-5 shadow-soft lg:grid-cols-[0.52fr_1.48fr]">
          <div className="reveal flex flex-col justify-center rounded-[8px] bg-white p-1 lg:p-0">
            <p className="text-[0.7rem] font-black uppercase tracking-[0.12em] text-[#0d7cff]">Our Factory</p>
            <h2 className="mt-3 text-2xl font-black uppercase leading-[1.1] tracking-tight text-[#081422] sm:text-3xl">
              Built for quality.
              <br />
              Made for your brand.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-graphite">
              FitGear OEM is a professional manufacturer with complete production capability, strict quality control and fast delivery support for business growth.
            </p>
            <div className="mt-5 grid gap-2.5">
              {factoryFeatures.map((item) => {
                const Icon = homeIcons[item.icon] || BadgeCheck;
                return (
                  <div key={item.title} className="grid grid-cols-[auto_1fr] items-center gap-2 text-sm">
                    <Icon size={17} className="text-[#0d7cff]" strokeWidth={2} />
                    <h3 className="font-semibold leading-5 text-[#081422]">{item.title}</h3>
                  </div>
                );
              })}
            </div>
            <a
              href="/about"
              className="mt-6 inline-flex h-10 w-fit items-center justify-center gap-3 rounded-[6px] bg-[#0d7cff] px-5 text-xs font-black uppercase text-white transition hover:bg-[#006be6]"
            >
              View Factory Tour
              <ChevronRight size={16} />
            </a>
          </div>

          <div className="reveal grid gap-2">
            <div className="relative overflow-hidden rounded-[8px]">
              <Image
                src={content.factoryShowcase.backgroundImage}
                width={1400}
                height={560}
                alt="Factory building and production capability"
                className="aspect-[3.25/1] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent" />
            </div>
            <div className="grid gap-2 sm:grid-cols-4">
              {content.factoryShowcase.images.map((item) => (
                <article key={item.title} className="group relative overflow-hidden rounded-[8px] bg-ink">
                  <Image
                    src={item.image}
                    width={520}
                    height={320}
                    alt={`${item.title} factory photo`}
                    className="aspect-[1.55/1] w-full object-cover opacity-90 transition duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent px-4 pb-3 pt-10">
                    <h3 className="text-sm font-bold text-white">{item.title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
      </div>
      </div>
    </section>
  );
}

function OemServiceBand({ content }: { content: SiteContent }) {
  return (
    <section id="oem" className="bg-[#f4f7fb] pb-7">
      <div className="section-shell">
        <div className="grid overflow-hidden rounded-[8px] border border-line bg-white shadow-soft lg:grid-cols-[1.45fr_0.85fr]">
          <div className="reveal p-5 sm:p-7">
            <p className="text-sm font-black uppercase tracking-[0.04em] text-[#081422]">One-stop OEM / ODM Service</p>
            <div className="mt-5 grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-9">
              {oemServiceItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="grid justify-items-center gap-2 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[8px] border border-line bg-[#f7faff] text-[#0d7cff]">
                      <Icon size={23} strokeWidth={1.8} />
                    </div>
                    <p className="text-[0.68rem] font-semibold leading-4 text-[#081422]">{item.label}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold text-[#081422]">
              {["Low MOQ", "Fast Sample", "15-25 Days Lead Time", "Flexible Payment Terms"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0d7cff]" />
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="relative min-h-64 overflow-hidden bg-[#eaf0f7]">
            <Image
              src={content.oem.image}
              width={900}
              height={560}
              alt="OEM jump rope packaging and product customization"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductSeries({ content }: { content: SiteContent }) {
  return (
    <section id="products" className="bg-[#f4f7fb] pb-7">
      <div className="section-shell">
        <div className="reveal text-center">
          <h2 className="text-2xl font-black uppercase tracking-tight text-[#081422]">{content.homeProducts.categoriesTitle}</h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-[#0d7cff]" />
        </div>

        <div className="mt-6 grid gap-2 md:grid-cols-3 xl:grid-cols-5">
          {content.homeProducts.categories.map((product) => (
            <article key={product.name} className="reveal group relative overflow-hidden rounded-[8px] bg-[#071016] shadow-soft">
              <Image
                src={product.image}
                width={900}
                height={700}
                alt={`${product.name} product photo`}
                className="aspect-[1.45/1] w-full object-cover opacity-80 transition duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071016] via-[#071016]/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="text-lg font-black uppercase text-white">{product.name}</h3>
                <p className="mt-1 line-clamp-1 text-xs text-white/70">{product.description}</p>
                <a href="#inquiry" className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase text-[#48a5ff]">
                  View More
                  <ArrowRight size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCollections({ content }: { content: SiteContent }) {
  return (
    <section className="bg-[#f4f7fb] pb-7">
      <div className="section-shell grid items-stretch gap-5 lg:grid-cols-2">
        <ProductGridPanel
          title={content.homeProducts.featuredTitle}
          items={content.homeProducts.featuredItems}
          action={content.homeProducts.featuredAction}
        />
        <ProductGridPanel
          title={content.homeProducts.kidsTitle}
          items={content.homeProducts.kidsItems}
          action={content.homeProducts.kidsAction}
        />
      </div>
    </section>
  );
}

function ProductGridPanel({
  title,
  items,
  action
}: {
  title: string;
  items: Array<{ name: string; code?: string; image: string }>;
  action: string;
}) {
  const placeholders = Array.from({ length: Math.max(0, 5 - items.length) });

  return (
    <section className="reveal flex h-full flex-col rounded-[8px] border border-line bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-black uppercase text-[#081422]">{title}</h2>
        <a href="#inquiry" className="inline-flex items-center gap-2 text-xs font-black uppercase text-[#0d7cff]">
          {action}
          <ArrowRight size={14} />
        </a>
      </div>
      <div className="mt-5 grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
        {items.map((item) => (
          <article
            key={item.name}
            className="flex min-h-[17rem] flex-col overflow-hidden rounded-[8px] border border-line bg-[#f8fafc] text-center transition hover:-translate-y-1 hover:shadow-soft"
          >
            <div className="h-40 w-full bg-white">
              <Image src={item.image} width={420} height={320} alt={`${item.name} product`} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-1 flex-col justify-end p-3">
              <h3 className="flex min-h-16 items-center justify-center text-sm font-bold leading-5 text-[#081422]">{item.name}</h3>
              <p className="mt-1 min-h-5 text-xs font-semibold text-graphite">{item.code || "OEM"}</p>
            </div>
          </article>
        ))}
        {placeholders.map((_, index) => (
          <div key={`placeholder-${index}`} aria-hidden="true" className="hidden rounded-[8px] border border-transparent xl:block" />
        ))}
      </div>
    </section>
  );
}

function TrustPanels() {
  return (
    <section className="bg-[#f4f7fb] pb-7">
      <div className="section-shell grid gap-5 lg:grid-cols-3">
        <article className="reveal rounded-[8px] border border-line bg-white p-6 shadow-soft">
          <h2 className="text-lg font-black uppercase text-[#081422]">Trusted by Global Buyers</h2>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {buyerTypes.map((type) => (
              <div key={type} className="grid justify-items-center gap-2 rounded-[8px] bg-[#f8fafc] p-3 text-center">
                <UsersRound size={23} className="text-[#0d7cff]" />
                <p className="text-[0.68rem] font-bold leading-4 text-[#081422]">{type}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-6 text-graphite">We have long-term cooperation with customers from 100+ countries around the world.</p>
        </article>

        <article className="reveal rounded-[8px] border border-line bg-white p-6 shadow-soft">
          <h2 className="text-lg font-black uppercase text-[#081422]">Certifications</h2>
          <div className="mt-6 grid grid-cols-4 gap-3">
            {["ISO", "BSCI", "CE", "RoHS"].map((cert) => (
              <div key={cert} className="flex h-16 items-center justify-center rounded-[8px] border border-line bg-[#f8fafc] text-xl font-black text-[#081422]">
                {cert}
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-6 text-graphite">Products meet international quality standards and can support export documentation needs.</p>
        </article>

        <article className="reveal relative overflow-hidden rounded-[8px] border border-line bg-white p-6 shadow-soft">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#eaf3ff] to-transparent" />
          <div className="pointer-events-none absolute -bottom-16 -right-14 h-48 w-48 rounded-full bg-[#0d7cff]/10 blur-2xl" />
          <Ship className="pointer-events-none absolute bottom-7 right-7 text-[#0d7cff]/10" size={150} strokeWidth={1.4} />
          <div className="relative z-10">
            <h2 className="text-lg font-black uppercase text-[#081422]">Global Shipping</h2>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {shippingMethods.map((method) => (
                <div key={method} className="grid justify-items-center gap-2 rounded-[8px] bg-white/90 p-3 text-center">
                  <Ship size={23} className="text-[#0d7cff]" />
                  <p className="text-xs font-bold text-[#081422]">{method}</p>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function FloatingContact({ content }: { content: SiteContent }) {
  return (
    <div className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 overflow-hidden rounded-[8px] bg-[#0d7cff] shadow-[0_18px_40px_rgba(13,124,255,0.26)] lg:block">
      <TrackedLink
        href={getWhatsAppHref(undefined, content.brand.whatsapp)}
        target="_blank"
        rel="noreferrer"
        eventProperties={{ contact_method: "whatsapp", location: "floating_contact" }}
        className="flex w-20 flex-col items-center gap-1 border-b border-white/20 px-3 py-4 text-xs font-bold text-white transition hover:bg-white/10"
      >
        <MessageCircle size={22} />
        WhatsApp
      </TrackedLink>
      <TrackedLink
        href={`mailto:${content.brand.email}`}
        eventProperties={{ contact_method: "email", location: "floating_contact" }}
        className="flex w-20 flex-col items-center gap-1 border-b border-white/20 px-3 py-4 text-xs font-bold text-white transition hover:bg-white/10"
      >
        <Mail size={22} />
        Email
      </TrackedLink>
      <a href="#inquiry" className="flex w-20 flex-col items-center gap-1 px-3 py-4 text-xs font-bold text-white transition hover:bg-white/10">
        <FileText size={22} />
        Get Quote
      </a>
    </div>
  );
}

function ServiceProcess({ content }: { content: SiteContent }) {
  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="section-shell">
        <div className="reveal mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-black uppercase leading-tight tracking-[0.02em] text-[#081422] sm:text-3xl">
            {content.serviceProcess.title}
          </h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-[#0d7cff]" />
        </div>

        <div className="mt-12 hidden grid-cols-5 items-start gap-10 lg:grid">
          {content.serviceProcess.steps.map((step, index) => (
            <div key={`${step.number}-${step.title}`} className="relative">
              <ProcessStep step={step} />
              {index < content.serviceProcess.steps.length - 1 ? (
                <div className="absolute left-[calc(100%+0.9rem)] top-8 flex h-16 -translate-y-1/2 items-center justify-center text-[#0d7cff]">
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
                <div className="h-3 w-3 rounded-full bg-[#0d7cff]" />
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
        className={`flex h-16 w-16 items-center justify-center text-[#0d7cff] ${
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
    { label: "Factory", href: "#factory" },
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
            <p className="mt-6 max-w-sm text-sm leading-7 text-white/70">
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
            {content.homeProducts.categories.map((product) => (
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
                className="h-11 rounded-[8px] border border-white/15 bg-white px-4 text-sm text-ink outline-none transition placeholder:text-graphite/70 focus:border-[#0d7cff]"
              />
              <button
                type="button"
                className="h-11 rounded-[8px] bg-[#0d7cff] px-5 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#006be6]"
              >
                Subscribe
              </button>
            </form>
          </FooterColumn>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-white/60">
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
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/80 transition hover:-translate-y-0.5 hover:border-[#0d7cff] hover:bg-[#0d7cff] hover:text-white"
    >
      {children}
    </TrackedLink>
  );
}
