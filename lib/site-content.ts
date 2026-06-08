import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { getSiteDataKv } from "@/lib/cloudflare";

export type IconName = "rotate" | "shield" | "cable" | "zap" | "badge";

export type SiteContent = {
  brand: {
    name: string;
    email: string;
    whatsapp: string;
    instagram: string;
    tiktok: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    image: string;
    imagePosition: string;
  };
  detailsIntro: {
    eyebrow: string;
    title: string;
  };
  productDetails: Array<{
    title: string;
    description: string;
    image: string;
    icon: IconName;
  }>;
  oem: {
    eyebrow: string;
    title: string;
    description: string;
    image: string;
    options: string[];
  };
  inquiry: {
    eyebrow: string;
    title: string;
    description: string;
  };
};

const contentPath = path.join(process.cwd(), ".data", "site-content.json");
const cloudflareContentKey = "site-content";

export const defaultSiteContent: SiteContent = {
  brand: {
    name: "ApexRope Supply",
    email: "sales@example.com",
    whatsapp: "15551234567",
    instagram: "https://instagram.com/",
    tiktok: "https://www.tiktok.com/"
  },
  hero: {
    eyebrow: "Wholesale Jump Rope Manufacturer",
    title: "Built for Speed. Designed for Performance.",
    description: "Professional jump ropes for fitness brands, gyms, boxing clubs and wholesale buyers.",
    image: "/images/hero-jump-rope.jpg",
    imagePosition: "68% 50%"
  },
  detailsIntro: {
    eyebrow: "Engineered Details",
    title: "Small details that make bulk products feel premium."
  },
  productDetails: [
    {
      title: "360° Bearing System",
      description: "Smooth rotation for speed training, boxing footwork and high-intensity workouts.",
      image: "/images/detail-grip.png",
      icon: "rotate"
    },
    {
      title: "Anti-slip Grip",
      description: "Textured handles designed for better control during sweaty training sessions.",
      image: "/images/speed-rope-blue.png",
      icon: "shield"
    },
    {
      title: "Adjustable Cable",
      description: "Easy to customize for different heights, training programs and retail markets.",
      image: "/images/oem-colors.png",
      icon: "cable"
    },
    {
      title: "Lightweight Speed Cable",
      description: "A responsive rope feel for gyms, boxing clubs and performance-focused brands.",
      image: "/images/pair-series.png",
      icon: "zap"
    },
    {
      title: "Recovery Product Line",
      description: "Massage guns and recovery tools for fitness retail bundles, gyms and sports wellness buyers.",
      image: "/images/Massage gun.png",
      icon: "badge"
    }
  ],
  oem: {
    eyebrow: "OEM / ODM Service",
    title: "Build your own jump rope.",
    description: "Shape a private-label rope program with coordinated colors, logo placement, accessories and retail packaging.",
    image: "/images/oem-colors.png",
    options: ["Handle Color", "Cable Type", "Logo Printing", "Retail Packaging", "Carrying Bag", "Gift Box", "Bulk Carton"]
  },
  inquiry: {
    eyebrow: "Wholesale Inquiry",
    title: "Get wholesale quote.",
    description: "Share your product interest, quantity and customization needs. Our sales team will prepare a focused quote."
  }
};

export async function getSiteContent(): Promise<SiteContent> {
  const kv = await getSiteDataKv();
  if (kv) {
    const raw = await kv.get(cloudflareContentKey);
    if (raw) {
      return mergeContent(defaultSiteContent, JSON.parse(raw) as Partial<SiteContent>);
    }
    return defaultSiteContent;
  }

  try {
    const raw = await readFile(contentPath, "utf8");
    return mergeContent(defaultSiteContent, JSON.parse(raw) as Partial<SiteContent>);
  } catch {
    return defaultSiteContent;
  }
}

export async function saveSiteContent(content: SiteContent) {
  const kv = await getSiteDataKv();
  const normalizedContent = mergeContent(defaultSiteContent, content);

  if (kv) {
    await kv.put(cloudflareContentKey, JSON.stringify(normalizedContent));
    return;
  }

  await mkdir(path.dirname(contentPath), { recursive: true });
  await writeFile(contentPath, JSON.stringify(normalizedContent, null, 2));
}

function mergeContent(defaults: SiteContent, value: Partial<SiteContent>): SiteContent {
  return {
    brand: { ...defaults.brand, ...value.brand },
    hero: { ...defaults.hero, ...value.hero },
    detailsIntro: { ...defaults.detailsIntro, ...value.detailsIntro },
    productDetails: normalizeDetails(value.productDetails, defaults.productDetails),
    oem: {
      ...defaults.oem,
      ...value.oem,
      options: value.oem?.options?.length ? value.oem.options : defaults.oem.options
    },
    inquiry: { ...defaults.inquiry, ...value.inquiry }
  };
}

function normalizeDetails(value: SiteContent["productDetails"] | undefined, defaults: SiteContent["productDetails"]) {
  return defaults.map((item, index) => ({
    ...item,
    ...(value?.[index] || {})
  }));
}
