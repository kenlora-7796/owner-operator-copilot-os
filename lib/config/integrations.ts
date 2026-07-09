export const integrationConfig = {
  googleMaps: {
    enabled: false,
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  },

  weather: {
    enabled: false,
    apiKey: process.env.NEXT_PUBLIC_WEATHER_API_KEY ?? "",
  },

  traffic: {
    enabled: false,
    apiKey: process.env.NEXT_PUBLIC_TRAFFIC_API_KEY ?? "",
  },

  fuel: {
    enabled: false,
    apiKey: process.env.NEXT_PUBLIC_FUEL_API_KEY ?? "",
  },

  parking: {
    enabled: false,
    apiKey: process.env.NEXT_PUBLIC_TRUCK_PARKING_API_KEY ?? "",
  },

  geocoding: {
    enabled: false,
    apiKey: process.env.NEXT_PUBLIC_GEOCODING_API_KEY ?? "",
  },
} as const;