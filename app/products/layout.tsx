import Link from "next/link";
import type { ReactNode } from "react";
import { getSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function ProductsLayout({ children }: { children: ReactNode }) {
  const { brand } = await getSiteContent();

  return (
    <>
      <header className="bg-[#071016] text-white">
        <nav aria-label="Main navigation" className="section-shell flex min-h-[72px] flex-wrap items-center justify-between gap-3 py-3">
          <Link href="/" className="text-xl font-black uppercase italic tracking-tight sm:text-2xl">
            {brand.name.split(" ")[0]} <span className="text-[#48a5ff]">OEM</span>
          </Link>
          <div className="flex items-center gap-4 text-xs font-bold uppercase sm:gap-7">
            <Link href="/" className="text-white/75 hover:text-white">Home</Link>
            <Link href="/products" className="text-[#48a5ff] hover:text-white">Products</Link>
            <Link href="/#inquiry" className="rounded-md bg-[#006be6] px-3 py-2 hover:bg-[#005bbf]">Get a Quote</Link>
          </div>
        </nav>
      </header>
      {children}
    </>
  );
}
