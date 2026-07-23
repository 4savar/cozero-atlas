import { globalStats } from "@/lib/data";
import { Card, Section, Stat } from "@/components/ui/Card";

export function MetricsRow() {
  return (
    <Section className="border-b border-border bg-[#080d0a] py-8">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid divide-y divide-border border-y border-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {[
            {
              label: "Cities tracked",
              value: globalStats.citiesTracked,
            },
            {
              label: "Avg. sustainability",
              value: globalStats.avgSustainabilityScore,
              unit: "/100",
            },
            {
              label: "Total emissions",
              value: globalStats.totalEmissionsMt,
              unit: "Mt CO₂",
            },
            {
              label: "Cities improving",
              value: `${globalStats.citiesImproving}/${globalStats.citiesTracked}`,
            },
          ].map((item) => (
            <Card key={item.label} padding="md" className="border-0 bg-transparent shadow-none">
              <Stat label={item.label} value={item.value} unit={item.unit} />
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
