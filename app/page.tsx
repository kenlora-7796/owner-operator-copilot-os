import { Features } from "@/components/landing/Features";
import { FinalSections } from "@/components/landing/FinalSections";
import { Hero } from "@/components/landing/Hero";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Hero />
      <Features />
      <FinalSections />
    </main>
  );
}