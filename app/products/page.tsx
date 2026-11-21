import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProductCatalog } from "@/lib/product-catalog";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Product Catalog | Wholesale Fitness Equipment",
  description: "Browse our jump rope, kids fitness and recovery product ranges for wholesale and OEM orders."
};

export default async function ProductsPage() {
  const content = await getSiteContent();
  const catalog = getProductCatalog(content);
  const sections = [
    { id: "series", title: content.homeProducts.categoriesTitle, items: catalog.series },
    { id: "featured", title: content.homeProducts.featuredTitle, items: catalog.featured },
    { id: "kids", title: content.homeProducts.kidsTitle, items: catalog.kids }
  ].filter(({ items }) => items.length);

  return (
    <main className="min-h-screen bg-mist pb-16">
      <div className="bg-[#071016] py-12 text-white sm:py-16">
        <div className="section-shell">
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Product Catalog</h1>
          <nav aria-label="Product collections" className="mt-6 flex flex-wrap gap-2">
            {sections.map(({ id, title }) => (
              <a key={id} href={`#${id}`} className="rounded-md border border-white/25 px-3 py-2 text-sm font-semibold hover:bg-white/10">
                {title}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="section-shell grid gap-12 pt-10">
        {sections.map(({ id, title, items }) => (
          <section id={id} key={id} className="scroll-mt-24">
            <h2 className="text-2xl font-black tracking-tight text-ink">{title}</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((item) => (
                <Link key={item.slug} href={item.href} className="group flex flex-col overflow-hidden rounded-lg border border-line bg-white transition hover:shadow-soft">
                  <Image src={item.image} alt={item.name} width={600} height={450} sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw" className="aspect-[4/3] w-full bg-mist object-cover" />
                  <div className="flex flex-1 items-center justify-between gap-3 p-4">
                    <div>
                      <h3 className="font-bold text-ink">{item.name}</h3>
                      {item.code && <p className="mt-1 text-sm text-graphite">{item.code}</p>}
                    </div>
                    <ArrowRight aria-hidden="true" size={18} className="shrink-0 text-[#006be6] transition group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
