import type { FuelStop } from "../models/fuel-stop";

export interface IFuelService {
  findCheapestFuelStop(fuelStops: FuelStop[]): FuelStop | null;
  estimateFuelCost(totalMiles: number, mpg: number, dieselPrice: number): number;
}