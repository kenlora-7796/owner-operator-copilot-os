export interface Coordinates {
  latitude: number;
  longitude: number;
}

interface GoogleGeocodeResponse {
  results?: Array<{
    geometry?: {
      location?: {
        lat?: number;
        lng?: number;
      };
    };
  }>;

  status?: string;
}

export class GoogleGeocodingService {
  async geocode(address: string): Promise<Coordinates> {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      throw new Error("Google Maps API key is not configured.");
    }

    const url =
      `https://maps.googleapis.com/maps/api/geocode/json` +
      `?address=${encodeURIComponent(address)}` +
      `&key=${apiKey}`;

    const response = await fetch(url, {
      cache: "no-store",
    });

    const data =
      (await response.json()) as GoogleGeocodeResponse;

    if (!response.ok || data.status !== "OK") {
      throw new Error("Unable to geocode address.");
    }

    const location =
      data.results?.[0]?.geometry?.location;

    if (!location) {
      throw new Error("Coordinates not found.");
    }

    return {
      latitude: location.lat ?? 0,
      longitude: location.lng ?? 0,
    };
  }
}

export const googleGeocodingService =
  new GoogleGeocodingService();