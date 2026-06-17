import { Hero } from "@/components/home/Hero";
import { MetricsRow } from "@/components/home/MetricsRow";
import { USMapSection } from "@/components/home/USMapSection";
import { CityComparisons } from "@/components/home/CityComparisons";
import { ChartPanels } from "@/components/home/ChartPanels";
import { CTABand } from "@/components/home/CTABand";

export default function Home() {
  return (
    <>
      <Hero />
      <MetricsRow />
      <USMapSection />
      <CityComparisons />
      <ChartPanels />
      <CTABand />
    </>
  );
}
