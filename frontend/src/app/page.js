import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { VibeShowcase } from "@/components/landing/VibeShowcase";
import { CTA } from "@/components/landing/CTA";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <VibeShowcase />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
