export function formatNumber(n: number, decimals = 0): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatPopulation(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
}

export function getAqiColor(aqi: number): string {
  if (aqi <= 50) return "#16a34a";
  if (aqi <= 100) return "#ca8a04";
  if (aqi <= 150) return "#ea580c";
  return "#dc2626";
}

export function getRiskLevel(score: number): { label: string; color: string } {
  if (score <= 30) return { label: "Low", color: "#16a34a" };
  if (score <= 60) return { label: "Moderate", color: "#ca8a04" };
  if (score <= 80) return { label: "High", color: "#ea580c" };
  return { label: "Critical", color: "#dc2626" };
}

export function latLngToMapPosition(
  lat: number,
  lng: number,
  width: number,
  height: number
): { x: number; y: number } {
  return {
    x: ((lng + 125) / 59) * width,
    y: ((49 - lat) / 25) * height,
  };
}

export function searchCities<T extends { name: string; state: string; stateCode: string }>(
  cities: T[],
  query: string
): T[] {
  const q = query.trim().toLowerCase();
  if (!q) return cities;
  return cities.filter(
    (city) =>
      city.name.toLowerCase().includes(q) ||
      city.state.toLowerCase().includes(q) ||
      city.stateCode.toLowerCase().includes(q)
  );
}

export function getCityById<T extends { id: string }>(
  cities: T[],
  id: string
): T | undefined {
  return cities.find((c) => c.id === id);
}

export function cn(...classes: (string | false | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
