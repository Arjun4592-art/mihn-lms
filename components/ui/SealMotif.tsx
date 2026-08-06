import { cn } from "@/lib/cn";

/**
 * The recurring signature mark of the site: an academic seal (referencing
 * the certificates MIHN issues) with the DNA helix from the wordmark
 * running through its centre. Used as a faint watermark, a divider
 * ornament, and inside the verification result state.
 */
export function SealMotif({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.6"
      className={cn("animate-spin-slow motion-reduce:animate-none", className)}
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="94" />
      <circle cx="100" cy="100" r="84" strokeDasharray="1.2 4.4" />
      <circle cx="100" cy="100" r="62" />
      {/* helix */}
      <path d="M76 40c0 24 48 24 48 60s-48 36-48 60" strokeWidth="0.9" />
      <path d="M124 40c0 24-48 24-48 60s48 36 48 60" strokeWidth="0.9" />
      {Array.from({ length: 9 }).map((_, i) => (
        <line
          key={i}
          x1={78 + i * 0.2}
          y1={48 + i * 12.7}
          x2={122 - i * 0.2}
          y2={48 + i * 12.7}
          strokeWidth="0.7"
        />
      ))}
      {/* ticks like a certificate seal */}
      {Array.from({ length: 36 }).map((_, i) => {
        const angle = (i * 10 * Math.PI) / 180;
        const r1 = 88;
        const r2 = i % 3 === 0 ? 80 : 84;
        const x1 = 100 + r1 * Math.cos(angle);
        const y1 = 100 + r1 * Math.sin(angle);
        const x2 = 100 + r2 * Math.cos(angle);
        const y2 = 100 + r2 * Math.sin(angle);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="0.5" />;
      })}
    </svg>
  );
}
