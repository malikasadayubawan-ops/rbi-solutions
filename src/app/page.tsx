import Hero from "@/components/hero/Hero";
import PassportStory from "@/components/passport/PassportStory";
import WorldMap from "@/components/globe/WorldMap";
import HowItWorks from "@/components/timeline/HowItWorks";
import ComparisonTool from "@/components/compare/ComparisonTool";
import Consultation from "@/components/consultation/Consultation";

export default function Home() {
  return (
    <main className="relative bg-ink">
      <Hero />
      <PassportStory />
      <WorldMap />
      <HowItWorks />
      <ComparisonTool />
      <Consultation />
    </main>
  );
}
