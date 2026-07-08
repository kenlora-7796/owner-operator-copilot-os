import type { IParkingService } from "../interfaces/parking-service.interface";
import type { Parking } from "../models/parking";

export class ParkingService implements IParkingService {
  findAvailableParking(parkingOptions: Parking[]): Parking[] {
    return parkingOptions.filter(
      (parking) =>
        parking.availability === "available" || parking.availability === "limited",
    );
  }

  findOvernightParking(parkingOptions: Parking[]): Parking[] {
    return this.findAvailableParking(parkingOptions).filter(
      (parking) => parking.overnightAllowed,
    );
  }
}