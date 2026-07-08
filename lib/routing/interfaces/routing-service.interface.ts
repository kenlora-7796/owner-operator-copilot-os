import type { Route } from "../models/route";
import type { Waypoint } from "../models/waypoint";

export interface CreateRouteInput {
  origin: string;
  destination: string;
  priority: Route["priority"];
  waypoints?: Waypoint[];
}

export interface IRoutingService {
  createDraftRoute(input: CreateRouteInput): Route;
  validateRoute(route: Route): boolean;
}