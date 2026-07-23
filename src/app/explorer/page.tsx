import type { Metadata } from "next";
import { ExplorerClient } from "@/components/explorer/ExplorerClient";
import { USMapSection } from "@/components/home/USMapSection";

export const metadata: Metadata = {
  title: "Explorer",
  description: "Search cities and analyze emissions, air quality, and sustainability data.",
};

export default function ExplorerPage() {
  return (
    <div className="bg-background py-8 lg:py-10">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent">Geospatial workspace</p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">City Explorer</h1>
          <p className="mt-2 text-sm text-text-secondary">
            Search and analyze environmental data for tracked US metropolitan areas.
          </p>
        </div>
      </div>
      <USMapSection />
      <div className="mx-auto max-w-7xl px-5 pt-8 lg:px-8 lg:pt-10">
        <ExplorerClient />
      </div>
    </div>
  );
}
