import About from "@/components/About";
import CTA from "@/components/CTA";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Reviews from "@/components/Review";
export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden text-white">
      <Hero />
      <HowItWorks />
      <About />
      <Features/>
      <CTA />
      <Reviews/>
    </main>
  );
}
