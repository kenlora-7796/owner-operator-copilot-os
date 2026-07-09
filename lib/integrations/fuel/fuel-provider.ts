import type { Coordinates } from "../types";

export interface FuelPrice {
  truckStop: string;
  dieselPrice: number;
}

export interface FuelProvider {
  getFuelPrices(location: Coordinates): Promise<FuelPrice[]>;
}
