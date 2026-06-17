import type { Metadata } from "next";
import { DashboardView } from "@/components/dashboard/DashboardView";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Network-wide environmental dashboard with charts, risk scores, and city comparisons.",
};

export default function DashboardPage() {
  return (
    <div className="py-10 lg:py-14">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-brand">Dashboard</h1>
          <p className="mt-2 text-sm text-text-secondary">
            Monitor environmental performance across all tracked cities.
          </p>
        </div>
        <DashboardView />
      </div>
    </div>
  );
}
