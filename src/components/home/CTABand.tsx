import { Button } from "@/components/ui/Button";

export function CTABand() {
  return (
    <section className="border-t border-border bg-background py-12">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 rounded-lg border border-brand/20 bg-[#0b2115] p-7 sm:flex-row sm:items-center lg:p-9">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Start exploring environmental data
            </h2>
            <p className="mt-2 text-sm text-text-secondary max-w-md">
              Access emissions, air quality, and sustainability metrics for every
              city in the Atlas network.
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <Button href="/explorer" variant="primary">
              Open Explorer
            </Button>
            <Button href="https://cozero.life" variant="outline">
              COzero.life
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
