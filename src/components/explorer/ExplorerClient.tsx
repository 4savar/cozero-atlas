"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
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
import { getCityById, formatPopulation, getAqiColor, getRiskLevel } from "@/lib/utils";
import { CitySearch } from "@/components/ui/CitySearch";
import { Card, Badge, Stat } from "@/components/ui/Card";
import type { City } from "@/lib/types";

function EmissionsPanel({ city }: { city: City }) {
  return (
    <Card padding="lg">
      <h3 className="text-sm font-semibold text-foreground">Emissions</h3>
      <p className="text-sm text-text-secondary mt-1">City-level CO₂ output and sector breakdown</p>
      <div className="mt-5 grid grid-cols-3 gap-4">
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
        <Badge>{city.airQuality.status}</Badge>
      </div>
      <div className="mt-5 flex items-center gap-6">
        <div
          className="flex h-20 w-20 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${color}18` }}
        >
          <span className="text-3xl font-bold" style={{ color }}>{city.airQuality.aqi}</span>
        </div>
        <dl className="grid grid-cols-3 gap-4 flex-1">
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
      <h3 className="text-sm font-semibold text-foreground">Sustainability score</h3>
      <p className="text-sm text-text-secondary mt-1">Composite rating across key categories</p>
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
      <h3 className="text-sm font-semibold text-foreground">Historical trends</h3>
      <p className="text-sm text-text-secondary mt-1">2019–2025 performance for {city.name}</p>
      <div className="mt-5 h-64 min-h-[256px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="year" tick={{ fill: "#374151", fontSize: 12 }} tickLine={false} axisLine={{ stroke: "#e5e7eb" }} />
            <YAxis tick={{ fill: "#374151", fontSize: 12 }} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13 }} />
            <Legend />
            <Line type="monotone" dataKey="Emissions" stroke="#064e3b" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="AQI" stroke="#16a34a" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="Sustainability" stroke="#065f46" strokeWidth={2} strokeDasharray="4 4" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function ExplorerContent() {
  const searchParams = useSearchParams();
  const cityParam = searchParams.get("city");
  const [selected, setSelected] = useState<City>(
    getCityById(cities, cityParam ?? "") ?? cities[0]
  );

  useEffect(() => {
    if (cityParam) {
      const city = getCityById(cities, cityParam);
      if (city) setSelected(city);
    }
  }, [cityParam]);

  const risk = getRiskLevel(selected.riskScore);

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-brand">{selected.name}</h1>
            <Badge>{selected.stateCode}</Badge>
          </div>
          <p className="mt-1 text-sm text-text-secondary">
            {selected.state} · Pop. {formatPopulation(selected.population)} · Risk:{" "}
            <span style={{ color: risk.color }} className="font-medium">{risk.label}</span>
          </p>
        </div>
        <div className="w-full max-w-xs">
          <CitySearch onSelect={setSelected} placeholder="Switch city..." />
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <EmissionsPanel city={selected} />
        <AirQualityPanel city={selected} />
        <SustainabilityPanel city={selected} />
        <Card padding="lg">
          <h3 className="text-sm font-semibold text-foreground">Quick metrics</h3>
          <dl className="mt-5 grid grid-cols-2 gap-4">
            {[
              { label: "Risk score", value: selected.riskScore },
              { label: "National rank", value: `#${selected.sustainability.nationalRank}` },
              { label: "Emissions change", value: `${selected.emissions.yearlyChange}%` },
              { label: "AQI status", value: selected.airQuality.status },
            ].map((item) => (
              <div key={item.label} className="rounded-lg bg-surface p-3">
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
        <h2 className="text-sm font-semibold text-foreground mb-3">All cities</h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {cities.map((city) => (
            <button
              key={city.id}
              type="button"
              onClick={() => setSelected(city)}
              className={`rounded-lg border p-3 text-left text-sm transition-colors ${
                selected.id === city.id
                  ? "border-brand bg-accent-light"
                  : "border-border bg-white hover:bg-surface"
              }`}
            >
              <p className="font-medium text-foreground">{city.name}, {city.stateCode}</p>
              <p className="text-xs text-text-secondary mt-0.5">
                AQI {city.airQuality.aqi} · Score {city.sustainability.score}
              </p>
            </button>
          ))}
        </div>
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
