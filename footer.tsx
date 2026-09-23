import { Link } from "@/components/site/site-link";
import { SunMedium } from "lucide-react";

export function Footer() {
  const phone = process.env.NEXT_PUBLIC_BUSINESS_PHONE;
  return <footer className="site-footer"><div className="container footer-grid">
    <div><Link className="brand footer-brand" href="/"><span className="brand-mark"><SunMedium size={22} /></span><span>SOLAR<strong>NOW</strong><small>ENTERPRISES</small></span></Link><p>Solar installation solutions for homes, businesses and industries across Nagpur, Kalmeshwar and surrounding areas.</p></div>
    <div><h2>Solutions</h2><Link href="/residential-solar-nagpur">Residential solar</Link><Link href="/commercial-solar-nagpur">Commercial solar</Link><Link href="/industrial-solar-nagpur">Industrial solar</Link><Link href="/solar-maintenance">Solar maintenance</Link></div>
    <div><h2>Explore</h2><Link href="/solar-calculator">Solar calculator</Link><Link href="/solar-subsidy">Solar subsidy</Link><Link href="/solar-projects">Projects</Link><Link href="/blog">Solar guides</Link></div>
    <div><h2>Visit</h2><address>In Front of Pratap High School,<br />Katol Nagpur Road, Kalmeshwar,<br />Nagpur, Maharashtra 441501</address>{phone && <a href={`tel:${phone.replace(/[^+\d]/g, "")}`}>{phone}</a>}<Link href="/contact">Contact SolarNow</Link></div>
  </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} SolarNow Enterprises</span><span>Solar energy solutions • Nagpur, Maharashtra</span></div></footer>;
}
