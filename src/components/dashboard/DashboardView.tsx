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
  backgroundColor: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  fontSize: "13px",
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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {[
          { label: "Cities tracked", value: globalStats.citiesTracked },
          { label: "Avg. sustainability", value: globalStats.avgSustainabilityScore, unit: "/100" },
          { label: "Total emissions", value: globalStats.totalEmissionsMt, unit: "Mt" },
          { label: "Cities improving", value: `${globalStats.citiesImproving}/${globalStats.citiesTracked}` },
        ].map((item) => (
          <Card key={item.label} padding="md">
            <Stat label={item.label} value={item.value} unit={item.unit} />
          </Card>
        ))}
      </div>

      <Card padding="lg" className="mb-6">
        <h2 className="text-sm font-semibold text-foreground">Environmental risk score</h2>
        <p className="text-sm text-text-secondary mt-1">Network-wide composite risk assessment</p>
        <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-center">
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
          <div className="flex-1 grid grid-cols-2 gap-3">
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
                <div className="h-1.5 rounded-full bg-surface overflow-hidden">
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

      <div className="grid gap-5 lg:grid-cols-2 mb-6">
        <Card padding="lg">
          <h2 className="text-sm font-semibold text-foreground">Emissions trends</h2>
          <p className="text-sm text-text-secondary mt-1">Combined output (kt), 2019–2025</p>
          <div className="mt-4 h-56 min-h-[224px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={aggregateEmissionsTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="year" tick={{ fill: "#374151", fontSize: 12 }} tickLine={false} axisLine={{ stroke: "#e5e7eb" }} />
                <YAxis tick={{ fill: "#374151", fontSize: 12 }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="emissions" name="Emissions (kt)" stroke="#064e3b" strokeWidth={2} fill="#dcfce7" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card padding="lg">
          <h2 className="text-sm font-semibold text-foreground">AQI trends</h2>
          <p className="text-sm text-text-secondary mt-1">Average air quality index, 2019–2025</p>
          <div className="mt-4 h-56 min-h-[224px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aggregateAqiTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="year" tick={{ fill: "#374151", fontSize: 12 }} tickLine={false} axisLine={{ stroke: "#e5e7eb" }} />
                <YAxis tick={{ fill: "#374151", fontSize: 12 }} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="aqi" name="AQI" fill="#16a34a" radius={[4, 4, 0, 0]} maxBarSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card padding="lg">
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

        <Card padding="lg">
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
