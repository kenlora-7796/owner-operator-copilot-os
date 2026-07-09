import type { Coordinates } from "../types";

export interface TruckParkingLocation {
  name: string;
  availableSpaces: number;
}

export interface ParkingProvider {
  findParking(location: Coordinates): Promise<TruckParkingLocation[]>;
}