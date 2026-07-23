"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { cities } from "@/lib/data";
import { getAqiColor, formatPopulation, latLngToMapPosition } from "@/lib/utils";
import type { City } from "@/lib/types";
import { Card, Section, SectionHeader } from "@/components/ui/Card";
import { CitySearch } from "@/components/ui/CitySearch";

const W = 920;
const H = 520;
const CLUSTER_SIZE = 28;

type Layer = "aqi" | "population";

type MapMarker = {
  id: string;
  x: number;
  y: number;
  cities: City[];
};

function getMapPosition(city: City) {
  if (city.stateCode === "AK") {
    return {
      x: 62 + ((city.lng + 170) / 30) * 115,
      y: 402 - ((city.lat - 51) / 18) * 82,
    };
  }

  if (city.stateCode === "HI") {
    return {
      x: 216 + ((city.lng + 161) / 8) * 118,
      y: 463 - ((city.lat - 18) / 6) * 46,
    };
  }

  const { x, y } = latLngToMapPosition(city.lat, city.lng, W - 150, H - 125);
  return { x: x + 82, y: y + 55 };
}

function clusterCities(): MapMarker[] {
  const clusters = new Map<string, MapMarker>();

  cities.forEach((city) => {
    const { x, y } = getMapPosition(city);
    const key = `${Math.round(x / CLUSTER_SIZE)}-${Math.round(y / CLUSTER_SIZE)}`;
    const cluster = clusters.get(key);

    if (cluster) {
      cluster.cities.push(city);
      return;
    }

    clusters.set(key, { id: key, x, y, cities: [city] });
  });

  return [...clusters.values()].map((cluster) => ({
    ...cluster,
    cities: [...cluster.cities].sort((a, b) => b.population - a.population),
  }));
}

function markerColor(city: City, layer: Layer) {
  return layer === "aqi" ? getAqiColor(city.airQuality.aqi) : "#22c55e";
}

