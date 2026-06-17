import type { City, GlobalStats } from "./types";

function history(
  baseEmissions: number,
  baseAqi: number,
  baseSustainability: number
) {
  return [2019, 2020, 2021, 2022, 2023, 2024, 2025].map((year, i) => ({
    year,
    emissions: Math.round(baseEmissions * (1 - i * 0.018 + Math.sin(i) * 0.01)),
    aqi: Math.round(baseAqi * (1 - i * 0.012 + Math.cos(i) * 0.008)),
    sustainability: Math.min(
      100,
      Math.round(baseSustainability + i * 1.8 + Math.sin(i * 0.7) * 2)
    ),
  }));
}

export const cities: City[] = [
  {
    id: "new-york",
    name: "New York",
    state: "New York",
    stateCode: "NY",
    population: 8_336_817,
    lat: 40.7128,
    lng: -74.006,
    riskScore: 42,
    emissions: {
      totalCo2: 52.4,
      perCapita: 6.3,
      yearlyChange: -3.2,
      sectorBreakdown: [
        { sector: "Transport", percentage: 38 },
        { sector: "Buildings", percentage: 32 },
        { sector: "Industry", percentage: 18 },
        { sector: "Waste", percentage: 12 },
      ],
    },
    airQuality: { aqi: 58, pm25: 12.4, o3: 38, no2: 22, status: "Moderate" },
    sustainability: {
      score: 74,
      nationalRank: 8,
      yearlyChange: 2.4,
      categories: [
        { name: "Transit", score: 88 },
        { name: "Renewables", score: 71 },
        { name: "Green Space", score: 65 },
        { name: "Waste Mgmt", score: 72 },
      ],
    },
    history: history(58000, 62, 68),
  },
  {
    id: "los-angeles",
    name: "Los Angeles",
    state: "California",
    stateCode: "CA",
    population: 3_898_747,
    lat: 34.0522,
    lng: -118.2437,
    riskScore: 58,
    emissions: {
      totalCo2: 38.1,
      perCapita: 9.8,
      yearlyChange: -2.1,
      sectorBreakdown: [
        { sector: "Transport", percentage: 52 },
        { sector: "Buildings", percentage: 22 },
        { sector: "Industry", percentage: 16 },
        { sector: "Waste", percentage: 10 },
      ],
    },
    airQuality: { aqi: 72, pm25: 18.2, o3: 52, no2: 28, status: "Moderate" },
    sustainability: {
      score: 68,
      nationalRank: 14,
      yearlyChange: 1.8,
      categories: [
        { name: "Transit", score: 62 },
        { name: "Renewables", score: 78 },
        { name: "Green Space", score: 58 },
        { name: "Waste Mgmt", score: 74 },
      ],
    },
    history: history(42000, 78, 62),
  },
  {
    id: "chicago",
    name: "Chicago",
    state: "Illinois",
    stateCode: "IL",
    population: 2_746_388,
    lat: 41.8781,
    lng: -87.6298,
    riskScore: 48,
    emissions: {
      totalCo2: 28.6,
      perCapita: 10.4,
      yearlyChange: -2.8,
      sectorBreakdown: [
        { sector: "Transport", percentage: 34 },
        { sector: "Buildings", percentage: 36 },
        { sector: "Industry", percentage: 22 },
        { sector: "Waste", percentage: 8 },
      ],
    },
    airQuality: { aqi: 54, pm25: 11.8, o3: 42, no2: 24, status: "Moderate" },
    sustainability: {
      score: 71,
      nationalRank: 11,
      yearlyChange: 2.1,
      categories: [
        { name: "Transit", score: 76 },
        { name: "Renewables", score: 68 },
        { name: "Green Space", score: 72 },
        { name: "Waste Mgmt", score: 68 },
      ],
    },
    history: history(32000, 58, 65),
  },
  {
    id: "houston",
    name: "Houston",
    state: "Texas",
    stateCode: "TX",
    population: 2_304_580,
    lat: 29.7604,
    lng: -95.3698,
    riskScore: 65,
    emissions: {
      totalCo2: 34.2,
      perCapita: 14.8,
      yearlyChange: -1.2,
      sectorBreakdown: [
        { sector: "Transport", percentage: 42 },
        { sector: "Buildings", percentage: 24 },
        { sector: "Industry", percentage: 28 },
        { sector: "Waste", percentage: 6 },
      ],
    },
    airQuality: { aqi: 68, pm25: 14.6, o3: 48, no2: 32, status: "Moderate" },
    sustainability: {
      score: 58,
      nationalRank: 28,
      yearlyChange: 1.2,
      categories: [
        { name: "Transit", score: 48 },
        { name: "Renewables", score: 55 },
        { name: "Green Space", score: 52 },
        { name: "Waste Mgmt", score: 62 },
      ],
    },
    history: history(38000, 72, 54),
  },
  {
    id: "seattle",
    name: "Seattle",
    state: "Washington",
    stateCode: "WA",
    population: 737_015,
    lat: 47.6062,
    lng: -122.3321,
    riskScore: 28,
    emissions: {
      totalCo2: 8.4,
      perCapita: 11.4,
      yearlyChange: -4.1,
      sectorBreakdown: [
        { sector: "Transport", percentage: 36 },
        { sector: "Buildings", percentage: 34 },
        { sector: "Industry", percentage: 20 },
        { sector: "Waste", percentage: 10 },
      ],
    },
    airQuality: { aqi: 42, pm25: 8.2, o3: 32, no2: 18, status: "Good" },
    sustainability: {
      score: 82,
      nationalRank: 3,
      yearlyChange: 3.2,
      categories: [
        { name: "Transit", score: 84 },
        { name: "Renewables", score: 88 },
        { name: "Green Space", score: 78 },
        { name: "Waste Mgmt", score: 80 },
      ],
    },
    history: history(9800, 46, 76),
  },
  {
    id: "denver",
    name: "Denver",
    state: "Colorado",
    stateCode: "CO",
    population: 715_522,
    lat: 39.7392,
    lng: -104.9903,
    riskScore: 38,
    emissions: {
      totalCo2: 9.2,
      perCapita: 12.9,
      yearlyChange: -2.6,
      sectorBreakdown: [
        { sector: "Transport", percentage: 40 },
        { sector: "Buildings", percentage: 30 },
        { sector: "Industry", percentage: 22 },
        { sector: "Waste", percentage: 8 },
      ],
    },
    airQuality: { aqi: 52, pm25: 10.4, o3: 44, no2: 20, status: "Moderate" },
    sustainability: {
      score: 76,
      nationalRank: 6,
      yearlyChange: 2.8,
      categories: [
        { name: "Transit", score: 72 },
        { name: "Renewables", score: 82 },
        { name: "Green Space", score: 74 },
        { name: "Waste Mgmt", score: 76 },
      ],
    },
    history: history(10800, 56, 70),
  },
  {
    id: "boston",
    name: "Boston",
    state: "Massachusetts",
    stateCode: "MA",
    population: 675_647,
    lat: 42.3601,
    lng: -71.0589,
    riskScore: 32,
    emissions: {
      totalCo2: 7.8,
      perCapita: 11.5,
      yearlyChange: -3.8,
      sectorBreakdown: [
        { sector: "Transport", percentage: 32 },
        { sector: "Buildings", percentage: 38 },
        { sector: "Industry", percentage: 20 },
        { sector: "Waste", percentage: 10 },
      ],
    },
    airQuality: { aqi: 46, pm25: 9.6, o3: 36, no2: 19, status: "Good" },
    sustainability: {
      score: 79,
      nationalRank: 5,
      yearlyChange: 2.9,
      categories: [
        { name: "Transit", score: 86 },
        { name: "Renewables", score: 74 },
        { name: "Green Space", score: 70 },
        { name: "Waste Mgmt", score: 78 },
      ],
    },
    history: history(9200, 50, 73),
  },
  {
    id: "atlanta",
    name: "Atlanta",
    state: "Georgia",
    stateCode: "GA",
    population: 498_715,
    lat: 33.749,
    lng: -84.388,
    riskScore: 52,
    emissions: {
      totalCo2: 11.4,
      perCapita: 22.9,
      yearlyChange: -1.4,
      sectorBreakdown: [
        { sector: "Transport", percentage: 46 },
        { sector: "Buildings", percentage: 26 },
        { sector: "Industry", percentage: 20 },
        { sector: "Waste", percentage: 8 },
      ],
    },
    airQuality: { aqi: 62, pm25: 13.2, o3: 46, no2: 26, status: "Moderate" },
    sustainability: {
      score: 62,
      nationalRank: 22,
      yearlyChange: 1.5,
      categories: [
        { name: "Transit", score: 54 },
        { name: "Renewables", score: 64 },
        { name: "Green Space", score: 60 },
        { name: "Waste Mgmt", score: 66 },
      ],
    },
    history: history(12800, 66, 58),
  },
];

export const globalStats: GlobalStats = {
  citiesTracked: cities.length,
  avgSustainabilityScore: Math.round(
    cities.reduce((sum, c) => sum + c.sustainability.score, 0) / cities.length
  ),
  totalEmissionsMt:
    Math.round(cities.reduce((sum, c) => sum + c.emissions.totalCo2, 0) * 10) /
    10,
  citiesImproving: cities.filter((c) => c.emissions.yearlyChange < 0).length,
};

export const featuredCity = cities.find((c) => c.id === "seattle")!;

export const aggregateEmissionsTrend = [2019, 2020, 2021, 2022, 2023, 2024, 2025].map(
  (year) => ({
    year: year.toString(),
    emissions: Math.round(
      cities.reduce((sum, c) => {
        const point = c.history.find((h) => h.year === year);
        return sum + (point?.emissions ?? 0);
      }, 0) / 1000
    ),
  })
);

export const aggregateAqiTrend = [2019, 2020, 2021, 2022, 2023, 2024, 2025].map(
  (year) => ({
    year: year.toString(),
    aqi: Math.round(
      cities.reduce((sum, c) => {
        const point = c.history.find((h) => h.year === year);
        return sum + (point?.aqi ?? 0);
      }, 0) / cities.length
    ),
  })
);
