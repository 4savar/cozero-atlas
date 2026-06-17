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
  backgroundColor: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  fontSize: "13px",
  color: "#111827",
};

export function ChartPanels() {
  return (
    <Section className="bg-surface border-y border-border">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeader
          title="Network-wide trends"
          description="Aggregate emissions and air quality trajectories across all tracked cities, 2019–2025."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <Card padding="lg">
            <div className="mb-5">
              <h3 className="text-sm font-semibold text-foreground">
                Total emissions
              </h3>
              <p className="text-sm text-text-secondary mt-1">
                Combined CO₂ output (kt) across tracked metros
              </p>
            </div>
            <div className="h-56 min-h-[224px] min-w-0">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} initialDimension={{ width: 520, height: 224 }}>
                <AreaChart data={aggregateEmissionsTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis
                    dataKey="year"
                    tick={{ fill: "#374151", fontSize: 12 }}
                    axisLine={{ stroke: "#e5e7eb" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#374151", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area
                    type="monotone"
                    dataKey="emissions"
                    name="Emissions (kt)"
                    stroke="#064e3b"
                    strokeWidth={2}
                    fill="#dcfce7"
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
                Mean air quality index across tracked cities
              </p>
            </div>
            <div className="h-56 min-h-[224px] min-w-0">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} initialDimension={{ width: 520, height: 224 }}>
                <BarChart data={aggregateAqiTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis
                    dataKey="year"
                    tick={{ fill: "#374151", fontSize: 12 }}
                    axisLine={{ stroke: "#e5e7eb" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#374151", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 100]}
                  />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar
                    dataKey="aqi"
                    name="AQI"
                    fill="#16a34a"
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
