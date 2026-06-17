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

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <Card padding="none" className="overflow-hidden shadow-[0_16px_40px_-32px_rgba(6,78,59,0.45)]">
            <div className="flex items-center justify-between border-b border-border bg-white px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span className="text-xs font-semibold uppercase tracking-wide text-foreground">Air quality layer</span>
              </div>
              <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-text-secondary">
                {cities.length} metros
              </span>
            </div>
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full bg-[#f4f8f5]"
              role="img"
              aria-label="Map of tracked US cities"
            >
              <defs>
                <linearGradient id="map-land" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ecfdf5" />
                  <stop offset="100%" stopColor="#d1fae5" />
                </linearGradient>
                <radialGradient id="map-glow" cx="50%" cy="45%" r="60%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#dbece3" stopOpacity="0.25" />
                </radialGradient>
                <filter id="marker-shadow" x="-100%" y="-100%" width="300%" height="300%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#064e3b" floodOpacity="0.25" />
                </filter>
              </defs>
              <rect width={W} height={H} fill="url(#map-glow)" />
              <g stroke="#064e3b" strokeOpacity="0.055" strokeWidth="1">
                {[120, 240, 360, 480, 600, 720].map((x) => (
                  <line key={`v-${x}`} x1={x} y1="0" x2={x} y2={H} />
                ))}
                {[96, 192, 288, 384].map((y) => (
                  <line key={`h-${y}`} x1="0" y1={y} x2={W} y2={y} />
                ))}
              </g>

              {/* Continental outline */}
              <path
                d="M 74 112 L 145 78 L 250 66 L 348 76 L 430 62 L 530 72 L 610 87 L 672 86 L 724 120 L 755 162 L 739 190 L 750 224 L 724 248 L 710 290 L 672 312 L 650 355 L 612 391 L 559 410 L 520 393 L 477 405 L 442 380 L 405 376 L 364 350 L 329 352 L 291 322 L 250 309 L 217 278 L 180 261 L 151 226 L 116 209 L 98 170 Z"
                fill="url(#map-land)"
                stroke="#064e3b"
                strokeWidth="1.5"
                strokeOpacity="0.3"
              />

              {cities.map((city) => {
                const { x, y } = latLngToMapPosition(city.lat, city.lng, W - 100, H - 80);
                const cx = x + 50;
                const cy = y + 40;
                const isActive = active.id === city.id;
                const color = getAqiColor(city.airQuality.aqi);

                return (
                  <g
                    key={city.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`${city.name}, ${city.stateCode}: AQI ${city.airQuality.aqi}`}
                    onMouseEnter={() => setActive(city)}
                    onFocus={() => setActive(city)}
                    onClick={() => goToCity(city)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        goToCity(city);
                      }
                    }}
                    className="cursor-pointer outline-none"
                  >
                    {isActive && (
                      <>
                        <circle cx={cx} cy={cy} r="18" fill={color} opacity="0.12" />
                        <circle cx={cx} cy={cy} r="12" fill="none" stroke={color} strokeWidth="1" opacity="0.35" />
                      </>
                    )}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isActive ? 7 : 6}
                      fill={color}
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      filter="url(#marker-shadow)"
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

            <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-border bg-white px-4 py-3">
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

          <Card padding="none" className="overflow-hidden shadow-[0_16px_40px_-32px_rgba(6,78,59,0.45)]">
            <div className="border-b border-border bg-gradient-to-br from-brand to-brand-hover p-5 text-white">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-white/70">Selected metro</p>
              <p className="mt-1 text-base font-semibold">
              {active.name}, {active.stateCode}
              </p>
              <p className="mt-1 text-sm text-white/70">
                {active.state} · Pop. {formatPopulation(active.population)}
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-px bg-border">
              {[
                { label: "AQI", value: active.airQuality.aqi },
                { label: "Sustainability", value: `${active.sustainability.score}/100` },
                { label: "CO₂ emissions", value: `${active.emissions.totalCo2} Mt` },
                { label: "Risk score", value: active.riskScore },
              ].map((item) => (
                <div key={item.label} className="bg-white p-4">
                  <dt className="text-xs font-medium text-text-secondary">{item.label}</dt>
                  <dd className="mt-0.5 text-lg font-semibold text-foreground">{item.value}</dd>
                </div>
              ))}
            </dl>

            <div className="p-4">
              <button
                type="button"
                onClick={() => goToCity(active)}
                className="w-full rounded-lg bg-brand py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/20"
              >
                Open city report
              </button>
            </div>

            <ul className="max-h-36 space-y-0.5 overflow-y-auto border-t border-border p-3">
              {cities.map((city) => (
                <li key={city.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(city)}
                    onClick={() => goToCity(city)}
                    className={`flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/20 ${
                      active.id === city.id ? "bg-accent-light" : ""
                    }`}
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
