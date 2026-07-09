import type { RouteRequest, RouteResult } from "../types";

export interface MapsProvider {
  calculateRoute(request: RouteRequest): Promise<RouteResult>;
}