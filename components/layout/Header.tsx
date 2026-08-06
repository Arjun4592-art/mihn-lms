"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { href: "/#programs", label: "Programs" },
  { href: "/#faculty", label: "Faculty" },
  { href: "/masb", label: "MASB" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-paper-line bg-ivory/95 backdrop-blur supports-[backdrop-filter]:bg-ivory/85"
          : "border-transparent bg-ivory"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="group flex items-center gap-3" aria-label="MIHN home">
          <Image
            src="/brand/logo-white.jpg"
            alt="MIHN — Multiverse Institute of Health & Nutrition"
            width={168}
            height={140}
            className="h-11 w-auto mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative font-label text-[11px] font-semibold uppercase tracking-[0.22em] text-navy-900/80 transition-colors hover:text-gold-600"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold-500 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="/verify" variant="outline-navy" className="!py-2.5">
            Verify Certificate
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={cn(
              "h-px w-6 bg-navy-900 transition-transform duration-300",
              open && "translate-y-[3.5px] rotate-45"
            )}
          />
          <span
            className={cn(
              "h-px w-6 bg-navy-900 transition-transform duration-300",
              open && "-translate-y-[3.5px] -rotate-45"
            )}
          />
        </button>
      </div>

      {open && (
        <div className="border-t border-paper-line bg-ivory px-6 py-6 lg:hidden">
          <nav className="flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-label text-xs font-semibold uppercase tracking-[0.22em] text-navy-900"
              >
                {link.label}
              </Link>
            ))}
            <Button href="/verify" variant="outline-navy" className="mt-2 justify-center">
              Verify Certificate
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
