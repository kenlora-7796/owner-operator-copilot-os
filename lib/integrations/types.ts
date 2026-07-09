export type IntegrationStatus = "not_configured" | "connected" | "error";

export type ServiceProvider =
  | "google_maps"
  | "weather_api"
  | "traffic_api"
  | "fuel_api"
  | "truck_parking_api"
  | "geocoding_api"
  | "route_optimizer";

export interface IntegrationHealth {
  provider: ServiceProvider;
  status: IntegrationStatus;
  message: string;
  lastCheckedAt?: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface RouteStop {
  id: string;
  label: string;
  address?: string;
  coordinates?: Coordinates;
}

export interface RouteRequest {
  origin: RouteStop;
  destination: RouteStop;
  stops?: RouteStop[];
}

export interface RouteSummary {
  distanceMiles: number;
  estimatedDriveTimeMinutes: number;
  estimatedFuelGallons?: number;
}

export interface RouteResult {
  request: RouteRequest;
  summary: RouteSummary;
  provider: ServiceProvider;
}