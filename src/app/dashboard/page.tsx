import type { Metadata } from "next";
import { DashboardView } from "@/components/dashboard/DashboardView";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Network-wide environmental dashboard with charts, risk scores, and city comparisons.",
};

export default function DashboardPage() {
  return (
    <div className="bg-background py-8 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:mb-9">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent">Network overview</p>
            <h1 className="text-2xl font-semibold tracking-tight text-brand sm:text-3xl">Dashboard</h1>
            <p className="mt-2 text-sm text-text-secondary">Decision workspace for network-level environmental performance.</p>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-md border border-border bg-surface px-3 py-1.5 text-xs text-text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Network window · 2019–2025
          </div>
        </div>
        <DashboardView />
      </div>
    </div>
  );
}
