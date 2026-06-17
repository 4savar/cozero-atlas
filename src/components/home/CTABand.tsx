import { Button } from "@/components/ui/Button";

export function CTABand() {
  return (
    <section className="border-t border-border bg-white py-14">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 rounded-xl border border-border bg-surface p-8 sm:flex-row sm:items-center lg:p-10">
          <div>
            <h2 className="text-xl font-semibold text-brand">
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
