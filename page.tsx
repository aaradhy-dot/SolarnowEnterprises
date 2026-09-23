import type { Metadata } from "next";
import { Link } from "@/components/site/site-link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { SolarCalculator } from "@/components/site/solar-calculator";
import { EnquiryPrep } from "@/components/site/enquiry-prep";
import { pages } from "@/lib/site-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "solar-calculator") return { title: "Solar Calculator Nagpur | Estimate System Size", description: "Use SolarNow's solar calculator to estimate a starting solar system size and savings range for a property in Nagpur.", alternates: { canonical: "/solar-calculator" }, openGraph: { title: "Solar Calculator Nagpur | SolarNow", description: "Estimate a starting solar system size using your electricity bill.", url: "/solar-calculator", type: "website" }, twitter: { card: "summary", title: "Solar Calculator Nagpur | SolarNow", description: "Estimate a starting solar system size using your electricity bill." } };
  const page = pages[slug];
  if (!page) return {};
  return { title: page.title, description: page.description, alternates: { canonical: `/${slug}` }, openGraph: { title: page.title, description: page.description, url: `/${slug}`, type: "website" }, twitter: { card: "summary", title: page.title, description: page.description } };
}

export default async function ContentPage({ params }: Props) {
  const { slug } = await params;
  if (slug === "solar-calculator") return <CalculatorPage />;
  const page = pages[slug];
  if (!page) notFound();
  const schema = page.kind === "service" ? { "@context": "https://schema.org", "@type": "Service", name: page.h1, description: page.description, provider: { "@type": "LocalBusiness", name: "SolarNow Enterprises" }, areaServed: [{ "@type": "City", name: "Nagpur" }, { "@type": "City", name: "Kalmeshwar" }] } : { "@context": "https://schema.org", "@type": "WebPage", name: page.h1, description: page.description };
  const breadcrumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "/" }, { "@type": "ListItem", position: 2, name: page.h1, item: `/${slug}` }] };

  return <><div className="inner-header"><Header /></div><main className="inner-main">
    <section className="inner-hero"><div className="container"><div className="breadcrumbs"><Link href="/">Home</Link> / <span>{page.eyebrow}</span></div><p className="eyebrow">{page.eyebrow}</p><h1>{page.h1}</h1><p>{page.intro}</p></div></section>
    <section className="content-shell container"><div className="content-grid"><article className="prose">
      {page.kind === "policy" && <div className="notice"><strong>Important:</strong> Verify current eligibility, amounts and procedures with the official authority before making a financial decision.</div>}
      {page.sections.map(section => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map(p => <p key={p}>{p}</p>)}{section.bullets && <ul>{section.bullets.map(item => <li key={item}>{item}</li>)}</ul>}</section>)}
      {(slug === "contact" || slug === "get-quote") && <section><h2>Request your solar consultation</h2><p>Share your contact and property details. Once lead delivery is configured, the SolarNow team receives the enquiry by email and can contact you about the next step.</p><EnquiryPrep />{process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL && <p><a className="text-link" href={process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL} target="_blank" rel="noreferrer">Open SolarNow in Google Maps →</a></p>}</section>}
      {page.faq && <section><h2>Common questions</h2><div className="faq-list">{page.faq.map(item => <div className="faq-item" key={item.q}><h3>{item.q}</h3><p>{item.a}</p></div>)}</div></section>}
    </article><aside className="info-panel"><CheckCircle2 size={27} /><h2>Plan the next step</h2><p>A site survey connects these general principles to your roof, electricity use and connection.</p><Link className="button button-lime" href="/get-quote">Request a site survey <ArrowRight size={17} /></Link><div className="related-links">{page.related.map(([label, href]) => <Link key={href} href={href}>{label} →</Link>)}</div></aside></div></section>
  </main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} /></>;
}

function CalculatorPage() {
  const breadcrumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "/" }, { "@type": "ListItem", position: 2, name: "Solar Calculator", item: "/solar-calculator" }] };
  return <><div className="inner-header"><Header /></div><main className="inner-main"><section className="inner-hero"><div className="container"><div className="breadcrumbs"><Link href="/">Home</Link> / Solar calculator</div><p className="eyebrow">Solar calculator Nagpur</p><h1>Estimate a sensible starting system size.</h1><p>Use your electricity bill for a quick planning estimate, then validate it with real load data, roof conditions and a site survey.</p></div></section><section className="content-shell container"><div className="content-grid"><article className="prose"><h2>Solar savings calculator</h2><p>Enter an average monthly bill and effective electricity rate. Choose how much of the bill you would like solar to offset. The result is deliberately a starting point—not a sales promise.</p><SolarCalculator /><h2>Why the final size can differ</h2><p>Bill values can include fixed charges, demand charges, taxes and adjustments that solar does not replace in the same way as energy units. Generation also changes with shade, orientation, temperature, equipment, soiling and local weather.</p><h2>Use the estimate well</h2><p>Compare the result with 12 months of bills where possible. A site survey can then check usable roof area, electrical connection, daytime consumption and whether on-grid, off-grid or hybrid solar is appropriate.</p></article><aside className="info-panel"><CheckCircle2 size={27} /><h2>Validate your estimate</h2><p>Bring recent bills and roof details to a site discussion.</p><Link className="button button-lime" href="/get-quote">Request a survey <ArrowRight size={17} /></Link><div className="related-links"><Link href="/residential-solar-nagpur">Residential solar →</Link><Link href="/commercial-solar-nagpur">Commercial solar →</Link><Link href="/solar-subsidy">Subsidy guidance →</Link></div></aside></div></section></main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} /></>;
}
