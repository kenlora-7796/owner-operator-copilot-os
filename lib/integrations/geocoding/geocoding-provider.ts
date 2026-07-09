import type { Coordinates } from "../types";

export interface GeocodingProvider {
  geocode(address: string): Promise<Coordinates>;
  reverseGeocode(location: Coordinates): Promise<string>;
}
