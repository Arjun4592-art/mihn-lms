import type { Metadata } from "next";
import { MasbHero } from "@/components/sections/masb/MasbHero";
import { MasbOverview } from "@/components/sections/masb/MasbOverview";
import { AcademicStandards } from "@/components/sections/masb/AcademicStandards";
import { AssessmentPhilosophy } from "@/components/sections/masb/AssessmentPhilosophy";
import { CertificationFramework } from "@/components/sections/masb/CertificationFramework";
import { Governance } from "@/components/sections/masb/Governance";
import { VerifyCta } from "@/components/sections/VerifyCta";

export const metadata: Metadata = {
  title: "MASB — Academic Standards Board | MIHN",
  description:
    "The MIHN Academic Standards Board governs curriculum, faculty, assessment and certification integrity across all MIHN programs.",
};

export default function MasbPage() {
  return (
    <>
      <MasbHero />
      <MasbOverview />
      <AcademicStandards />
      <AssessmentPhilosophy />
      <CertificationFramework />
      <Governance />
      <VerifyCta />
    </>
  );
}
