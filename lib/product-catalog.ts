import type { SiteContent } from "@/lib/site-content";

type CatalogGroup = "series" | "featured" | "kids";
type CatalogItem = { name: string; image: string; code?: string; description?: string };

function catalogEntries(items: CatalogItem[], group: CatalogGroup) {
  const used = new Set<string>();

  return items.map((item) => {
    const name = item.name.normalize("NFKC").toLowerCase().trim();
    const base = `${group}-${name.replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "") || "product"}`;
    let slug = base;
    for (let suffix = 2; used.has(slug); suffix += 1) {
      slug = `${base}-${suffix}`;
    }
    used.add(slug);

    return { ...item, group, slug, href: `/products/${encodeURIComponent(slug)}` };
  });
}

export function getProductCatalog({ homeProducts }: SiteContent) {
  return {
    series: catalogEntries(homeProducts.categories, "series"),
    featured: catalogEntries(homeProducts.featuredItems, "featured"),
    kids: catalogEntries(homeProducts.kidsItems, "kids")
  };
}
