export type TruckStopBrand =
  | "Loves"
  | "Pilot"
  | "Flying J"
  | "TA"
  | "Petro"
  | "Buc-ee's"
  | "Independent"
  | "Other";

export interface TruckStop {
  id: string;
  name: string;
  brand: TruckStopBrand;

  address: string;

  latitude: number;
  longitude: number;

  fuelAvailable: boolean;
  parkingSpaces: number;

  showers: boolean;
  laundry: boolean;
  restaurant: boolean;
  scales: boolean;
  maintenance: boolean;
  wifi: boolean;

  open24Hours: boolean;

  lastUpdated: string;
}