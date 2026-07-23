import { globalStats } from "@/lib/data";
import { Card, Section, Stat } from "@/components/ui/Card";

export function MetricsRow() {
  return (
    <Section className="py-12">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
            <Card key={item.label} padding="md">
              <Stat label={item.label} value={item.value} unit={item.unit} />
            </Card>
          ))}
        </div>
        <p className="mt-4 text-xs text-text-secondary">
          Environmental summary metrics are representative demo values. Expanded population and geographic records are verified against U.S. Census Vintage 2025 and 2025 Gazetteer data.
        </p>
      </div>
    </Section>
  );
}
