import Hero from "@/components/hero/Hero";
import SignaturePrograms from "@/components/programs/SignaturePrograms";
import ProgramCategories from "@/components/programs/ProgramCategories";
import ProgramsByCategory from "@/components/programs/ProgramsByCategory";
import WorldMap from "@/components/globe/WorldMap";
import ComparisonTool from "@/components/compare/ComparisonTool";
import HowItWorks from "@/components/timeline/HowItWorks";
import WhyRBISolutions from "@/components/why/WhyRBISolutions";
import GlobalPresence from "@/components/presence/GlobalPresence";
import Founder from "@/components/founder/Founder";
import Consultation from "@/components/consultation/Consultation";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="relative bg-paper focus:outline-none">
      <Hero />
      <SignaturePrograms />
      <ProgramCategories />
      <ProgramsByCategory />
      <WorldMap />
      <ComparisonTool />
      <HowItWorks />
      <WhyRBISolutions />
      <GlobalPresence />
      <Founder />
      <Consultation />
    </main>
  );
}
