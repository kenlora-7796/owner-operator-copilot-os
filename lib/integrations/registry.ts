import type { IntegrationHealth } from "./types";

export const integrationRegistry: IntegrationHealth[] = [
  {
    provider: "google_maps",
    status: "not_configured",
    message: "Google Maps provider is not connected yet.",
  },
  {
    provider: "weather_api",
    status: "not_configured",
    message: "Weather provider is not connected yet.",
  },
  {
    provider: "traffic_api",
    status: "not_configured",
    message: "Traffic provider is not connected yet.",
  },
  {
    provider: "fuel_api",
    status: "not_configured",
    message: "Fuel price provider is not connected yet.",
  },
  {
    provider: "truck_parking_api",
    status: "not_configured",
    message: "Truck parking provider is not connected yet.",
  },
  {
    provider: "geocoding_api",
    status: "not_configured",
    message: "Geocoding provider is not connected yet.",
  },
  {
    provider: "route_optimizer",
    status: "not_configured",
    message: "Route optimization engine is not connected yet.",
  },
];
