import Link from "next/link";
import { cities } from "@/lib/data";
import { Card, Section, SectionHeader, Badge } from "@/components/ui/Card";
import { getAqiColor } from "@/lib/utils";

const topBySustainability = [...cities]
  .sort((a, b) => b.sustainability.score - a.sustainability.score)
  .slice(0, 4);

const lowestEmissions = [...cities]
  .sort((a, b) => a.emissions.perCapita - b.emissions.perCapita)
  .slice(0, 4);

function ComparisonCard({
  city,
  rank,
  metric,
  metricLabel,
}: {
  city: (typeof cities)[0];
  rank: number;
  metric: string;
  metricLabel: string;
}) {
  return (
    <Link href={`/explorer?city=${city.id}`}>
      <Card className="hover:border-brand/20 transition-colors h-full">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent-light text-xs font-semibold text-brand">
              {rank}
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {city.name}, {city.stateCode}
              </p>
              <p className="text-xs text-text-secondary mt-0.5">
                Rank #{city.sustainability.nationalRank} nationally
              </p>
            </div>
          </div>
          <span
            className="h-2.5 w-2.5 rounded-full mt-1"
            style={{ backgroundColor: getAqiColor(city.airQuality.aqi) }}
          />
        </div>
        <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
          <div>
            <p className="text-xs font-medium text-text-secondary">{metricLabel}</p>
            <p className="text-xl font-semibold text-brand mt-0.5">{metric}</p>
          </div>
          <Badge>{city.airQuality.status}</Badge>
        </div>
      </Card>
    </Link>
  );
}

export function CityComparisons() {
  return (
    <Section>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeader
          title="City comparisons"
          description="Compare representative sustainability and emissions demo metrics across tracked places."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Top representative sustainability scores
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {topBySustainability.map((city, i) => (
                <ComparisonCard
                  key={city.id}
                  city={city}
                  rank={i + 1}
                  metric={`${city.sustainability.score}/100`}
                  metricLabel="Sustainability score"
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Lowest representative per-capita emissions
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {lowestEmissions.map((city, i) => (
                <ComparisonCard
                  key={city.id}
                  city={city}
                  rank={i + 1}
                  metric={`${city.emissions.perCapita} t`}
                  metricLabel="Per-capita CO₂"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
