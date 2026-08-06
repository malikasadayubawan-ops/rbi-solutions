import Hero from "@/components/hero/Hero";
import PassportStory from "@/components/passport/PassportStory";
import WorldMap from "@/components/globe/WorldMap";
import GlobalPresence from "@/components/presence/GlobalPresence";
import HowItWorks from "@/components/timeline/HowItWorks";
import ComparisonTool from "@/components/compare/ComparisonTool";
import Founder from "@/components/founder/Founder";
import Consultation from "@/components/consultation/Consultation";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="relative bg-ink focus:outline-none">
      <Hero />
      <PassportStory />
      <WorldMap />
      <GlobalPresence />
      <HowItWorks />
      <ComparisonTool />
      <Founder />
      <Consultation />
    </main>
  );
}
