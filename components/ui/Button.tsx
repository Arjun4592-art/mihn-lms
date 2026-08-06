import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { IconArrowRight } from "@/components/icons";

type Variant = "gold" | "outline-ivory" | "outline-navy" | "ghost-navy";

const variantClass: Record<Variant, string> = {
  gold: "bg-gold-500 text-navy-950 hover:bg-gold-400 border border-gold-500",
  "outline-ivory":
    "border border-ivory/40 text-ivory hover:border-gold-400 hover:text-gold-300",
  "outline-navy":
    "border border-navy-900/25 text-navy-900 hover:border-navy-900 hover:bg-navy-900 hover:text-ivory",
  "ghost-navy": "text-navy-900 hover:text-gold-600",
};

export function Button({
  href,
  children,
  variant = "gold",
  className,
  icon = true,
  onClick,
  type = "button",
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const classes = cn(
    "font-label inline-flex items-center gap-2.5 rounded-sm px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]",
    variantClass[variant],
    className
  );

  const content = (
    <>
      <span>{children}</span>
      {icon && <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn(classes, "group")}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cn(classes, "group")}>
      {content}
    </button>
  );
}