export function USMapSection() {
  const [active, setActive] = useState<City>(cities[0]);
  const [layer, setLayer] = useState<Layer>("aqi");
  const router = useRouter();
  const markers = useMemo(() => clusterCities(), []);
  const largestCities = useMemo(
    () => [...cities].sort((a, b) => b.population - a.population).slice(0, 8),
    [],
  );
  const activePosition = getMapPosition(active);

  function goToCity(city: City) {
    router.push(`/explorer?city=${city.id}`);
  }

  const layers: { id: Layer; label: string }[] = [
    { id: "aqi", label: "Air quality" },
    { id: "population", label: "Population" },
  ];

  return (
    <Section className="border-y border-border bg-[#080d0a]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-8 flex flex-col gap-5 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            title="Explore the city network"
            description="Browse 108 U.S. places through a responsive map, then open a detailed city report."
            className="mb-0"
          />
          <div className="rounded-md border border-border bg-[#111a14] p-1">
            {layers.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setLayer(item.id)}
                className={`rounded-md px-3 py-2 text-xs font-semibold transition-colors ${
                  layer === item.id
                    ? "bg-brand text-[#041008]"
                    : "text-text-secondary hover:bg-surface hover:text-foreground"
                }`}
                aria-pressed={layer === item.id}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
          <Card padding="none" className="min-w-0 overflow-hidden border-brand/20 shadow-[0_26px_60px_-42px_rgba(0,0,0,0.95)]">
            <div className="flex flex-col gap-3 border-b border-border bg-[#0b120e] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground">Map workspace</span>
                <span className="rounded-full border border-border bg-surface px-2 py-0.5 text-xs font-medium text-text-secondary">{cities.length} places</span>
              </div>
              <div className="w-full sm:w-60">
                <CitySearch onSelect={setActive} placeholder="Find a city…" />
              </div>
            </div>

            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="block w-full bg-[#07110b]"
              role="img"
              aria-label="Map of tracked U.S. cities with clustered markers"
            >
              <defs>
                <linearGradient id="map-land" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#173524" />
                  <stop offset="100%" stopColor="#0b2115" />
                </linearGradient>
                <radialGradient id="map-glow" cx="51%" cy="42%" r="68%">
                  <stop offset="0%" stopColor="#102117" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#07110b" stopOpacity="0.45" />
                </radialGradient>
                <filter id="marker-shadow" x="-100%" y="-100%" width="300%" height="300%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2.2" floodColor="#4ade80" floodOpacity="0.38" />
                </filter>
              </defs>
              <rect width={W} height={H} fill="url(#map-glow)" />
              <g stroke="#86efac" strokeOpacity="0.09" strokeWidth="1">
                {[110, 220, 330, 440, 550, 660, 770, 880].map((x) => <line key={`v-${x}`} x1={x} y1="0" x2={x} y2={H} />)}
                {[104, 208, 312, 416].map((y) => <line key={`h-${y}`} x1="0" y1={y} x2={W} y2={y} />)}
              </g>
              <path
                d="M 95 128 L 165 91 L 265 75 L 365 86 L 457 70 L 548 80 L 637 95 L 703 93 L 770 127 L 810 169 L 793 199 L 808 232 L 781 260 L 766 304 L 727 327 L 703 370 L 658 406 L 603 425 L 562 407 L 515 418 L 477 392 L 437 388 L 393 361 L 355 364 L 315 334 L 272 320 L 235 287 L 194 270 L 161 234 L 124 216 L 104 179 Z"
                fill="url(#map-land)"
                stroke="#4ade80"
                strokeWidth="1.5"
                strokeOpacity="0.28"
              />
              <g fill="#102818" stroke="#4ade80" strokeOpacity="0.3" strokeWidth="1">
                <path d="M 52 388 L 124 374 L 158 398 L 136 437 L 77 443 Z" />
                <path d="M 196 448 L 300 438 L 324 469 L 223 480 Z" />
              </g>
              <g fill="#86efac" opacity="0.75" fontSize="10" fontWeight="600" letterSpacing="0.7">
                <text x="72" y="456">ALASKA</text>
                <text x="230" y="499">HAWAII</text>
              </g>

              {markers.map((marker) => {
                const city = marker.cities[0];
                const color = markerColor(city, layer);
                const count = marker.cities.length;
                const radius = layer === "population"
                  ? Math.min(14, 4 + Math.sqrt(city.population / 25_000))
                  : count > 1
                    ? Math.min(13, 6 + Math.log2(count) * 2)
                    : 5.5;
                const label = count > 1
                  ? `${count} nearby cities, largest is ${city.name}`
                  : `${city.name}, ${city.stateCode}`;

                return (
                  <g
                    key={marker.id}
                    role="button"
                    tabIndex={0}
                    aria-label={label}
                    className="cursor-pointer outline-none"
                    onMouseEnter={() => setActive(city)}
                    onFocus={() => setActive(city)}
                    onClick={() => setActive(city)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setActive(city);
                      }
                    }}
                  >
                    <title>{count > 1 ? `${count} cities clustered here` : `${city.name}, ${city.stateCode}`}</title>
                    <circle cx={marker.x} cy={marker.y} r={radius + 3} fill="#dfffe8" opacity="0.16" />
                    <circle cx={marker.x} cy={marker.y} r={radius} fill={color} stroke="#dfffe8" strokeWidth="1.5" filter="url(#marker-shadow)" />
                    {count > 1 && (
                      <text x={marker.x} y={marker.y + 3.5} textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="700">{count}</text>
                    )}
                  </g>
                );
              })}

              <g pointerEvents="none">
                <circle cx={activePosition.x} cy={activePosition.y} r="17" fill="none" stroke="#4ade80" strokeWidth="1.5" opacity="0.9" />
                <circle cx={activePosition.x} cy={activePosition.y} r="10" fill="none" stroke="#f4f7f5" strokeWidth="2" opacity="0.95" />
                <text x={activePosition.x} y={activePosition.y - 21} textAnchor="middle" fill="#dfffe8" fontSize="11" fontWeight="700">{active.name}</text>
              </g>
            </svg>

            <div className="flex flex-col gap-2 border-t border-border bg-[#0b120e] px-4 py-3 text-xs text-text-secondary sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                {layer === "aqi" ? (
                  <>
                    <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-green-600" />Good 0–50</span>
                    <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-yellow-600" />Moderate 51–100</span>
                    <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-orange-600" />Elevated 101+</span>
                  </>
                ) : (
                  <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-brand" />Marker size indicates place population</span>
                )}
              </div>
              <span>Hover or tap a marker to inspect</span>
            </div>
          </Card>

          <Card padding="none" className="overflow-hidden border-brand/20 shadow-[0_26px_60px_-42px_rgba(0,0,0,0.95)]">
            <div className="bg-[#0b2115] px-5 py-5 text-white">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.13em] text-white/70">Selected city</p>
                <span className="rounded-full border border-brand/30 bg-brand/10 px-2 py-1 text-[11px] font-medium text-brand">Active selection</span>
              </div>
              <p className="mt-2 text-xl font-semibold tracking-tight">{active.name}, {active.stateCode}</p>
              <p className="mt-1 text-sm text-white/70">{active.state} · Pop. {formatPopulation(active.population)}</p>
            </div>

            <dl className="grid grid-cols-2 gap-px bg-border">
              {[
                { label: "Population", value: formatPopulation(active.population), detail: active.populationYear ? "Census 2025" : "Legacy record" },
                { label: "AQI", value: active.airQuality.aqi, detail: active.airQuality.status },
                { label: "CO₂ output", value: `${active.emissions.totalCo2} Mt`, detail: "Annual total" },
                { label: "Risk score", value: active.riskScore, detail: "Network index" },
              ].map((item) => (
                <div key={item.label} className="bg-[#111a14] p-4">
                  <dt className="text-xs font-medium text-text-secondary">{item.label}</dt>
                  <dd className="mt-1 text-lg font-semibold text-foreground">{item.value}</dd>
                  <p className="mt-0.5 text-[11px] text-text-secondary">{item.detail}</p>
                </div>
              ))}
            </dl>

            <div className="space-y-3 p-4">
              <button
                type="button"
                onClick={() => goToCity(active)}
                className="w-full rounded-md bg-brand py-2.5 text-sm font-semibold text-[#041008] transition-colors hover:bg-brand-hover focus-visible:outline-none"
              >
                Open city report
              </button>
              {active.populationSource && (
                <p className="text-xs leading-relaxed text-text-secondary">
                  Population source: Census Vintage {active.populationYear}
                </p>
              )}
            </div>

            <div className="border-t border-border bg-[#0b120e] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-secondary">Largest places in Atlas</p>
              <div className="mt-2 grid grid-cols-2 gap-1">
                {largestCities.map((city) => (
                  <button
                    key={city.id}
                    type="button"
                    onClick={() => setActive(city)}
                    className={`rounded-md px-2 py-1.5 text-left text-xs transition-colors ${
                      city.id === active.id ? "bg-accent-light text-brand" : "text-text-secondary hover:bg-[#111a14] hover:text-foreground"
                    }`}
                  >
                    {city.name}, {city.stateCode}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}
