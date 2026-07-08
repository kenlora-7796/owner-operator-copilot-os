export interface FuelStop {
  id: string;
  name: string;
  brand: string;
  address: string;

  latitude: number;
  longitude: number;

  dieselPrice: number;
  defAvailable: boolean;

  truckParkingSpaces: number;
  showersAvailable: boolean;
  restaurantAvailable: boolean;

  rewardsProgram?: string;

  distanceFromRouteMiles: number;

  lastUpdated: string;
}