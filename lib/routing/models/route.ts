export type RouteStatus =
  | "draft"
  | "planned"
  | "in_progress"
  | "completed"
  | "cancelled";

export type RoutePriority =
  | "lowest_cost"
  | "fastest_time"
  | "safest_route"
  | "fuel_optimized"
  | "truck_compliant";

export interface Route {
  id: string;
  title: string;
  origin: string;
  destination: string;
  totalMiles: number;
  estimatedDriveTimeMinutes: number;
  estimatedFuelCost: number;
  status: RouteStatus;
  priority: RoutePriority;
  createdAt: string;
  updatedAt: string;
}