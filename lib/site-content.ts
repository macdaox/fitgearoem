import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { getSiteDataKv } from "@/lib/cloudflare";
import { readR2Json, writeR2Json } from "@/lib/r2-data-store";

export type IconName = "rotate" | "shield" | "cable" | "zap" | "badge";
export type HomeIconName =
  | "factory"
  | "lines"
  | "workers"
  | "warehouse"
  | "globe"
  | "delivery"
  | "search"
  | "quotation"
  | "sample"
  | "production"
  | "truck";

export type SiteContent = {
  brand: {
    name: string;
    email: string;
    whatsapp: string;
    instagram: string;
    tiktok: string;
    facebook: string;
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
  homeStats: {
    eyebrow: string;
    items: Array<{
      value: string;
      label: string;
      icon: HomeIconName;
    }>;
  };
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
  serviceProcess: {
    title: string;
    steps: Array<{
      number: string;
      title: string;
      description: string;
      icon: HomeIconName;
    }>;
  };
  factoryShowcase: {
    eyebrow: string;
    title: string;
    backgroundImage: string;
    buttonText: string;
    features: Array<{
      title: string;
      description: string;
      icon: HomeIconName;
    }>;
    images: Array<{
      title: string;
      image: string;
    }>;
  };
  about: {
    eyebrow: string;
    title: string;
    description: string;
    heroImage: string;
    imagePosition: string;
    primaryCta: string;
    secondaryCta: string;
    introEyebrow: string;
    introTitle: string;
    introText: string;
    capabilitiesEyebrow: string;
    capabilitiesTitle: string;
    factoryEyebrow: string;
    factoryTitle: string;
    factoryText: string;
    factoryImage: string;
    processSteps: string[];
    valuesEyebrow: string;
    valuesTitle: string;
    stats: Array<{
      value: string;
      label: string;
    }>;
    capabilities: Array<{
      title: string;
      description: string;
    }>;
    values: string[];
    ctaEyebrow: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaButton: string;
  };
};

const contentPath = path.join(process.cwd(), ".data", "site-content.json");
const cloudflareContentKey = "site-content";
const r2ContentKey = "data/site-content.json";
const siteContentCacheMs = 30_000;

let cachedSiteContent: { content: SiteContent; expiresAt: number } | null = null;

export const defaultSiteContent: SiteContent = {
  brand: {
    name: "ApexRope Supply",
    email: "sales@example.com",
    whatsapp: "15551234567",
    instagram: "https://instagram.com/",
    tiktok: "https://www.tiktok.com/",
    facebook: "https://www.facebook.com/"
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
  homeStats: {
    eyebrow: "Factory Strength",
    items: [
      { value: "50,000+ m²", label: "Factory Area", icon: "factory" },
      { value: "20+", label: "Production Lines", icon: "lines" },
      { value: "300+", label: "Skilled Workers", icon: "workers" },
      { value: "100,000+ m²", label: "Warehouse Area", icon: "warehouse" },
      { value: "100+", label: "Countries Served", icon: "globe" },
      { value: "98%", label: "On-Time Delivery", icon: "delivery" }
    ]
  },
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
  },
  serviceProcess: {
    title: "Our Service Process",
    steps: [
      { number: "01", title: "Inquiry", description: "Tell us your requirements and ideas.", icon: "search" },
      { number: "02", title: "Quotation", description: "We provide a detailed quotation.", icon: "quotation" },
      { number: "03", title: "Sample", description: "Sample making and confirmation.", icon: "sample" },
      { number: "04", title: "Production", description: "Mass production with strict quality control.", icon: "production" },
      { number: "05", title: "Delivery", description: "On-time delivery and after-sales support.", icon: "truck" }
    ]
  },
  factoryShowcase: {
    eyebrow: "Why Choose",
    title: "Why choose ApexRope?",
    backgroundImage: "/images/training-set.jpg",
    buttonText: "About Us",
    features: [
      {
        title: "Advanced Production",
        description: "Automated equipment and mature technology support efficient, stable output.",
        icon: "production"
      },
      {
        title: "Strict Quality Control",
        description: "Full inspection from material preparation to finished products.",
        icon: "delivery"
      },
      {
        title: "Large Production Capacity",
        description: "Flexible production planning for bulk orders and repeat purchasing.",
        icon: "lines"
      },
      {
        title: "Experienced Team",
        description: "Sales, sampling and QC support for overseas wholesale buyers.",
        icon: "workers"
      },
      {
        title: "Global Partners",
        description: "Export-ready communication and shipping support for international buyers.",
        icon: "globe"
      }
    ],
    images: [
      { title: "Injection Workshop", image: "/images/training-set.jpg" },
      { title: "Assembly Line", image: "/images/oem-colors.png" },
      { title: "Warehouse", image: "/images/product-pack.jpg" },
      { title: "Shipping", image: "/images/pair-series.jpg" }
    ]
  },
  about: {
    eyebrow: "About Us",
    title: "Fitness supply built for brands that move fast.",
    description:
      "We support overseas buyers with custom jump ropes, recovery tools, OEM packaging and export-ready production coordination.",
    heroImage: "/images/training-set.jpg",
    imagePosition: "50% 50%",
    primaryCta: "Start a Project",
    secondaryCta: "WhatsApp",
    introEyebrow: "Who We Are",
    introTitle: "A practical manufacturing partner for fitness products.",
    introText:
      "Our work focuses on helping fitness brands, importers, gyms and online retailers build reliable product programs. From product selection and sampling to color matching, logo placement, packaging and shipment preparation, we keep the process clear and production-focused.",
    capabilitiesEyebrow: "Capabilities",
    capabilitiesTitle: "Designed around practical wholesale workflows.",
    factoryEyebrow: "How We Work",
    factoryTitle: "From sample to repeat orders.",
    factoryText:
      "We combine product development support with stable factory coordination, helping buyers move from a first sample to bulk production with fewer surprises. Each order can be adjusted around market positioning, target price, packaging format and delivery schedule.",
    factoryImage: "/images/oem-colors.png",
    processSteps: ["Sample confirmation", "Bulk production details", "Export-ready shipment"],
    valuesEyebrow: "Our Standard",
    valuesTitle: "Simple principles for long-term B2B work.",
    stats: [
      { value: "OEM", label: "Logo, color and packaging support" },
      { value: "B2B", label: "Built for wholesale buyers" },
      { value: "Global", label: "Export-ready communication" }
    ],
    capabilities: [
      {
        title: "Product sourcing and development",
        description: "Jump ropes, fitness accessories and recovery products selected around your target market."
      },
      {
        title: "Private-label customization",
        description: "Custom colors, logo placement, packaging, gift boxes and retail-ready sets."
      },
      {
        title: "Sampling and production follow-up",
        description: "Clear sample confirmation, bulk order details and export coordination."
      }
    ],
    values: ["Clear communication", "Stable quality control", "Flexible OEM options", "Export-minded service"],
    ctaEyebrow: "Wholesale Inquiry",
    ctaTitle: "Build your next fitness product line with us.",
    ctaDescription: "Tell us your product direction, quantity and customization needs. We will help turn it into a practical supply plan.",
    ctaButton: "Send Inquiry"
  }
};

export async function getSiteContent(): Promise<SiteContent> {
  if (cachedSiteContent && cachedSiteContent.expiresAt > Date.now()) {
    return cachedSiteContent.content;
  }

  const content = await readSiteContent();
  cachedSiteContent = {
    content,
    expiresAt: Date.now() + siteContentCacheMs
  };

  return content;
}

async function readSiteContent(): Promise<SiteContent> {
  const kv = await getSiteDataKv();
  if (kv) {
    const raw = await kv.get(cloudflareContentKey);
    if (raw) {
      return mergeContent(defaultSiteContent, JSON.parse(raw) as Partial<SiteContent>);
    }
    return defaultSiteContent;
  }

  const r2Content = await readR2Json<Partial<SiteContent>>(r2ContentKey);
  if (r2Content) {
    return mergeContent(defaultSiteContent, r2Content);
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
    updateSiteContentCache(normalizedContent);
    return;
  }

  if (await writeR2Json(r2ContentKey, normalizedContent)) {
    updateSiteContentCache(normalizedContent);
    return;
  }

  await mkdir(path.dirname(contentPath), { recursive: true });
  await writeFile(contentPath, JSON.stringify(normalizedContent, null, 2));
  updateSiteContentCache(normalizedContent);
}

function updateSiteContentCache(content: SiteContent) {
  cachedSiteContent = {
    content,
    expiresAt: Date.now() + siteContentCacheMs
  };
}

function mergeContent(defaults: SiteContent, value: Partial<SiteContent>): SiteContent {
  return {
    brand: { ...defaults.brand, ...value.brand },
    hero: { ...defaults.hero, ...value.hero },
    detailsIntro: { ...defaults.detailsIntro, ...value.detailsIntro },
    productDetails: normalizeDetails(value.productDetails, defaults.productDetails),
    homeStats: {
      ...defaults.homeStats,
      ...value.homeStats,
      items: normalizeObjectList(value.homeStats?.items, defaults.homeStats.items)
    },
    oem: {
      ...defaults.oem,
      ...value.oem,
      options: value.oem?.options?.length ? value.oem.options : defaults.oem.options
    },
    inquiry: { ...defaults.inquiry, ...value.inquiry },
    serviceProcess: {
      ...defaults.serviceProcess,
      ...value.serviceProcess,
      steps: normalizeObjectList(value.serviceProcess?.steps, defaults.serviceProcess.steps)
    },
    factoryShowcase: {
      ...defaults.factoryShowcase,
      ...value.factoryShowcase,
      features: normalizeObjectList(value.factoryShowcase?.features, defaults.factoryShowcase.features),
      images: normalizeObjectList(value.factoryShowcase?.images, defaults.factoryShowcase.images)
    },
    about: {
      ...defaults.about,
      ...value.about,
      stats: normalizeObjectList(value.about?.stats, defaults.about.stats),
      capabilities: normalizeObjectList(value.about?.capabilities, defaults.about.capabilities),
      processSteps: value.about?.processSteps?.length ? value.about.processSteps : defaults.about.processSteps,
      values: value.about?.values?.length ? value.about.values : defaults.about.values
    }
  };
}

function normalizeDetails(value: SiteContent["productDetails"] | undefined, defaults: SiteContent["productDetails"]) {
  return defaults.map((item, index) => ({
    ...item,
    ...(value?.[index] || {})
  }));
}

function normalizeObjectList<T extends Record<string, string>>(value: T[] | undefined, defaults: T[]) {
  if (!value?.length) return defaults;
  return value.map((item, index) => ({
    ...(defaults[index] || defaults[0]),
    ...item
  }));
}
