import { Link } from "@/components/site/site-link";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Page Not Found | SolarNow Enterprises", description: "The requested SolarNow Enterprises page could not be found.", robots: { index: false, follow: true } };

export default function NotFound() {
  return <><div className="inner-header"><Header /></div><main><section className="inner-hero"><div className="container"><p className="eyebrow">404 — Page not found</p><h1>This page is not connected.</h1><p>The address may have changed. Return to the main solar solutions or contact SolarNow for guidance.</p></div></section><section className="content-shell container"><Link className="button button-lime" href="/">Return to the homepage</Link></section></main><Footer /></>;
}
