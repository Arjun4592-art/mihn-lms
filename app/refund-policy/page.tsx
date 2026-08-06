import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Refund Policy — MIHN",
  description: "MIHN's policy on course fee refunds and how refund requests are handled.",
};

export default function RefundPolicyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Refund Policy" updated="28 July 2026">
      <ul>
        <li>
          Course fees are generally non-refundable once enrollment is
          confirmed and course access has been provided.
        </li>
        <li>
          Refund requests related to duplicate payments or verified
          technical/payment errors will be reviewed individually.
        </li>
        <li>
          Approved refunds, where applicable, will be processed through the
          original payment method.
        </li>
        <li>
          By completing payment, the student acknowledges and accepts this
          refund policy.
        </li>
      </ul>

      <h2>Requesting a review</h2>
      <p>
        To raise a duplicate-payment or technical-error refund request,
        write to{" "}
        <a
          href="mailto:admissions@mihn.edu.in"
          className="text-gold-600 underline underline-offset-4"
        >
          admissions@mihn.edu.in
        </a>{" "}
        with your payment reference.
      </p>
    </LegalPage>
  );
}
