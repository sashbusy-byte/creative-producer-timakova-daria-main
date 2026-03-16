import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { PerformanceCases } from "@/components/PerformanceCases";
import { DeepDiveCase } from "@/components/DeepDiveCase";
import { OptimizationSection } from "@/components/OptimizationSection";
import { ExpertiseSection } from "@/components/ExpertiseSection";
import { ContactSection } from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <div id="showreel" className="scroll-mt-20 md:scroll-mt-24"><PerformanceCases /></div>
      <div id="analysis" className="scroll-mt-20 md:scroll-mt-24"><DeepDiveCase /></div>
      <div id="workflow" className="scroll-mt-20 md:scroll-mt-24"><OptimizationSection /></div>
      <div id="expertise" className="scroll-mt-20 md:scroll-mt-24"><ExpertiseSection /></div>
      <div id="contacts" className="scroll-mt-20 md:scroll-mt-24"><ContactSection /></div>

      <footer className="py-8 text-center text-muted-foreground text-sm font-mono-data border-t border-border">
        © 2026 Дарья Тимакова. Креативный Продюсер.
      </footer>
    </div>
  );
};

export default Index;
