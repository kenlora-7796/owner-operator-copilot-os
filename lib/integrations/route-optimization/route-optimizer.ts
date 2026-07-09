import type { RouteRequest, RouteResult } from "../types";

export interface RouteOptimizer {
  optimize(request: RouteRequest): Promise<RouteResult>;
}