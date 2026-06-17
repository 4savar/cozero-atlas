import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Card, Badge, Section } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about COzero Atlas and the COzero mission.",
};

const features = [
  {
    title: "City-level intelligence",
    description:
      "Granular environmental data for major US metros — emissions, air quality, sustainability, and risk scores in one view.",
  },
  {
    title: "Multi-metric analysis",
    description:
      "Combine sector-level emissions breakdowns, pollutant readings, and composite sustainability ratings for informed decisions.",
  },
  {
    title: "Historical context",
    description:
      "Seven years of trend data to measure progress, identify patterns, and forecast environmental trajectories.",
  },
  {
    title: "Peer benchmarking",
    description:
      "Compare cities on emissions, air quality, and sustainability to identify best practices and priority interventions.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-border py-14 lg:py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Badge className="mb-4">About COzero Atlas</Badge>
          <h1 className="text-3xl font-semibold tracking-tight text-brand lg:text-4xl max-w-2xl">
            Environmental intelligence built for climate action
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
            COzero Atlas is the city intelligence companion to{" "}
            <a href="https://cozero.life" className="text-brand font-medium hover:underline" target="_blank" rel="noopener noreferrer">
              COzero.life
            </a>
            , extending real-time CO₂ monitoring with comprehensive environmental analytics for urban decision-makers.
          </p>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-xl font-semibold text-brand">The COzero mission</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-text-secondary">
                <p>
                  COzero was founded on a simple belief: you cannot manage what you cannot measure.
                  Climate change demands real-time visibility into carbon emissions and environmental
                  health — not annual reports, but live, actionable data.
                </p>
                <p>
                  COzero.life provides real-time CO₂ monitoring, helping organizations and communities
                  track, analyze, and optimize their carbon footprint with data-driven insights.
                </p>
                <p>
                  Our platform connects users with tools and funding opportunities to scale real-world
                  carbon reduction efforts.
                </p>
              </div>
              <div className="mt-6">
                <Button href="https://cozero.life" variant="primary">Visit COzero.life</Button>
              </div>
            </div>

            <Card padding="lg" className="bg-accent-light/40">
              <h2 className="text-xl font-semibold text-brand">The Atlas platform</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-text-secondary">
                <p>
                  COzero Atlas extends the COzero mission to the city level, giving municipalities
                  and urban planners the full environmental picture they need for climate policy.
                </p>
                <p>
                  By combining emissions data, air quality metrics, sustainability scores, and
                  historical trends, Atlas transforms complex environmental data into clear,
                  actionable intelligence.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      <Section className="bg-surface border-y border-border py-14">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-brand mb-6">What Atlas delivers</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((f) => (
              <Card key={f.title} padding="md">
                <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{f.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <section className="py-14">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 text-center">
          <h2 className="text-xl font-semibold text-brand">Ready to explore?</h2>
          <p className="mt-2 text-sm text-text-secondary">Start with any city in the Atlas network.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Button href="/explorer" variant="primary">Open Explorer</Button>
            <Button href="/dashboard" variant="outline">View Dashboard</Button>
          </div>
        </div>
      </section>
    </>
  );
}
