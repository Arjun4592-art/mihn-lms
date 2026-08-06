import { cn } from "@/lib/cn";

export function Divider({ className }: { className?: string }) {
  return (
    <div className={cn("mx-auto flex max-w-6xl items-center gap-4 px-6", className)}>
      <span className="h-px flex-1 bg-paper-line" />
      <span className="h-1.5 w-1.5 rotate-45 bg-gold-500" />
      <span className="h-px flex-1 bg-paper-line" />
    </div>
  );
}
