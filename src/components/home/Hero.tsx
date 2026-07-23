import { Button } from "@/components/ui/Button";
import { DashboardPreview } from "@/components/home/DashboardPreview";
import { globalStats } from "@/lib/data";

export function Hero() {
  return (
    <section className="atlas-grid relative overflow-hidden border-b border-border bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/70 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(430px,.95fr)] lg:gap-14">
          <div>
            <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_14px_2px_rgba(74,222,128,.55)]" />
              City intelligence network
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-foreground sm:text-5xl lg:text-[3.5rem] lg:leading-[1.04]">
              See the environmental signals shaping every city.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary lg:text-lg">
              COzero Atlas gives climate teams a unified view of emissions, air quality, and city performance across a growing U.S. network.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/explorer">Explore cities <span aria-hidden>→</span></Button>
              <Button href="/dashboard" variant="outline">View dashboard</Button>
            </div>
            <dl className="mt-10 grid max-w-2xl grid-cols-3 gap-3 border-t border-border pt-5 sm:gap-7">
              {[
                { label: "Places mapped", value: globalStats.citiesTracked },
                { label: "Coverage", value: "U.S. network" },
                { label: "Signal window", value: "2019–2025" },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.13em] text-text-secondary">{item.label}</dt>
                  <dd className="mt-1.5 text-sm font-semibold text-foreground sm:text-base">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}
