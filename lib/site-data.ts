import {
  BadgeCheck,
  Boxes,
  Cable,
  Factory,
  Globe2,
  PackageCheck,
  Palette,
  Rotate3D,
  ShieldCheck,
  Sparkles,
  Zap
} from "lucide-react";

export const brand = {
  name: "ApexRope Supply",
  email: "sales@example.com",
  instagram: "https://instagram.com/",
  tiktok: "https://www.tiktok.com/"
};

export const productDetails = [
  {
    title: "360° Bearing System",
    description: "Smooth rotation for speed training, boxing footwork and high-intensity workouts.",
    image: "/images/detail-grip.png",
    icon: Rotate3D
  },
  {
    title: "Anti-slip Grip",
    description: "Textured handles designed for better control during sweaty training sessions.",
    image: "/images/speed-rope-blue.png",
    icon: ShieldCheck
  },
  {
    title: "Adjustable Cable",
    description: "Easy to customize for different heights, training programs and retail markets.",
    image: "/images/oem-colors.png",
    icon: Cable
  },
  {
    title: "Lightweight Speed Cable",
    description: "A responsive rope feel for gyms, boxing clubs and performance-focused brands.",
    image: "/images/pair-series.png",
    icon: Zap
  },
  {
    title: "Recovery Product Line",
    description: "Massage guns and recovery tools for fitness retail bundles, gyms and sports wellness buyers.",
    image: "/images/Massage gun.png",
    icon: BadgeCheck
  }
];

export const trustItems = [
  { title: "Factory Direct Supply", description: "Clear sourcing and stable pricing for repeat bulk orders.", icon: Factory },
  { title: "OEM / ODM Available", description: "Support for private label ranges, colorways and packaging.", icon: Sparkles },
  { title: "Custom Logo & Packaging", description: "Logo printing, retail boxes, bags and carton planning.", icon: Palette },
  { title: "Stable Bulk Production", description: "Consistent production planning for seasonal purchasing.", icon: Boxes },
  { title: "Fast Sampling", description: "Sample support before confirming your final production order.", icon: PackageCheck },
  { title: "Global Shipping Support", description: "Export-ready communication for overseas buyers.", icon: Globe2 }
];

export const customOptions = [
  "Handle Color",
  "Cable Type",
  "Logo Printing",
  "Retail Packaging",
  "Carrying Bag",
  "Gift Box",
  "Bulk Carton"
];

export const products = [
  {
    name: "Speed Jump Rope",
    description: "Fast rotation, light cable and precise grip for cardio training.",
    image: "/images/hero-jump-rope.jpg"
  },
  {
    name: "Boxing Jump Rope",
    description: "Balanced rope feel for footwork drills and boxing club programs.",
    image: "/images/detail-grip.jpg"
  },
  {
    name: "Weighted Jump Rope",
    description: "Training-focused build for strength, conditioning and retail bundles.",
    image: "/images/weighted-rope.jpg"
  },
  {
    name: "Kids Jump Rope",
    description: "Soft colors and adjustable length for school sports and youth fitness.",
    image: "/images/kids-rope.jpg"
  },
  {
    name: "Custom OEM Jump Rope",
    description: "Private label rope sets with custom colors, packaging and accessories.",
    image: "/images/product-pack.jpg"
  }
];

export const scenes = ["Fitness Brands", "Boxing Clubs", "Gyms", "School Sports", "Retail Stores", "Online Sellers"];

export const specs = [
  ["Material", "PVC / Steel Wire / Aluminum Handle / Foam Handle"],
  ["Length", "Adjustable"],
  ["Logo", "Custom Available"],
  ["Packaging", "OPP Bag / Color Box / Custom Box"],
  ["MOQ", "Customizable"],
  ["Sample", "Available"],
  ["Lead Time", "Depends on order quantity"]
];

export const inquiryStatuses = ["new", "contacted", "quoted", "closed", "spam"] as const;

export type InquiryStatus = (typeof inquiryStatuses)[number];

export const inquiryStatusLabels: Record<InquiryStatus, string> = {
  new: "新询盘",
  contacted: "已联系",
  quoted: "已报价",
  closed: "已关闭",
  spam: "垃圾信息"
};

export function isInquiryStatus(status: string): status is InquiryStatus {
  return inquiryStatuses.includes(status as InquiryStatus);
}

export function getWhatsAppHref(message = "Hello, I would like to request a wholesale jump rope quote.", phoneNumber?: string) {
  const number = phoneNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "15551234567";
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}
