"use client";

import {
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import { featuredCity } from "@/lib/data";
import { Card, Stat } from "@/components/ui/Card";
import { getRiskLevel } from "@/lib/utils";

const sparkData = featuredCity.history.map((p) => ({
  year: p.year,
  value: p.sustainability,
}));

export function DashboardPreview() {
  const risk = getRiskLevel(featuredCity.riskScore);

  return (
    <Card padding="none" className="overflow-hidden border-brand/20 shadow-[0_24px_60px_-38px_rgba(74,222,128,.35)]">
      <div className="border-b border-border bg-[#0b120e] px-5 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">
              Network pulse · selected city
            </p>
            <p className="mt-0.5 text-base font-semibold text-foreground">
              {featuredCity.name}, {featuredCity.stateCode}
            </p>
          </div>
          <span className="flex items-center gap-1.5 text-[11px] font-medium text-text-secondary"><span className="h-1.5 w-1.5 rounded-full bg-brand" />Monitoring</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-px bg-border">
        <div className="bg-[#111a14] p-4">
          <Stat label="AQI" value={featuredCity.airQuality.aqi} />
        </div>
        <div className="bg-[#111a14] p-4">
          <Stat
            label="Sustainability"
            value={featuredCity.sustainability.score}
            unit="/100"
          />
        </div>
        <div className="bg-[#111a14] p-4">
          <Stat
            label="Emissions"
            value={featuredCity.emissions.totalCo2}
            unit="Mt"
            delta={featuredCity.emissions.yearlyChange}
          />
        </div>
        <div className="bg-[#111a14] p-4">
          <p className="text-sm font-medium text-text-secondary">Risk score</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">
            {featuredCity.riskScore}
            <span className="ml-2 text-sm font-medium" style={{ color: risk.color }}>
              {risk.label}
            </span>
          </p>
        </div>
      </div>

      <div className="border-t border-border px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-foreground">Sustainability trend</p>
          <p className="text-sm font-medium text-accent">
            +{featuredCity.sustainability.yearlyChange}% YoY
          </p>
        </div>
        <div className="h-24 min-w-0">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} initialDimension={{ width: 440, height: 96 }}>
            <AreaChart data={sparkData}>
              <defs>
                <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#16a34a" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#16a34a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="#16a34a"
                strokeWidth={2}
                fill="url(#spark)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 flex items-center gap-4 text-xs text-text-secondary">
          <span>PM2.5: {featuredCity.airQuality.pm25} µg/m³</span>
          <span>O₃: {featuredCity.airQuality.o3} ppb</span>
          <span>Network rank #{featuredCity.sustainability.nationalRank}</span>
        </div>
      </div>
    </Card>
  );
}
