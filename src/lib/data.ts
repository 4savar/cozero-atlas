import type { City, GlobalStats } from "./types";

export const EXPANDED_CITY_DATA_SOURCE = {
  population: "U.S. Census Bureau, Vintage 2025 Population Estimates",
  populationYear: 2025,
  geography: "U.S. Census Bureau, 2025 Gazetteer Files",
  lastVerified: "2026-07-23",
} as const;

type LegacyCity = Omit<
  City,
  "dataStatus" | "populationSource" | "populationYear" | "geographySource" | "lastVerified"
>;

type CitySeed = Pick<City, "name" | "state" | "stateCode" | "population" | "lat" | "lng">;

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

const legacyCities: LegacyCity[] = [
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

const additionalCitySeeds: CitySeed[] = [
  { name: "Phoenix", state: "Arizona", stateCode: "AZ", population: 1665481, lat: 33.572154, lng: -112.090132 },
  { name: "San Diego", state: "California", stateCode: "CA", population: 1406106, lat: 32.830391, lng: -117.120923 },
  { name: "San Jose", state: "California", stateCode: "CA", population: 989814, lat: 37.296011, lng: -121.814552 },
  { name: "San Francisco", state: "California", stateCode: "CA", population: 826079, lat: 37.727239, lng: -123.032229 },
  { name: "Las Vegas", state: "Nevada", stateCode: "NV", population: 679817, lat: 36.233499, lng: -115.264037 },
  { name: "Portland", state: "Oregon", stateCode: "OR", population: 635109, lat: 45.536951, lng: -122.649971 },
  { name: "Albuquerque", state: "New Mexico", stateCode: "NM", population: 556588, lat: 35.10478, lng: -106.646809 },
  { name: "Fresno", state: "California", stateCode: "CA", population: 555549, lat: 36.782684, lng: -119.793359 },
  { name: "Tucson", state: "Arizona", stateCode: "AZ", population: 548371, lat: 32.153036, lng: -110.870773 },
  { name: "Sacramento", state: "California", stateCode: "CA", population: 536449, lat: 38.567694, lng: -121.468161 },
  { name: "Mesa", state: "Arizona", stateCode: "AZ", population: 513656, lat: 33.399355, lng: -111.715968 },
  { name: "Colorado Springs", state: "Colorado", stateCode: "CO", population: 494743, lat: 38.867255, lng: -104.760749 },
  { name: "Long Beach", state: "California", stateCode: "CA", population: 450469, lat: 33.780791, lng: -118.16818 },
  { name: "Oakland", state: "California", stateCode: "CA", population: 440838, lat: 37.769846, lng: -122.22569 },
  { name: "Bakersfield", state: "California", stateCode: "CA", population: 422165, lat: 35.353171, lng: -119.037919 },
  { name: "Aurora", state: "Colorado", stateCode: "CO", population: 410053, lat: 39.709537, lng: -104.720509 },
  { name: "Henderson", state: "Nevada", stateCode: "NV", population: 353289, lat: 36.008958, lng: -115.0268 },
  { name: "Urban Honolulu", state: "Hawaii", stateCode: "HI", population: 341868, lat: 21.324347, lng: -157.84764 },
  { name: "Anaheim", state: "California", stateCode: "CA", population: 341008, lat: 33.855502, lng: -117.758657 },
  { name: "Stockton", state: "California", stateCode: "CA", population: 324597, lat: 37.976553, lng: -121.308598 },
  { name: "Riverside", state: "California", stateCode: "CA", population: 323057, lat: 33.938143, lng: -117.393168 },
  { name: "Irvine", state: "California", stateCode: "CA", population: 318764, lat: 33.678399, lng: -117.771254 },
  { name: "Santa Ana", state: "California", stateCode: "CA", population: 315586, lat: 33.736332, lng: -117.8829 },
  { name: "North Las Vegas", state: "Nevada", stateCode: "NV", population: 296653, lat: 36.289865, lng: -115.089181 },
  { name: "Gilbert", state: "Arizona", stateCode: "AZ", population: 287285, lat: 33.310345, lng: -111.743121 },
  { name: "Anchorage", state: "Alaska", stateCode: "AK", population: 287155, lat: 61.17425, lng: -149.284329 },
  { name: "Reno", state: "Nevada", stateCode: "NV", population: 283621, lat: 39.549097, lng: -119.849907 },
  { name: "Chandler", state: "Arizona", stateCode: "AZ", population: 278748, lat: 33.282765, lng: -111.851819 },
  { name: "Chula Vista", state: "California", stateCode: "CA", population: 275533, lat: 32.62767, lng: -117.01517 },
  { name: "Glendale", state: "Arizona", stateCode: "AZ", population: 260572, lat: 33.533111, lng: -112.189901 },
  { name: "Scottsdale", state: "Arizona", stateCode: "AZ", population: 243006, lat: 33.684272, lng: -111.861448 },
  { name: "Boise City", state: "Idaho", stateCode: "ID", population: 238429, lat: 43.59805, lng: -116.231596 },
  { name: "Spokane", state: "Washington", stateCode: "WA", population: 230783, lat: 47.666935, lng: -117.433322 },
  { name: "Tacoma", state: "Washington", stateCode: "WA", population: 229816, lat: 47.252199, lng: -122.459832 },
  { name: "Santa Clarita", state: "California", stateCode: "CA", population: 228430, lat: 34.416504, lng: -118.500693 },
  { name: "Fremont", state: "California", stateCode: "CA", population: 226442, lat: 37.49446, lng: -121.94115 },
  { name: "San Bernardino", state: "California", stateCode: "CA", population: 222044, lat: 34.14114, lng: -117.294635 },
  { name: "Fontana", state: "California", stateCode: "CA", population: 221223, lat: 34.109686, lng: -117.462888 },
  { name: "Modesto", state: "California", stateCode: "CA", population: 219652, lat: 37.637533, lng: -121.003049 },
  { name: "Salt Lake City", state: "Utah", stateCode: "UT", population: 218428, lat: 40.776928, lng: -111.930991 },
  { name: "Moreno Valley", state: "California", stateCode: "CA", population: 214263, lat: 33.923253, lng: -117.205685 },
  { name: "Peoria", state: "Arizona", stateCode: "AZ", population: 200881, lat: 33.786186, lng: -112.308042 },
  { name: "Vancouver", state: "Washington", stateCode: "WA", population: 199698, lat: 45.637156, lng: -122.596567 },
  { name: "Oxnard", state: "California", stateCode: "CA", population: 199651, lat: 34.199436, lng: -119.207515 },
  { name: "Huntington Beach", state: "California", stateCode: "CA", population: 191451, lat: 33.698007, lng: -118.003834 },
  { name: "Tempe", state: "Arizona", stateCode: "AZ", population: 190571, lat: 33.388414, lng: -111.931782 },
  { name: "Glendale", state: "California", stateCode: "CA", population: 187160, lat: 34.181393, lng: -118.24583 },
  { name: "Ontario", state: "California", stateCode: "CA", population: 187013, lat: 34.037042, lng: -117.605956 },
  { name: "Elk Grove", state: "California", stateCode: "CA", population: 185007, lat: 38.414621, lng: -121.384961 },
  { name: "Salem", state: "Oregon", stateCode: "OR", population: 181779, lat: 44.9239, lng: -123.023007 },
  { name: "Santa Rosa", state: "California", stateCode: "CA", population: 179437, lat: 38.445824, lng: -122.706181 },
  { name: "Eugene", state: "Oregon", stateCode: "OR", population: 178618, lat: 44.056848, lng: -123.119019 },
  { name: "Rancho Cucamonga", state: "California", stateCode: "CA", population: 177856, lat: 34.130306, lng: -117.566067 },
  { name: "Surprise", state: "Arizona", stateCode: "AZ", population: 175304, lat: 33.670801, lng: -112.452546 },
  { name: "Fort Collins", state: "Colorado", stateCode: "CO", population: 171500, lat: 40.548216, lng: -105.064833 },
  { name: "Oceanside", state: "California", stateCode: "CA", population: 170483, lat: 33.224601, lng: -117.306291 },
  { name: "Garden Grove", state: "California", stateCode: "CA", population: 170455, lat: 33.778782, lng: -117.960472 },
  { name: "Lancaster", state: "California", stateCode: "CA", population: 170084, lat: 34.693558, lng: -118.175305 },
  { name: "Roseville", state: "California", stateCode: "CA", population: 167302, lat: 38.770296, lng: -121.319634 },
  { name: "Palmdale", state: "California", stateCode: "CA", population: 161845, lat: 34.591038, lng: -118.105403 },
  { name: "Corona", state: "California", stateCode: "CA", population: 161734, lat: 33.861969, lng: -117.565495 },
  { name: "Salinas", state: "California", stateCode: "CA", population: 159134, lat: 36.690217, lng: -121.633793 },
  { name: "Hayward", state: "California", stateCode: "CA", population: 157113, lat: 37.626826, lng: -122.104015 },
  { name: "Lakewood", state: "Colorado", stateCode: "CO", population: 156927, lat: 39.698939, lng: -105.117573 },
  { name: "Sunnyvale", state: "California", stateCode: "CA", population: 156577, lat: 37.385797, lng: -122.026316 },
  { name: "Bellevue", state: "Washington", stateCode: "WA", population: 154193, lat: 47.597837, lng: -122.15648 },
  { name: "Pomona", state: "California", stateCode: "CA", population: 147807, lat: 34.058494, lng: -117.761091 },
  { name: "Thornton", state: "Colorado", stateCode: "CO", population: 147766, lat: 39.920433, lng: -104.941413 },
  { name: "Visalia", state: "California", stateCode: "CA", population: 146541, lat: 36.32921, lng: -119.326984 },
  { name: "Escondido", state: "California", stateCode: "CA", population: 146030, lat: 33.133053, lng: -117.074043 },
  { name: "Meridian", state: "Idaho", stateCode: "ID", population: 142988, lat: 43.61149, lng: -116.400662 },
  { name: "Victorville", state: "California", stateCode: "CA", population: 141395, lat: 34.527735, lng: -117.353579 },
  { name: "Fullerton", state: "California", stateCode: "CA", population: 138675, lat: 33.885716, lng: -117.928025 },
  { name: "Torrance", state: "California", stateCode: "CA", population: 138391, lat: 33.830453, lng: -118.356618 },
  { name: "Orange", state: "California", stateCode: "CA", population: 138365, lat: 33.786971, lng: -117.861265 },
  { name: "West Valley City", state: "Utah", stateCode: "UT", population: 137491, lat: 40.688493, lng: -112.011759 },
  { name: "Pasadena", state: "California", stateCode: "CA", population: 135804, lat: 34.160602, lng: -118.137954 },
  { name: "Kent", state: "Washington", stateCode: "WA", population: 134871, lat: 47.390008, lng: -122.213528 },
  { name: "Santa Clara", state: "California", stateCode: "CA", population: 133446, lat: 37.364621, lng: -121.967973 },
  { name: "Clovis", state: "California", stateCode: "CA", population: 129347, lat: 36.827809, lng: -119.681843 },
  { name: "Buckeye", state: "Arizona", stateCode: "AZ", population: 125445, lat: 33.431573, lng: -112.641626 },
  { name: "Goodyear", state: "Arizona", stateCode: "AZ", population: 125359, lat: 33.254031, lng: -112.366472 },
  { name: "Simi Valley", state: "California", stateCode: "CA", population: 124861, lat: 34.266887, lng: -118.748458 },
  { name: "Vallejo", state: "California", stateCode: "CA", population: 123287, lat: 38.106909, lng: -122.262339 },
  { name: "Concord", state: "California", stateCode: "CA", population: 123261, lat: 37.972184, lng: -122.001587 },
  { name: "Arvada", state: "Colorado", stateCode: "CO", population: 122901, lat: 39.833728, lng: -105.150306 },
  { name: "Fairfield", state: "California", stateCode: "CA", population: 122489, lat: 38.261965, lng: -122.032389 },
  { name: "Thousand Oaks", state: "California", stateCode: "CA", population: 122230, lat: 34.19329, lng: -118.874235 },
  { name: "Berkeley", state: "California", stateCode: "CA", population: 121911, lat: 37.865673, lng: -122.298725 },
  { name: "Nampa", state: "Idaho", stateCode: "ID", population: 120384, lat: 43.586441, lng: -116.56389 },
  { name: "Antioch", state: "California", stateCode: "CA", population: 118958, lat: 37.978336, lng: -121.796064 },
  { name: "Menifee", state: "California", stateCode: "CA", population: 118592, lat: 33.689858, lng: -117.184383 },
  { name: "Las Cruces", state: "New Mexico", stateCode: "NM", population: 116978, lat: 32.326444, lng: -106.789695 },
  { name: "West Jordan", state: "Utah", stateCode: "UT", population: 116812, lat: 40.602666, lng: -112.001255 },
  { name: "Westminster", state: "Colorado", stateCode: "CO", population: 116182, lat: 39.880122, lng: -105.061513 },
  { name: "Greeley", state: "Colorado", stateCode: "CO", population: 115073, lat: 40.414034, lng: -104.771043 },
  { name: "Temecula", state: "California", stateCode: "CA", population: 114865, lat: 33.493073, lng: -117.131734 },
  { name: "Richmond", state: "California", stateCode: "CA", population: 114861, lat: 37.952278, lng: -122.360609 },
  { name: "Provo", state: "Utah", stateCode: "UT", population: 114527, lat: 40.245312, lng: -111.645057 },
  { name: "Rio Rancho", state: "New Mexico", stateCode: "NM", population: 114419, lat: 35.28507, lng: -106.698867 },
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function demoSeed(name: string) {
  return [...name].reduce((total, character) => total + character.charCodeAt(0), 0);
}

function representativeCity(seed: CitySeed, index: number): City {
  const variation = demoSeed(`${seed.name}-${seed.stateCode}`);
  const perCapita = Number((6.5 + (variation % 105) / 10).toFixed(1));
  const totalCo2 = Number(((seed.population * perCapita) / 1_000_000).toFixed(1));
  const aqi = 38 + (variation % 48);
  const sustainabilityScore = 54 + (variation % 31);
  const status: City["airQuality"]["status"] = aqi <= 50 ? "Good" : "Moderate";
  const transport = 30 + (variation % 19);
  const buildings = 24 + ((variation * 3) % 15);
  const industry = 14 + ((variation * 5) % 11);
  const yearlyChange = Number((-1.1 - (variation % 34) / 10).toFixed(1));

  return {
    id: `${slugify(seed.name)}-${seed.stateCode.toLowerCase()}`,
    ...seed,
    dataStatus: "demo",
    populationSource: EXPANDED_CITY_DATA_SOURCE.population,
    populationYear: EXPANDED_CITY_DATA_SOURCE.populationYear,
    geographySource: EXPANDED_CITY_DATA_SOURCE.geography,
    lastVerified: EXPANDED_CITY_DATA_SOURCE.lastVerified,
    emissions: {
      totalCo2,
      perCapita,
      yearlyChange,
      sectorBreakdown: [
        { sector: "Transport", percentage: transport },
        { sector: "Buildings", percentage: buildings },
        { sector: "Industry", percentage: industry },
        { sector: "Waste", percentage: 100 - transport - buildings - industry },
      ],
    },
    airQuality: {
      aqi,
      pm25: Number((7 + (variation % 110) / 10).toFixed(1)),
      o3: 28 + (variation % 27),
      no2: 13 + (variation % 22),
      status,
    },
    sustainability: {
      score: sustainabilityScore,
      nationalRank: index + 18,
      yearlyChange: Number((1.1 + (variation % 23) / 10).toFixed(1)),
      categories: [
        { name: "Transit", score: 52 + (variation % 35) },
        { name: "Renewables", score: 56 + ((variation * 2) % 31) },
        { name: "Green Space", score: 48 + ((variation * 3) % 36) },
        { name: "Waste Mgmt", score: 54 + ((variation * 5) % 31) },
      ],
    },
    history: history(Math.round(totalCo2 * 1000 * 1.11), aqi + 5, sustainabilityScore - 8),
    riskScore: 30 + (variation % 42),
  };
}

export const additionalCities = additionalCitySeeds.map(representativeCity);

export const cities: City[] = [
  ...legacyCities.map((city) => ({ ...city, dataStatus: "demo" as const })),
  ...additionalCities,
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
