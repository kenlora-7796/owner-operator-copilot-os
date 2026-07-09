import type { MapsProvider } from "./maps-provider";
import type {
  RouteRequest,
  RouteResult,
} from "../types";

import { httpClient } from "@/lib/http";
import { integrationConfig } from "@/lib/config";

export class GoogleMapsProvider implements MapsProvider {
  async calculateRoute(
    request: RouteRequest
  ): Promise<RouteResult> {
    if (!integrationConfig.googleMaps.enabled) {
      throw new Error(
        "Google Maps integration is disabled."
      );
    }

    // Sprint 5 placeholder.
    // In Sprint 5.11 we'll replace this with a real HTTP request.
    await httpClient.get("https://example.com");

    return {
      request,
      provider: "google_maps",
      summary: {
        distanceMiles: 0,
        estimatedDriveTimeMinutes: 0,
        estimatedFuelGallons: 0,
      },
    };
  }
}