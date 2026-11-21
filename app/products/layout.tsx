import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { getSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function ProductsLayout({ children }: { children: ReactNode }) {
  const { brand } = await getSiteContent();

  return (
    <>
      <SiteHeader brandName={brand.name} activePage="products" />
      <div className="pt-[72px]">{children}</div>
    </>
  );
}
