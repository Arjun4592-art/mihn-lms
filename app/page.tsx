import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Programs } from "@/components/sections/Programs";
import { Faculty } from "@/components/sections/Faculty";
import { Benefits } from "@/components/sections/Benefits";
import { CertificateShowcase } from "@/components/sections/CertificateShowcase";
import { VerifyCta } from "@/components/sections/VerifyCta";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Programs />
      <Faculty />
      <Benefits />
      <CertificateShowcase />
      <VerifyCta />
    </>
  );
}
