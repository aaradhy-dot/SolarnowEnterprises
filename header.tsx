"use client";

import { Link } from "@/components/site/site-link";
import { Menu, Phone, SunMedium } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const navigation = [["Home", "/"], ["Services", "/solar-solutions"], ["Projects", "/solar-projects"], ["Calculator", "/solar-calculator"], ["About", "/about"], ["Contact", "/contact"]];

export function Header() {
  const phone = process.env.NEXT_PUBLIC_BUSINESS_PHONE;
  const callHref = phone ? `tel:${phone.replace(/[^+\d]/g, "")}` : "/contact";
  return <header className="site-header"><div className="container header-inner">
    <Link className="brand" href="/" aria-label="SolarNow Enterprises home"><span className="brand-mark"><SunMedium size={22} /></span><span>SOLAR<strong>NOW</strong><small>ENTERPRISES</small></span></Link>
    <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</nav>
    <div className="header-actions"><Link className="call-cta" href={callHref}><Phone size={16} /> Call now</Link><Link className="header-cta" href="/get-quote">Get a quote</Link></div>
    <Sheet><SheetTrigger className="menu-trigger" aria-label="Open navigation"><Menu /></SheetTrigger><SheetContent className="mobile-sheet"><SheetHeader><SheetTitle>SolarNow Enterprises</SheetTitle><SheetDescription>Solar solutions for Nagpur and Kalmeshwar</SheetDescription></SheetHeader><nav className="mobile-nav" aria-label="Mobile navigation">{navigation.map(([label, href]) => <SheetClose key={href} asChild><Link href={href}>{label}</Link></SheetClose>)}<SheetClose asChild><Link className="button button-dark" href={callHref}><Phone size={17} /> Call now</Link></SheetClose><SheetClose asChild><Link className="button button-lime" href="/get-quote">Get a quote</Link></SheetClose></nav></SheetContent></Sheet>
  </div></header>;
}
