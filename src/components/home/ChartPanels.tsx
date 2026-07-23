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
import { aggregateEmissionsTrend, aggregateAqiTrend } from "@/lib/data";
import { Card, Section, SectionHeader } from "@/components/ui/Card";

const tooltipStyle = {
  backgroundColor: "#111a14",
  border: "1px solid rgba(180,221,193,.2)",
  borderRadius: "6px",
  fontSize: "13px",
  color: "#f4f7f5",
};

export function ChartPanels() {
  return (
    <Section className="bg-surface border-y border-border">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          title="Network-wide trends"
          description="Aggregate trajectories across all tracked cities, 2019–2025."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <Card padding="lg">
            <div className="mb-5">
              <h3 className="text-sm font-semibold text-foreground">
                Total emissions
              </h3>
              <p className="text-sm text-text-secondary mt-1">
                Combined CO₂ output (Mt) across tracked places
              </p>
            </div>
            <div className="h-56 min-h-[224px] min-w-0">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} initialDimension={{ width: 520, height: 224 }}>
                <AreaChart data={aggregateEmissionsTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(180,221,193,.14)" vertical={false} />
                  <XAxis
                    dataKey="year"
                    tick={{ fill: "#a3b0a7", fontSize: 12 }}
                    axisLine={{ stroke: "rgba(180,221,193,.14)" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#a3b0a7", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area
                    type="monotone"
                    dataKey="emissions"
                    name="Emissions (Mt)"
                    stroke="#4ade80"
                    strokeWidth={2}
                    fill="#123a22"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card padding="lg">
            <div className="mb-5">
              <h3 className="text-sm font-semibold text-foreground">
                Average AQI
              </h3>
              <p className="text-sm text-text-secondary mt-1">
                Mean air quality index across tracked places
              </p>
            </div>
            <div className="h-56 min-h-[224px] min-w-0">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} initialDimension={{ width: 520, height: 224 }}>
                <BarChart data={aggregateAqiTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(180,221,193,.14)" vertical={false} />
                  <XAxis
                    dataKey="year"
                    tick={{ fill: "#a3b0a7", fontSize: 12 }}
                    axisLine={{ stroke: "rgba(180,221,193,.14)" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#a3b0a7", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 100]}
                  />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar
                    dataKey="aqi"
                    name="AQI"
                    fill="#22c55e"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}
