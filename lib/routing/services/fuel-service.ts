import type { IFuelService } from "../interfaces/fuel-service.interface";
import type { FuelStop } from "../models/fuel-stop";

export class FuelService implements IFuelService {
  findCheapestFuelStop(fuelStops: FuelStop[]): FuelStop | null {
    if (fuelStops.length === 0) {
      return null;
    }

    return fuelStops.reduce((cheapest, current) =>
      current.dieselPrice < cheapest.dieselPrice ? current : cheapest,
    );
  }

  estimateFuelCost(totalMiles: number, mpg: number, dieselPrice: number): number {
    if (mpg <= 0 || dieselPrice <= 0) {
      return 0;
    }

    return Number(((totalMiles / mpg) * dieselPrice).toFixed(2));
  }
}