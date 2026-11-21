import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { InquiryForm } from "@/components/InquiryForm";
import { getProductCatalog } from "@/lib/product-catalog";
import { getSiteContent } from "@/lib/site-content";

type ProductPageProps = { params: Promise<{ slug: string }> };

async function getProduct(slug: string) {
  const content = await getSiteContent();
  const catalog = getProductCatalog(content);
  const product = [...catalog.series, ...catalog.featured, ...catalog.kids].find((item) => item.slug === slug);
  if (!product) notFound();

  return { content, product };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { product } = await getProduct((await params).slug);
  return {
    title: `${product.name} | Wholesale Products`,
    description: product.description || `Request a wholesale quote for ${product.name}.`
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { content, product } = await getProduct((await params).slug);
  const categories = content.homeProducts.categories.map(({ name }) => name);

  return (
    <main className="min-h-screen bg-mist py-8 sm:py-12">
      <div className="section-shell">
        <Link href={`/products#${product.group}`} className="inline-flex items-center gap-2 text-sm font-bold text-[#006be6] hover:underline">
          <ArrowLeft aria-hidden="true" size={16} />
          Back to Product Catalog
        </Link>
        <div className="mt-5 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="overflow-hidden rounded-lg border border-line bg-white">
            <Image src={product.image} alt={product.name} width={900} height={750} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[6/5] w-full object-contain" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">{product.name}</h1>
            {product.code && <p className="mt-2 text-sm font-semibold text-graphite">Model {product.code}</p>}
            {product.description && <p className="mt-4 whitespace-pre-line text-base leading-7 text-graphite">{product.description}</p>}
            <section className="mt-6 rounded-lg border border-line bg-white p-5 shadow-soft">
              <h2 className="mb-4 text-lg font-bold text-ink">Request a Wholesale Quote</h2>
              <InquiryForm
                compact
                categories={categories}
                initialCategory={product.group === "series" ? product.name.trim() : undefined}
                initialProductType={product.name}
              />
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
