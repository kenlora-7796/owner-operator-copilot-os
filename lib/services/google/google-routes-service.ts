export interface GoogleRouteRequest {
  origin: string;
  destination: string;
}

export interface LiveRouteResult {
  origin: string;
  destination: string;
  distanceMiles: number;
  estimatedDriveTimeMinutes: number;
  encodedPolyline: string | null;
  provider: "google_maps";
  live: true;
}

interface GoogleRoute {
  distanceMeters?: number;
  duration?: string;
  polyline?: {
    encodedPolyline?: string;
  };
}

interface GoogleRoutesResponse {
  routes?: GoogleRoute[];
  error?: {
    message?: string;
    status?: string;
  };
}

export class GoogleRoutesService {
  private readonly endpoint =
    "https://routes.googleapis.com/directions/v2:computeRoutes";

  private durationToMinutes(duration?: string): number {
    if (!duration) {
      return 0;
    }

    const seconds = Number(duration.replace(/s$/, ""));

    if (!Number.isFinite(seconds)) {
      return 0;
    }

    return Math.round(seconds / 60);
  }

  async computeRoute(
    request: GoogleRouteRequest
  ): Promise<LiveRouteResult> {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      throw new Error("Google Maps API key is not configured.");
    }

    const origin = request.origin.trim();
    const destination = request.destination.trim();

    if (!origin || !destination) {
      throw new Error("Origin and destination are required.");
    }

    const response = await fetch(this.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "routes.distanceMeters,routes.duration,routes.polyline.encodedPolyline",
      },
      body: JSON.stringify({
        origin: {
          address: origin,
        },
        destination: {
          address: destination,
        },
        travelMode: "DRIVE",
        routingPreference: "TRAFFIC_AWARE",
        units: "IMPERIAL",
      }),
      cache: "no-store",
    });

    const data = (await response.json()) as GoogleRoutesResponse;

    if (!response.ok) {
      throw new Error(
        data.error?.message ??
          `Google Routes request failed with status ${response.status}.`
      );
    }

    const route = data.routes?.[0];

    if (!route) {
      throw new Error("Google returned no route.");
    }

    const distanceMeters = route.distanceMeters ?? 0;

    return {
      origin,
      destination,
      distanceMiles:
        Math.round((distanceMeters / 1609.344) * 10) / 10,
      estimatedDriveTimeMinutes: this.durationToMinutes(
        route.duration
      ),
      encodedPolyline:
        route.polyline?.encodedPolyline ?? null,
      provider: "google_maps",
      live: true,
    };
  }
}

export const googleRoutesService =
  new GoogleRoutesService();