import About from "@/components/About";
import CTA from "@/components/CTA";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden text-white">
      <Hero />
      <HowItWorks />
      <About />
      <CTA />
    </main>
  );
}
