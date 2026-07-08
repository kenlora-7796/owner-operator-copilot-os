import type { Route } from "./route";
import type { Waypoint } from "./waypoint";
import type { FuelStop } from "./fuel-stop";
import type { TruckStop } from "./truck-stop";
import type { Parking } from "./parking";
import type { WeatherAlert } from "./weather";
import type { TrafficIncident } from "./traffic";
import type { HazmatRestriction } from "./hazmat";
import type { LowBridgeWarning } from "./bridge";

export interface RoutePlan {
  id: string;
  route: Route;
  waypoints: Waypoint[];
  fuelStops: FuelStop[];
  truckStops: TruckStop[];
  parkingOptions: Parking[];
  weatherAlerts: WeatherAlert[];
  trafficIncidents: TrafficIncident[];
  hazmatRestrictions: HazmatRestriction[];
  lowBridgeWarnings: LowBridgeWarning[];
  aiRecommendation: string;
  riskScore: number;
  estimatedTotalCost: number;
  createdAt: string;
}