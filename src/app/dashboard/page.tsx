import type { Metadata } from "next";
import { DashboardView } from "@/components/dashboard/DashboardView";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Network-wide environmental dashboard with charts, risk scores, and city comparisons.",
};

export default function DashboardPage() {
  return (
    <div className="bg-surface/60 py-8 sm:py-10 lg:py-14">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:mb-9">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent">Network overview</p>
            <h1 className="text-2xl font-semibold tracking-tight text-brand sm:text-3xl">Dashboard</h1>
            <p className="mt-2 text-sm text-text-secondary">
              Monitor environmental performance across all tracked cities.
            </p>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-xs text-text-secondary shadow-sm">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            Demo dataset · 2019–2025
          </div>
        </div>
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-950">
          <span className="font-semibold">Illustrative data:</span>{" "}
          Metrics are synthetic values for product evaluation and do not represent live environmental measurements.
        </div>
        <DashboardView />
      </div>
    </div>
  );
}
