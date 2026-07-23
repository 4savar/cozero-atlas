"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { cities, EXPANDED_CITY_DATA_SOURCE } from "@/lib/data";
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
  return layer === "aqi" ? getAqiColor(city.airQuality.aqi) : "#064e3b";
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
    <Section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-5 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            title="Explore the city network"
            description="Browse 108 U.S. places through a responsive map, then open a detailed city report."
            className="mb-0"
          />
          <div className="rounded-lg border border-border bg-white p-1 shadow-sm">
            {layers.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setLayer(item.id)}
                className={`rounded-md px-3 py-2 text-xs font-semibold transition-colors ${
                  layer === item.id
                    ? "bg-brand text-white"
                    : "text-text-secondary hover:bg-surface hover:text-foreground"
                }`}
                aria-pressed={layer === item.id}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3 text-xs leading-relaxed text-emerald-950 sm:flex-row sm:items-center sm:justify-between">
          <span>
            <strong>Data status:</strong> Population and geography use Census Vintage 2025; environmental metrics are representative demo values.
          </span>
          <span className="shrink-0 font-medium">Verified {EXPANDED_CITY_DATA_SOURCE.lastVerified}</span>
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
          <Card padding="none" className="min-w-0 overflow-hidden shadow-[0_20px_44px_-34px_rgba(6,78,59,0.55)]">
            <div className="flex flex-col gap-3 border-b border-border bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground">Map workspace</span>
                <span className="rounded-full bg-surface px-2 py-0.5 text-xs font-medium text-text-secondary">{cities.length} places</span>
              </div>
              <div className="w-full sm:w-60">
                <CitySearch onSelect={setActive} placeholder="Find a city…" />
              </div>
            </div>

            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="block w-full bg-[#f4f8f5]"
              role="img"
              aria-label="Map of tracked U.S. cities with clustered markers"
            >
              <defs>
                <linearGradient id="map-land" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#f0fdf4" />
                  <stop offset="100%" stopColor="#d1fae5" />
                </linearGradient>
                <radialGradient id="map-glow" cx="51%" cy="42%" r="68%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#dbece3" stopOpacity="0.35" />
                </radialGradient>
                <filter id="marker-shadow" x="-100%" y="-100%" width="300%" height="300%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2.2" floodColor="#064e3b" floodOpacity="0.24" />
                </filter>
              </defs>
              <rect width={W} height={H} fill="url(#map-glow)" />
              <g stroke="#064e3b" strokeOpacity="0.055" strokeWidth="1">
                {[110, 220, 330, 440, 550, 660, 770, 880].map((x) => <line key={`v-${x}`} x1={x} y1="0" x2={x} y2={H} />)}
                {[104, 208, 312, 416].map((y) => <line key={`h-${y}`} x1="0" y1={y} x2={W} y2={y} />)}
              </g>
              <path
                d="M 95 128 L 165 91 L 265 75 L 365 86 L 457 70 L 548 80 L 637 95 L 703 93 L 770 127 L 810 169 L 793 199 L 808 232 L 781 260 L 766 304 L 727 327 L 703 370 L 658 406 L 603 425 L 562 407 L 515 418 L 477 392 L 437 388 L 393 361 L 355 364 L 315 334 L 272 320 L 235 287 L 194 270 L 161 234 L 124 216 L 104 179 Z"
                fill="url(#map-land)"
                stroke="#064e3b"
                strokeWidth="1.5"
                strokeOpacity="0.28"
              />
              <g fill="#e7f3eb" stroke="#064e3b" strokeOpacity="0.22" strokeWidth="1">
                <path d="M 52 388 L 124 374 L 158 398 L 136 437 L 77 443 Z" />
                <path d="M 196 448 L 300 438 L 324 469 L 223 480 Z" />
              </g>
              <g fill="#517061" fontSize="10" fontWeight="600" letterSpacing="0.7">
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
                    <circle cx={marker.x} cy={marker.y} r={radius + 3} fill="#ffffff" opacity="0.82" />
                    <circle cx={marker.x} cy={marker.y} r={radius} fill={color} stroke="#ffffff" strokeWidth="2" filter="url(#marker-shadow)" />
                    {count > 1 && (
                      <text x={marker.x} y={marker.y + 3.5} textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="700">{count}</text>
                    )}
                  </g>
                );
              })}

              <g pointerEvents="none">
                <circle cx={activePosition.x} cy={activePosition.y} r="15" fill="none" stroke="#064e3b" strokeWidth="1.5" opacity="0.7" />
                <circle cx={activePosition.x} cy={activePosition.y} r="10" fill="none" stroke="#ffffff" strokeWidth="3" opacity="0.95" />
                <text x={activePosition.x} y={activePosition.y - 19} textAnchor="middle" fill="#064e3b" fontSize="11" fontWeight="700">{active.name}</text>
              </g>
            </svg>

            <div className="flex flex-col gap-2 border-t border-border bg-white px-4 py-3 text-xs text-text-secondary sm:flex-row sm:items-center sm:justify-between">
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

          <Card padding="none" className="overflow-hidden shadow-[0_20px_44px_-34px_rgba(6,78,59,0.55)]">
            <div className="bg-brand px-5 py-5 text-white">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.13em] text-white/70">Selected city</p>
                <span className="rounded-full border border-white/20 bg-white/10 px-2 py-1 text-[11px] font-medium">Demo environment</span>
              </div>
              <p className="mt-2 text-xl font-semibold tracking-tight">{active.name}, {active.stateCode}</p>
              <p className="mt-1 text-sm text-white/70">{active.state} · Pop. {formatPopulation(active.population)}</p>
            </div>

            <dl className="grid grid-cols-2 gap-px bg-border">
              {[
                { label: "Population", value: formatPopulation(active.population), detail: active.populationYear ? "Census 2025" : "Legacy record" },
                { label: "AQI", value: active.airQuality.aqi, detail: "Representative" },
                { label: "CO₂ output", value: `${active.emissions.totalCo2} Mt`, detail: "Representative" },
                { label: "Risk score", value: active.riskScore, detail: "Demo model" },
              ].map((item) => (
                <div key={item.label} className="bg-white p-4">
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
                className="w-full rounded-lg bg-brand py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/20"
              >
                Open city report
              </button>
              <p className="text-xs leading-relaxed text-text-secondary">
                {active.populationSource
                  ? `Population: ${active.populationSource}, July 1, ${active.populationYear}.`
                  : "Environmental values are illustrative demo data in this legacy Atlas record."}
              </p>
            </div>

            <div className="border-t border-border bg-surface px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-secondary">Largest places in Atlas</p>
              <div className="mt-2 grid grid-cols-2 gap-1">
                {largestCities.map((city) => (
                  <button
                    key={city.id}
                    type="button"
                    onClick={() => setActive(city)}
                    className={`rounded-md px-2 py-1.5 text-left text-xs transition-colors ${
                      city.id === active.id ? "bg-accent-light text-brand" : "text-text-secondary hover:bg-white hover:text-foreground"
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
