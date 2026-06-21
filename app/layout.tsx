import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
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
  const tiktokPixelCode = process.env.TIKTOK_PIXEL_CODE || "D8O4HJ3C77U56UIVD6Q0";

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
              var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
              ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};

              function setFitGearCookie(name, value, maxAge) {
                var secure = w.location.protocol === "https:" ? "; Secure" : "";
                d.cookie = name + "=" + encodeURIComponent(value) + "; path=/; max-age=" + maxAge + "; SameSite=Lax" + secure;
              }

              function persistQueryParam(name, maxAge) {
                try {
                  var value = new URLSearchParams(w.location.search).get(name);
                  if (value) setFitGearCookie(name, value, maxAge);
                } catch (error) {}
              }

              function getFitGearExternalId() {
                var key = "fitgear_external_id";
                try {
                  var externalId = w.localStorage ? w.localStorage.getItem(key) : "";
                  if (!externalId) {
                    externalId = w.crypto && w.crypto.randomUUID
                      ? w.crypto.randomUUID()
                      : String(Date.now()) + "-" + Math.random().toString(16).slice(2);
                    if (w.localStorage) w.localStorage.setItem(key, externalId);
                  }
                  setFitGearCookie("fg_external_id", externalId, 31536000);
                  return externalId;
                } catch (error) {
                  return "";
                }
              }

              persistQueryParam("ttclid", 7776000);
              var fitGearExternalId = getFitGearExternalId();

              ttq.load(${JSON.stringify(tiktokPixelCode)});
              if (fitGearExternalId) {
                ttq.identify({ external_id: fitGearExternalId });
              }
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
