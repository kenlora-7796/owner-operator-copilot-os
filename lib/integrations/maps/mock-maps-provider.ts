import type {
  RouteRequest,
  RouteResult,
} from "../types";
import type { MapsProvider } from "./maps-provider";

export class MockMapsProvider implements MapsProvider {
  async calculateRoute(
    request: RouteRequest
  ): Promise<RouteResult> {
    return {
      request,
      provider: "google_maps",
      summary: {
        distanceMiles: 120,
        estimatedDriveTimeMinutes: 135,
        estimatedFuelGallons: 20,
      },
    };
  }
}