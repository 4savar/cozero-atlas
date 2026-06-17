"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cities } from "@/lib/data";
import { latLngToMapPosition, getAqiColor, formatPopulation } from "@/lib/utils";
import type { City } from "@/lib/types";
import { Card, Section, SectionHeader } from "@/components/ui/Card";

const W = 800;
const H = 480;

export function USMapSection() {
  const [active, setActive] = useState<City>(cities[0]);
  const router = useRouter();

  function goToCity(city: City) {
    setActive(city);
    router.push(`/explorer?city=${city.id}`);
  }

  return (
    <Section className="bg-surface border-y border-border">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeader
          title="US city coverage"
          description="Select any tracked city to view emissions, air quality, and sustainability metrics."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <Card padding="sm" className="overflow-hidden">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full"
              role="img"
              aria-label="Map of tracked US cities"
            >
              <rect width={W} height={H} fill="#f9fafb" rx="4" />

              {/* Continental outline */}
              <path
                d="M 80 140 L 140 90 L 260 70 L 400 58 L 540 52 L 660 68 L 740 100 L 770 160 L 760 230 L 740 310 L 700 370 L 640 410 L 560 430 L 480 440 L 400 438 L 320 420 L 240 390 L 170 350 L 120 290 L 90 220 Z"
                fill="#dcfce7"
                stroke="#064e3b"
                strokeWidth="1"
                strokeOpacity="0.25"
              />

              {cities.map((city) => {
                const { x, y } = latLngToMapPosition(city.lat, city.lng, W - 100, H - 80);
                const cx = x + 50;
                const cy = y + 40;
                const isActive = active.id === city.id;
                const color = getAqiColor(city.airQuality.aqi);

                return (
                  <g key={city.id}>
                    {isActive && (
                      <circle cx={cx} cy={cy} r="14" fill={color} opacity="0.15" />
                    )}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isActive ? 7 : 5}
                      fill={color}
                      stroke="#ffffff"
                      strokeWidth="2"
                      className="cursor-pointer"
                      onMouseEnter={() => setActive(city)}
                      onClick={() => goToCity(city)}
                    />
                    {isActive && (
                      <text
                        x={cx}
                        y={cy - 12}
                        textAnchor="middle"
                        fill="#064e3b"
                        fontSize="11"
                        fontWeight="600"
                      >
                        {city.name}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            <div className="mt-3 flex flex-wrap gap-4 border-t border-border px-2 pt-3">
              {[
                { label: "Good", color: "#16a34a", range: "0–50" },
                { label: "Moderate", color: "#ca8a04", range: "51–100" },
                { label: "Unhealthy", color: "#ea580c", range: "101+" },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5 text-xs text-text-secondary">
                  <span className="h-2 w-2 rounded-full" style={{ background: l.color }} />
                  {l.label} ({l.range})
                </div>
              ))}
            </div>
          </Card>

          <Card padding="md">
            <p className="text-sm font-semibold text-foreground">
              {active.name}, {active.stateCode}
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              {active.state} · Pop. {formatPopulation(active.population)}
            </p>

            <dl className="mt-5 grid grid-cols-2 gap-4">
              {[
                { label: "AQI", value: active.airQuality.aqi },
                { label: "Sustainability", value: `${active.sustainability.score}/100` },
                { label: "CO₂ emissions", value: `${active.emissions.totalCo2} Mt` },
                { label: "Risk score", value: active.riskScore },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="text-xs font-medium text-text-secondary">{item.label}</dt>
                  <dd className="mt-0.5 text-lg font-semibold text-foreground">{item.value}</dd>
                </div>
              ))}
            </dl>

            <button
              type="button"
              onClick={() => goToCity(active)}
              className="mt-5 w-full rounded-lg bg-brand py-2.5 text-sm font-medium text-white hover:bg-brand-hover transition-colors"
            >
              Open city report
            </button>

            <ul className="mt-5 max-h-36 space-y-0.5 overflow-y-auto border-t border-border pt-4">
              {cities.map((city) => (
                <li key={city.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(city)}
                    onClick={() => goToCity(city)}
                    className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-surface transition-colors"
                  >
                    <span className="text-foreground">
                      {city.name}, {city.stateCode}
                    </span>
                    <span className="text-text-secondary">AQI {city.airQuality.aqi}</span>
                  </button>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </Section>
  );
}
