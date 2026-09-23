import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://solarnow-enterprises.openai.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Solar Company in Nagpur | SolarNow Enterprises",
  description: "SolarNow Enterprises provides residential, commercial and rooftop solar installation in Nagpur, Kalmeshwar and nearby areas. Request a site survey.",
  alternates: { canonical: "/" },
  openGraph: { title: "Solar Company in Nagpur | SolarNow Enterprises", description: "Practical solar solutions for homes, businesses and industries across Nagpur and Kalmeshwar.", url: "/", siteName: "SolarNow Enterprises", locale: "en_IN", type: "website" },
  twitter: { card: "summary", title: "SolarNow Enterprises", description: "Solar installation solutions for Nagpur and Kalmeshwar." },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const localBusiness = {
    "@context": "https://schema.org", "@type": ["Organization", "LocalBusiness"],
    name: "SolarNow Enterprises", url: siteUrl, logo: `${siteUrl}/favicon.svg`,
    address: { "@type": "PostalAddress", streetAddress: "In Front of Pratap High School, Katol Nagpur Road", addressLocality: "Kalmeshwar", addressRegion: "Maharashtra", postalCode: "441501", addressCountry: "IN" },
    areaServed: [{ "@type": "City", name: "Nagpur" }, { "@type": "City", name: "Kalmeshwar" }, { "@type": "State", name: "Maharashtra" }],
    ...(process.env.NEXT_PUBLIC_BUSINESS_PHONE ? { telephone: process.env.NEXT_PUBLIC_BUSINESS_PHONE, contactPoint: { "@type": "ContactPoint", telephone: process.env.NEXT_PUBLIC_BUSINESS_PHONE, contactType: "customer service" } } : {})
  };
  const website = { "@context": "https://schema.org", "@type": "WebSite", name: "SolarNow Enterprises", url: siteUrl };
  return <html lang="en-IN"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} /></body></html>;
}
