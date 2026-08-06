import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — MIHN",
  description:
    "How MIHN (Multiverse Institute of Health & Nutrition) collects, uses and protects student and visitor information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy" updated="28 July 2026">
      <p>
        MIHN (Multiverse Institute of Health &amp; Nutrition) respects the
        privacy of every student and visitor.
      </p>
      <ul>
        <li>
          Personal information is collected only for enrollment,
          certification, student support, and communication purposes.
        </li>
        <li>
          Student information is stored securely and is not sold or shared
          with third parties unless required by law.
        </li>
        <li>
          By using our website or enrolling in a program, you consent to our
          privacy practices.
        </li>
      </ul>

      <h2>Questions about this policy</h2>
      <p>
        For any questions about how your information is handled, write to{" "}
        <a
          href="mailto:admissions@mihn.edu.in"
          className="text-gold-600 underline underline-offset-4"
        >
          admissions@mihn.edu.in
        </a>
        .
      </p>
    </LegalPage>
  );
}
