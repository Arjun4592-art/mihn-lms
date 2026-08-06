import type { SVGProps } from "react";

/**
 * Every icon in this file is hand-built for MIHN — monoline strokes,
 * rounded joins, no icon-library defaults. All accept standard SVG
 * props so callers can set className/size via Tailwind (w-*, h-*, text-*).
 */

const base = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconDnaStrand(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M16 6c0 8 16 8 16 16s-16 8-16 16" />
      <path d="M32 6c0 8-16 8-16 16s16 8 16 16" />
      <path d="M17.5 12h13M16.3 18h15.4M16.3 30h15.4M17.5 36h13" />
    </svg>
  );
}

export function IconCap(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M24 12 4 20l20 8 20-8-20-8Z" />
      <path d="M13 23.5V33c0 2.8 4.9 6 11 6s11-3.2 11-6v-9.5" />
      <path d="M40 20v11" />
    </svg>
  );
}

export function IconSeal(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="24" cy="20" r="13" />
      <circle cx="24" cy="20" r="8.5" />
      <path d="M18 31 15 42l9-4 9 4-3-11" />
    </svg>
  );
}

export function IconShieldCheck(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M24 5 8 11v11c0 10.5 7 16.5 16 21 9-4.5 16-10.5 16-21V11L24 5Z" />
      <path d="M17 24.5 22 29.5 32 18.5" />
    </svg>
  );
}

export function IconMolecule(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="13" cy="13" r="4" />
      <circle cx="35" cy="13" r="4" />
      <circle cx="24" cy="30" r="5" />
      <circle cx="10" cy="37" r="3" />
      <circle cx="38" cy="37" r="3" />
      <path d="M16.3 15.3 20.5 26M31.7 15.3 27.5 26M20 33 12.7 35.4M28 33l7.3 2.4" />
    </svg>
  );
}

export function IconPulseLeaf(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M24 40C10 30 6 20 12 12c4.5-6 12-4 12 4 0-8 7.5-10 12-4 6 8 2 18-12 28Z" />
      <path d="M8 24h6l3-6 4 10 3-7 2 3h8" />
    </svg>
  );
}

export function IconCompassStar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="24" cy="24" r="17" />
      <path d="M31 17 26 26l-9 5 5-9 9-5Z" />
      <path d="M24 5v4M24 39v4M5 24h4M39 24h4" />
    </svg>
  );
}

export function IconFlaskSpark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M20 6h8M21 6v11L11 34a4 4 0 0 0 3.5 6h19a4 4 0 0 0 3.5-6L27 17V6" />
      <path d="M15 28h18" />
      <path d="M37 8l1.6 3.4L42 13l-3.4 1.6L37 18l-1.6-3.4L32 13l3.4-1.6L37 8Z" />
    </svg>
  );
}

export function IconIdCard(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="5" y="11" width="38" height="26" rx="3" />
      <circle cx="16" cy="21.5" r="4" />
      <path d="M10 31c1.2-3.4 4-5 6-5s4.8 1.6 6 5" />
      <path d="M27 18h11M27 24h11M27 30h7" />
    </svg>
  );
}

export function IconScrollCert(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M11 8h22a3 3 0 0 1 3 3v26l-6-4-6 4-6-4-6 4V11a3 3 0 0 1 3-3Z" />
      <path d="M17 17h14M17 23h14M17 29h8" />
    </svg>
  );
}

export function IconPeople(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="17" cy="16" r="6" />
      <circle cx="33" cy="18" r="5" />
      <path d="M6 39c1.6-7 6-11 11-11s9.4 4 11 11" />
      <path d="M27.5 28.5c4.3.4 7.7 3.9 9 10.5" />
    </svg>
  );
}

export function IconPath(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="12" r="4" />
      <circle cx="39" cy="36" r="4" />
      <path d="M9 16v6a6 6 0 0 0 6 6h6a6 6 0 0 1 6 6v2" />
    </svg>
  );
}

export function IconLayers(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M24 6 4 16l20 10 20-10-20-10Z" />
      <path d="M4 24l20 10 20-10M4 32l20 10 20-10" />
    </svg>
  );
}

