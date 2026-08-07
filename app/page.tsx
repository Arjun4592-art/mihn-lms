import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Programs } from '@/components/sections/Programs'
import { Faculty } from '@/components/sections/Faculty'
import { FacultyAccountability } from '@/components/sections/FacultyAccountability'
import { Benefits } from '@/components/sections/Benefits'
import { CertificateShowcase } from '@/components/sections/CertificateShowcase'
import { VerifyCta } from '@/components/sections/VerifyCta'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Programs />
      <Faculty />
      <FacultyAccountability />
      <Benefits />
      <CertificateShowcase />
      <VerifyCta />
      <Contact />
    </>
  )
}
