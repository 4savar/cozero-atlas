import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Card";
import { DashboardPreview } from "@/components/home/DashboardPreview";
import { globalStats } from "@/lib/data";

export function Hero() {
  return (
    <section className="border-b border-border bg-white">
      <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8 lg:py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Badge className="mb-5">Environmental intelligence platform</Badge>
            <h1 className="text-4xl font-semibold tracking-tight text-brand lg:text-[2.75rem] lg:leading-[1.15]">
              City-level climate data, ready for decisions
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-text-secondary lg:text-lg">
              COzero Atlas combines emissions tracking, air quality monitoring,
              and sustainability scoring across major US cities — built for
              planners, policymakers, and climate teams.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/explorer" variant="primary">
                Explore cities
              </Button>
              <Button href="/dashboard" variant="outline">
                View dashboard
              </Button>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
              {[
                { label: "Cities tracked", value: globalStats.citiesTracked },
                { label: "Coverage", value: "U.S. West+" },
                { label: "Data status", value: "Demo" },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="text-xs font-medium uppercase tracking-wide text-text-secondary">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-xl font-semibold text-foreground">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-text-secondary">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              Population and geography use public Census datasets where identified; environmental metrics are representative demo values, not live measurements.
            </p>
          </div>

          <div>
            <DashboardPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
