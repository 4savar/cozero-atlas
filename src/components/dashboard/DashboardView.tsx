"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { cities, aggregateEmissionsTrend, aggregateAqiTrend, globalStats } from "@/lib/data";
import { getRiskLevel, getAqiColor } from "@/lib/utils";
import { Card, Stat } from "@/components/ui/Card";

const tooltipStyle = {
  backgroundColor: "#111a14",
  border: "1px solid rgba(180,221,193,.2)",
  borderRadius: "6px",
  fontSize: "13px",
  color: "#f4f7f5",
};

export function DashboardView() {
  const avgRisk = Math.round(cities.reduce((s, c) => s + c.riskScore, 0) / cities.length);
  const risk = getRiskLevel(avgRisk);

  const topSustainable = [...cities]
    .sort((a, b) => b.sustainability.score - a.sustainability.score)
    .slice(0, 3);

  const lowestEmissions = [...cities]
    .sort((a, b) => a.emissions.perCapita - b.emissions.perCapita)
    .slice(0, 3);

  return (
    <>
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {[
          { label: "Cities tracked", value: globalStats.citiesTracked, color: "bg-emerald-700" },
          { label: "Avg. sustainability", value: globalStats.avgSustainabilityScore, unit: "/100", color: "bg-emerald-500" },
          { label: "Total emissions", value: globalStats.totalEmissionsMt, unit: "Mt", color: "bg-amber-500" },
          { label: "Cities improving", value: `${globalStats.citiesImproving}/${globalStats.citiesTracked}`, color: "bg-sky-500" },
        ].map((item) => (
          <Card key={item.label} padding="md" className="relative overflow-hidden border-border bg-[#111a14] shadow-none">
            <span className={`absolute inset-x-0 top-0 h-0.5 ${item.color}`} />
            <Stat label={item.label} value={item.value} unit={item.unit} />
          </Card>
        ))}
      </div>

      <Card padding="lg" className="mb-6 border-brand/20 bg-[#0b120e] shadow-[0_18px_40px_-32px_rgba(74,222,128,.2)]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Environmental risk score</h2>
            <p className="mt-1 text-sm text-text-secondary">Network-wide composite risk assessment</p>
          </div>
          <span className="rounded-full border border-brand/20 bg-accent-light px-2.5 py-1 text-xs font-medium text-brand">Network model</span>
        </div>
        <div className="mt-6 flex flex-col gap-7 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div
              className="flex h-24 w-24 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${risk.color}18` }}
            >
              <span className="text-3xl font-bold" style={{ color: risk.color }}>{avgRisk}</span>
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">{risk.label} risk</p>
              <p className="text-sm text-text-secondary">Across {cities.length} tracked cities</p>
            </div>
          </div>
          <div className="grid flex-1 grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
            {[
              { name: "Emissions intensity", score: 52 },
              { name: "Air quality", score: 48 },
              { name: "Climate vulnerability", score: 44 },
              { name: "Infrastructure", score: 36 },
            ].map((f) => (
              <div key={f.name}>
                <div className="flex justify-between text-xs text-text-secondary mb-1">
                  <span>{f.name}</span>
                  <span className="font-medium text-foreground">{f.score}</span>
                </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-surface">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${f.score}%`, backgroundColor: getRiskLevel(f.score).color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="mb-6 grid gap-5 lg:grid-cols-2">
        <Card padding="lg" className="min-w-0 bg-[#111a14] shadow-none">
          <h2 className="text-sm font-semibold text-foreground">Emissions trends</h2>
          <p className="mt-1 text-sm text-text-secondary">Combined output (Mt), 2019–2025</p>
          <div className="mt-4 h-56 min-h-[224px] min-w-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} initialDimension={{ width: 500, height: 224 }}>
              <AreaChart data={aggregateEmissionsTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(180,221,193,.14)" vertical={false} />
                <XAxis dataKey="year" tick={{ fill: "#a3b0a7", fontSize: 12 }} tickLine={false} axisLine={{ stroke: "rgba(180,221,193,.14)" }} />
                <YAxis tick={{ fill: "#a3b0a7", fontSize: 12 }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="emissions" name="Emissions (Mt)" stroke="#4ade80" strokeWidth={2} fill="#123a22" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card padding="lg" className="min-w-0 bg-[#111a14] shadow-none">
          <h2 className="text-sm font-semibold text-foreground">AQI trends</h2>
          <p className="text-sm text-text-secondary mt-1">Average air quality index, 2019–2025</p>
          <div className="mt-4 h-56 min-h-[224px] min-w-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} initialDimension={{ width: 500, height: 224 }}>
              <BarChart data={aggregateAqiTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(180,221,193,.14)" vertical={false} />
                <XAxis dataKey="year" tick={{ fill: "#a3b0a7", fontSize: 12 }} tickLine={false} axisLine={{ stroke: "rgba(180,221,193,.14)" }} />
                <YAxis tick={{ fill: "#a3b0a7", fontSize: 12 }} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="aqi" name="AQI" fill="#22c55e" radius={[3, 3, 0, 0]} maxBarSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card padding="lg" className="bg-[#111a14] shadow-none">
          <h2 className="text-sm font-semibold text-foreground">Top sustainable cities</h2>
          <ul className="mt-4 space-y-2">
            {topSustainable.map((city, i) => (
              <li key={city.id} className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-accent-light text-xs font-semibold text-brand">{i + 1}</span>
                  <span className="text-sm font-medium text-foreground">{city.name}, {city.stateCode}</span>
                </div>
                <span className="text-sm font-semibold text-brand">{city.sustainability.score}/100</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card padding="lg" className="bg-[#111a14] shadow-none">
          <h2 className="text-sm font-semibold text-foreground">Lowest per-capita emissions</h2>
          <ul className="mt-4 space-y-2">
            {lowestEmissions.map((city, i) => (
              <li key={city.id} className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-accent-light text-xs font-semibold text-brand">{i + 1}</span>
                  <span className="text-sm font-medium text-foreground">{city.name}, {city.stateCode}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-brand">{city.emissions.perCapita} t</span>
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: getAqiColor(city.airQuality.aqi) }} />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
