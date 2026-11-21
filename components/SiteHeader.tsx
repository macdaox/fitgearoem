import { ChevronRight } from "lucide-react";

export function SiteHeader({ brandName, activePage }: { brandName: string; activePage: "home" | "products" }) {
  const isHome = activePage === "home";
  const homeSection = isHome ? "#" : "/#";
  const quoteHref = `${homeSection}inquiry`;
  const activeClass = "border-b-2 border-[#1d82ff] py-6 text-white";
  const linkClass = "py-6 transition hover:text-white";

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#071016]/80 px-4 backdrop-blur-xl">
      <nav aria-label="Main navigation" className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between gap-5">
        <a href="/" className="grid leading-none text-white">
          <span className="text-2xl font-black uppercase italic tracking-tight">
            {brandName.split(" ")[0]} <span className="text-[#1d82ff]">OEM</span>
          </span>
          <span className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-white/75">Fitness Equipment Manufacturer</span>
        </a>
        <div className="hidden items-center gap-7 text-xs font-bold uppercase tracking-[0.04em] text-white/75 lg:flex">
          <a href="/" aria-current={isHome ? "page" : undefined} className={isHome ? activeClass : linkClass}>
            Home
          </a>
          <a href="/products" aria-current={!isHome ? "true" : undefined} className={!isHome ? activeClass : linkClass}>
            Products
          </a>
          <a href={`${homeSection}oem`} className="py-6 transition hover:text-white">
            OEM / ODM Service
          </a>
          <a href={`${homeSection}factory`} className="py-6 transition hover:text-white">
            Factory
          </a>
          <a href="/about" className="py-6 transition hover:text-white">
            About Us
          </a>
          <a href={quoteHref} className="py-6 transition hover:text-white">
            Contact Us
          </a>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={quoteHref}
            className="hidden h-10 items-center gap-2 rounded-[6px] bg-[#0d7cff] px-4 text-xs font-bold uppercase text-white shadow-[0_10px_24px_rgba(13,124,255,0.25)] transition hover:bg-[#006be6] sm:inline-flex"
          >
            Get Factory Quote
          </a>
          <a
            href="/products"
            className="hidden h-10 items-center gap-2 rounded-[6px] border border-white/28 px-4 text-xs font-bold uppercase text-white transition hover:border-white sm:inline-flex"
          >
            Product Catalog
          </a>
          <a
            href={quoteHref}
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
