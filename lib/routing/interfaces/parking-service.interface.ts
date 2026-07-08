import type { Parking } from "../models/parking";

export interface IParkingService {
  findAvailableParking(parkingOptions: Parking[]): Parking[];
  findOvernightParking(parkingOptions: Parking[]): Parking[];
}