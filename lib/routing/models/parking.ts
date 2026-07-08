export type ParkingAvailability =
  | "available"
  | "limited"
  | "full"
  | "unknown";

export interface Parking {
  id: string;
  name: string;
  address: string;

  latitude: number;
  longitude: number;

  totalSpaces: number;
  availableSpaces: number;

  availability: ParkingAvailability;

  overnightAllowed: boolean;
  securityLighting: boolean;
  restroomsAvailable: boolean;

  reservationRequired: boolean;

  lastUpdated: string;
}