export function IconGavel(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M27 8 40 21M22 13l13 13M8 27l13 13" />
      <path d="M18.5 16.5l13 13M6 42h18" />
      <path d="M11 33l6-6" />
    </svg>
  );
}

export function IconSearch(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="21" cy="21" r="13" />
      <path d="M30.5 30.5 41 41" />
    </svg>
  );
}

export function IconMail(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="5" y="10" width="38" height="28" rx="3" />
      <path d="M6.5 12 24 26 41.5 12" />
    </svg>
  );
}

export function IconPhone(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M10 6h6l3 8-4.5 3.5a22 22 0 0 0 9 9L27 22l8 3v6c0 2.2-1.9 4-4.2 3.8C17 34 8 25 6.2 11.2 6 9 7.8 6 10 6Z" />
    </svg>
  );
}

export function IconPin(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M24 43S10 29.5 10 19a14 14 0 0 1 28 0c0 10.5-14 24-14 24Z" />
      <circle cx="24" cy="19" r="5" />
    </svg>
  );
}

export function IconArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M6 24h34M28 12l12 12-12 12" />
    </svg>
  );
}

export function IconPlus(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M24 8v32M8 24h32" />
    </svg>
  );
}

export function IconInstagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="7" y="7" width="34" height="34" rx="10" />
      <circle cx="24" cy="24" r="9" />
      <circle cx="33.5" cy="14.5" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconLinkedin(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="7" y="7" width="34" height="34" rx="4" />
      <path d="M16 21v13M16 15.5v.1" />
      <path d="M23 34V21m0 5c0-3 2.2-5 5-5s5.5 2 5.5 5.5V34" />
    </svg>
  );
}

export function IconFacebook(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="24" cy="24" r="17" />
      <path d="M27 17.5h4v-6h-4.5c-3.6 0-6 2.6-6 6.2V21h-4v6h4v13.4a17 17 0 0 0 6.5 0V27h4.6l1-6H26.5v-2c0-1 .7-1.5 1.5-1.5Z" />
    </svg>
  );
}

export function IconLoader(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} viewBox="0 0 48 48" {...props}>
      <circle
        cx="24"
        cy="24"
        r="17"
        strokeOpacity={0.25}
      />
      <path d="M41 24a17 17 0 0 0-17-17" />
    </svg>
  );
}

export function IconAlert(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M24 6 4 40h40L24 6Z" />
      <path d="M24 20v9" />
      <circle cx="24" cy="33.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconBook(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M24 12c-4-3.5-10-4-18-2v26c8-2 14-1.5 18 2 4-3.5 10-4 18-2V10c-8-2-14-1.5-18 2Z" />
      <path d="M24 12v26" />
    </svg>
  );
}

export function IconQrCode(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="6" y="6" width="14" height="14" rx="1.5" />
      <rect x="28" y="6" width="14" height="14" rx="1.5" />
      <rect x="6" y="28" width="14" height="14" rx="1.5" />
      <path d="M11 11h4v4h-4Zm22 0h4v4h-4Zm-22 22h4v4h-4Z" fill="currentColor" stroke="none" />
      <path d="M28 28h6v6h-6ZM40 28v14M28 40h6" />
    </svg>
  );
}

export function IconLock(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="10" y="21" width="28" height="20" rx="3" />
      <path d="M16 21v-5a8 8 0 0 1 16 0v5" />
      <path d="M24 29.5v5" />
    </svg>
  );
}

export function IconLogout(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M20 6h-6a4 4 0 0 0-4 4v28a4 4 0 0 0 4 4h6" />
      <path d="M18 24h24M34 14l10 10-10 10" />
    </svg>
  );
}

export function IconTrash(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M8 13h32M18 13V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4" />
      <path d="M12 13l2 27a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3l2-27" />
      <path d="M20 21v13M28 21v13" />
    </svg>
  );
}

export function IconClose(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 12l24 24M36 12 12 36" />
    </svg>
  );
}
