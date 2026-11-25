"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const links = [
  { href: "/find", label: "Find an app" },
  { href: "/apps", label: "Browse apps" },
  { href: "/reviews", label: "Reviews & Comparisons" },
  { href: "/editorial-standards", label: "How we research" },
  { href: "/about", label: "About" },
];

export function SiteHeader({ onFind }: { onFind?: () => void }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const navigationLinks = links.map(({ href, label }) => (
    <Link key={href} href={href} aria-current={pathname === href || pathname.startsWith(`${href}/`) ? "page" : undefined}
      onClick={() => { setOpen(false); if (href === "/find") onFind?.(); }}>{label}</Link>
  ));
  return <header className="site-header wai-site-header">
    <Link className="brand" href="/" aria-label="Workout App Index home"><span>WORKOUT APP <b>INDEX</b></span></Link>
    <nav className="desktop-navigation" aria-label="Primary navigation">{navigationLinks}</nav>
    <Link className="wai-header-cta" href="/find" onClick={onFind}>Find my fit <ArrowRight aria-hidden="true" /></Link>
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="mobile-menu-trigger" aria-label="Open navigation menu"><Menu aria-hidden="true" /></SheetTrigger>
      <SheetContent className="mobile-navigation-sheet">
        <SheetHeader><SheetTitle>Workout App Index</SheetTitle><SheetDescription>Find your fit. Explore the apps.</SheetDescription></SheetHeader>
        <nav aria-label="Mobile navigation">{navigationLinks}</nav>
        <Link className="wai-menu-cta" href="/find" onClick={() => { setOpen(false); onFind?.(); }}>Find my fit <ArrowRight aria-hidden="true" /></Link>
      </SheetContent>
    </Sheet>
  </header>;
}
