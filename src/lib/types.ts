export interface EmissionsData {
  totalCo2: number;
  perCapita: number;
  yearlyChange: number;
  sectorBreakdown: { sector: string; percentage: number }[];
}

export interface AirQualityData {
  aqi: number;
  pm25: number;
  o3: number;
  no2: number;
  status: "Good" | "Moderate" | "Unhealthy for Sensitive Groups" | "Unhealthy";
}

export interface SustainabilityData {
  score: number;
  nationalRank: number;
  yearlyChange: number;
  categories: { name: string; score: number }[];
}

export interface HistoricalPoint {
  year: number;
  emissions: number;
  aqi: number;
  sustainability: number;
}

export interface City {
  id: string;
  name: string;
  state: string;
  stateCode: string;
  population: number;
  lat: number;
  lng: number;
  emissions: EmissionsData;
  airQuality: AirQualityData;
  sustainability: SustainabilityData;
  history: HistoricalPoint[];
  riskScore: number;
}

export interface GlobalStats {
  citiesTracked: number;
  avgSustainabilityScore: number;
  totalEmissionsMt: number;
  citiesImproving: number;
}
