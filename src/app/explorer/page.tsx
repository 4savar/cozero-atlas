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
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-brand">City Explorer</h1>
          <p className="mt-2 text-sm text-text-secondary">
            Search and analyze environmental data for tracked US metropolitan areas.
          </p>
        </div>
        <ExplorerClient />
      </div>
    </div>
  );
}
