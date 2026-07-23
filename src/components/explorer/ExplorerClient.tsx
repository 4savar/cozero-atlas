"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { cities } from "@/lib/data";
import { getCityById, formatPopulation, getAqiColor, getRiskLevel, searchCities } from "@/lib/utils";
import { CitySearch } from "@/components/ui/CitySearch";
import { Card, Badge, Stat } from "@/components/ui/Card";
import type { City } from "@/lib/types";

function EmissionsPanel({ city }: { city: City }) {
  return (
    <Card padding="lg">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Emissions</h3>
          <p className="mt-1 text-sm text-text-secondary">CO₂ output and sector breakdown</p>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Stat label="Total" value={city.emissions.totalCo2} unit="Mt" delta={city.emissions.yearlyChange} />
        <Stat label="Per capita" value={city.emissions.perCapita} unit="t" />
        <Stat label="YoY change" value={`${city.emissions.yearlyChange}%`} />
      </div>
      <div className="mt-6 space-y-3">
        {city.emissions.sectorBreakdown.map((s) => (
          <div key={s.sector}>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">{s.sector}</span>
              <span className="font-medium text-foreground">{s.percentage}%</span>
            </div>
            <div className="mt-1.5 h-1.5 rounded-full bg-surface overflow-hidden">
              <div className="h-full rounded-full bg-brand" style={{ width: `${s.percentage}%` }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function AirQualityPanel({ city }: { city: City }) {
  const color = getAqiColor(city.airQuality.aqi);
  return (
    <Card padding="lg">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Air quality</h3>
          <p className="text-sm text-text-secondary mt-1">Current index and pollutant levels</p>
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <Badge>{city.airQuality.status}</Badge>
        </div>
      </div>
      <div className="mt-5 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6">
        <div
          className="flex h-20 w-20 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${color}18` }}
        >
          <span className="text-3xl font-bold" style={{ color }}>{city.airQuality.aqi}</span>
        </div>
        <dl className="grid w-full flex-1 grid-cols-3 gap-3 sm:gap-4">
          {[
            { label: "PM2.5", value: `${city.airQuality.pm25} µg/m³` },
            { label: "O₃", value: `${city.airQuality.o3} ppb` },
            { label: "NO₂", value: `${city.airQuality.no2} ppb` },
          ].map((p) => (
            <div key={p.label}>
              <dt className="text-xs font-medium text-text-secondary">{p.label}</dt>
              <dd className="text-sm font-semibold text-foreground mt-0.5">{p.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Card>
  );
}

function SustainabilityPanel({ city }: { city: City }) {
  return (
    <Card padding="lg">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Sustainability score</h3>
          <p className="mt-1 text-sm text-text-secondary">Composite rating across key categories</p>
        </div>
      </div>
      <div className="mt-5 flex items-center gap-6">
        <p className="text-4xl font-bold text-brand">{city.sustainability.score}</p>
        <div className="text-sm text-text-secondary space-y-1">
          <p>National rank <span className="font-semibold text-foreground">#{city.sustainability.nationalRank}</span></p>
          <p>YoY change <span className="font-semibold text-accent">+{city.sustainability.yearlyChange}%</span></p>
        </div>
      </div>
      <div className="mt-5 space-y-3">
        {city.sustainability.categories.map((cat) => (
          <div key={cat.name}>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">{cat.name}</span>
              <span className="font-medium text-foreground">{cat.score}</span>
            </div>
            <div className="mt-1 h-1.5 rounded-full bg-surface overflow-hidden">
              <div className="h-full rounded-full bg-accent" style={{ width: `${cat.score}%` }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function TrendsPanel({ city }: { city: City }) {
  const data = city.history.map((p) => ({
    year: p.year.toString(),
    Emissions: Math.round(p.emissions / 1000),
    AQI: p.aqi,
    Sustainability: p.sustainability,
  }));

  return (
    <Card padding="lg">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Historical trends</h3>
          <p className="mt-1 text-sm text-text-secondary">2019–2025 trend for {city.name}</p>
        </div>
      </div>
      <div className="mt-5 h-64 min-h-[256px] min-w-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} initialDimension={{ width: 960, height: 256 }}>
          <LineChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(180,221,193,.14)" />
            <XAxis dataKey="year" tick={{ fill: "#a3b0a7", fontSize: 12 }} tickLine={false} axisLine={{ stroke: "rgba(180,221,193,.14)" }} />
            <YAxis tick={{ fill: "#a3b0a7", fontSize: 12 }} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ backgroundColor: "#111a14", border: "1px solid rgba(180,221,193,.2)", borderRadius: 6, fontSize: 13, color: "#f4f7f5" }} />
            <Legend />
            <Line type="monotone" dataKey="Emissions" stroke="#4ade80" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="AQI" stroke="#f59e0b" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="Sustainability" stroke="#86efac" strokeWidth={2} strokeDasharray="4 4" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function ExplorerContent() {
  const searchParams = useSearchParams();
  const cityParam = searchParams.get("city");
  const routeCity = getCityById(cities, cityParam ?? "") ?? cities[0];
  const [manualSelection, setManualSelection] = useState<{
    city: City;
    routeParam: string | null;
  } | null>(null);
  const [directoryQuery, setDirectoryQuery] = useState("");
  const selected =
    manualSelection?.routeParam === cityParam ? manualSelection.city : routeCity;

  function selectCity(city: City) {
    setManualSelection({ city, routeParam: cityParam });
  }

  const risk = getRiskLevel(selected.riskScore);
  const directoryCities = searchCities(cities, directoryQuery).slice(0, 12);

  return (
    <>
      <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-brand">{selected.name}</h1>
            <Badge>{selected.stateCode}</Badge>
          </div>
          <p className="mt-1 text-sm text-text-secondary">
            {selected.state} · Pop. {formatPopulation(selected.population)} · Risk:{" "}
            <span style={{ color: risk.color }} className="font-medium">{risk.label}</span>
          </p>
          <p className="mt-2 text-xs text-text-secondary">
            {selected.populationSource && `Population: Census Vintage ${selected.populationYear} · Geography: Census 2025 Gazetteer · Verified ${selected.lastVerified}`}
          </p>
        </div>
        <div className="w-full max-w-xs">
          <CitySearch onSelect={selectCity} placeholder="Switch city..." />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <EmissionsPanel city={selected} />
        <AirQualityPanel city={selected} />
        <SustainabilityPanel city={selected} />
        <Card padding="lg">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Quick metrics</h3>
              <p className="mt-1 text-sm text-text-secondary">City performance profile</p>
            </div>
          </div>
          <dl className="mt-5 grid grid-cols-2 gap-4">
            {[
              { label: "Risk score", value: selected.riskScore },
              { label: "National rank", value: `#${selected.sustainability.nationalRank}` },
              { label: "Emissions change", value: `${selected.emissions.yearlyChange}%` },
              { label: "AQI status", value: selected.airQuality.status },
            ].map((item) => (
              <div key={item.label} className="rounded-md border border-border bg-surface p-3">
                <dt className="text-xs font-medium text-text-secondary">{item.label}</dt>
                <dd className="mt-0.5 text-lg font-semibold text-foreground">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>

      <div className="mt-5">
        <TrendsPanel city={selected} />
      </div>

      <div className="mt-8">
        <div className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-foreground">City directory</h2>
            <p className="mt-1 text-sm text-text-secondary">Search across all {cities.length} tracked places; showing up to 12 matches.</p>
          </div>
          <label className="w-full sm:w-64">
            <span className="sr-only">Filter city directory</span>
            <input
              value={directoryQuery}
              onChange={(event) => setDirectoryQuery(event.target.value)}
              placeholder="Filter city directory…"
              className="h-10 w-full rounded-md border border-border bg-white px-3 text-sm text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10"
            />
          </label>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {directoryCities.map((city) => (
            <button
              key={city.id}
              type="button"
              onClick={() => selectCity(city)}
              className={`rounded-md border p-3 text-left text-sm transition-colors ${
                selected.id === city.id
                  ? "border-brand bg-accent-light"
                  : "border-border bg-white hover:bg-surface"
              }`}
            >
              <p className="font-medium text-foreground">{city.name}, {city.stateCode}</p>
              <p className="text-xs text-text-secondary mt-0.5">
                Pop. {formatPopulation(city.population)} · {city.airQuality.status}
              </p>
            </button>
          ))}
        </div>
        {!directoryCities.length && (
          <div className="mt-4 rounded-xl border border-dashed border-border bg-surface px-4 py-8 text-center text-sm text-text-secondary">
            No cities match “{directoryQuery}”. Try a city, state, or postal abbreviation.
          </div>
        )}
      </div>
    </>
  );
}

export function ExplorerClient() {
  return (
    <Suspense fallback={<div className="h-40 animate-pulse rounded-xl bg-surface" />}>
      <ExplorerContent />
    </Suspense>
  );
}
