import type {
  CreateRouteInput,
  IRoutingService,
} from "../interfaces/routing-service.interface";
import type { Route } from "../models/route";

export class RoutingService implements IRoutingService {
  createDraftRoute(input: CreateRouteInput): Route {
    const now = new Date().toISOString();

    return {
      id: crypto.randomUUID(),
      title: `${input.origin} to ${input.destination}`,
      origin: input.origin,
      destination: input.destination,
      totalMiles: 0,
      estimatedDriveTimeMinutes: 0,
      estimatedFuelCost: 0,
      status: "draft",
      priority: input.priority,
      createdAt: now,
      updatedAt: now,
    };
  }

  validateRoute(route: Route): boolean {
    return Boolean(route.origin && route.destination && route.priority);
  }
}