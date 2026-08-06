import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions — MIHN",
  description:
    "The terms that apply when you access the MIHN website or enroll in an MIHN certification program.",
};

export default function TermsAndConditionsPage() {
  return (
    <LegalPage eyebrow="Legal" title="Terms & Conditions" updated="28 July 2026">
      <p>
        By accessing the MIHN website or enrolling in any program, you agree
        to the following terms:
      </p>
      <ul>
        <li>Students must provide accurate information during registration.</li>
        <li>
          Certificates are issued only after successful completion of all
          required academic and assessment requirements.
        </li>
        <li>
          Certificate verification is available only through the official
          MIHN verification system.
        </li>
        <li>
          All course materials, videos, manuals, and educational resources
          are the intellectual property of MIHN and may not be copied,
          reproduced, or distributed without written permission.
        </li>
        <li>
          MIHN reserves the right to update course content, academic
          policies, and certification requirements when necessary.
        </li>
      </ul>
    </LegalPage>
  );
}
