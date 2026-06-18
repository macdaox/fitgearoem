import type { Metadata } from "next";
import { TkLanding } from "@/components/TkLanding";
import { getSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Factory Direct Fitness OEM Quote | FitGear OEM",
  description: "Mobile landing page for OEM/ODM jump ropes, kids jump ropes, massage guns and fitness accessories wholesale inquiries.",
  robots: {
    index: false,
    follow: true
  }
};

export default async function TikTokLandingPage() {
  const content = await getSiteContent();

  return <TkLanding content={content} />;
}
