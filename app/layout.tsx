import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Wholesale Jump Ropes Manufacturer | Custom Speed Jump Rope Supplier",
  description:
    "Professional jump ropes for overseas wholesale buyers, fitness brands, gyms, boxing clubs and OEM packaging programs.",
  openGraph: {
    title: "Wholesale Jump Ropes Manufacturer | Custom Speed Jump Rope Supplier",
    description:
      "Factory-direct custom jump ropes with OEM colors, logo printing, retail packaging and bulk inquiry support.",
    images: ["/images/hero-jump-rope.jpg"],
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
