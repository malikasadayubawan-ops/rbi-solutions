import dynamic from "next/dynamic";
import Hero from "@/components/hero/Hero";
import SignaturePrograms from "@/components/programs/SignaturePrograms";
import ProgramCategories from "@/components/programs/ProgramCategories";
import ProgramsByCategory from "@/components/programs/ProgramsByCategory";
import HowItWorks from "@/components/timeline/HowItWorks";
import WhyRBISolutions from "@/components/why/WhyRBISolutions";
import GlobalPresence from "@/components/presence/GlobalPresence";
import Founder from "@/components/founder/Founder";
import Consultation from "@/components/consultation/Consultation";

// Code-split only — `ssr` stays at its default (true), so both sections are
// still fully present in the server-rendered HTML for SEO and non-JS
// clients. This just keeps their JS (interactive map math, comparison-table
// state) out of the bundle that has to be parsed/executed for the
// above-the-fold sections, without changing what's ever rendered. The
// `loading` fallback is a fixed-height placeholder purely as a CLS
// safety net; it won't normally be seen since ssr:true means the real
// content is already in the initial HTML.
const WorldMap = dynamic(() => import("@/components/globe/WorldMap"), {
  loading: () => <div className="min-h-[700px] bg-paper" />,
});
const ComparisonTool = dynamic(() => import("@/components/compare/ComparisonTool"), {
  loading: () => <div className="min-h-[700px] bg-paper" />,
});

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
