import type { Metadata } from "next";
import { ExplorerClient } from "@/components/explorer/ExplorerClient";

export const metadata: Metadata = {
  title: "Explorer",
  description: "Search cities and analyze emissions, air quality, and sustainability data.",
};

export default function ExplorerPage() {
  return (
    <div className="py-10 lg:py-14">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-brand">City Explorer</h1>
          <p className="mt-2 text-sm text-text-secondary">
            Search and analyze environmental data for tracked US metropolitan areas.
          </p>
        </div>
        <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-950">
          <span className="font-semibold">Illustrative data:</span>{" "}
          Environmental metrics are synthetic values for product evaluation and do not represent live measurements. Population and geographic data for expanded coverage use U.S. Census Vintage 2025 and 2025 Gazetteer datasets (verified July 23, 2026).
        </div>
        <ExplorerClient />
      </div>
    </div>
  );
}
