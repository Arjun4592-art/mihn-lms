import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  className,
  tone = "gold",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "gold" | "navy" | "ivory";
}) {
  const toneClass =
    tone === "gold"
      ? "text-gold-600"
      : tone === "navy"
        ? "text-navy-800"
        : "text-gold-300";
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className={cn("h-px w-8", tone === "ivory" ? "bg-gold-300" : "bg-gold-500")} />
      <span
        className={cn(
          "font-label text-[11px] font-semibold uppercase tracking-[0.28em]",
          toneClass
        )}
      >
        {children}
      </span>
    </div>
  );
}
