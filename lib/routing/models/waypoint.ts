export type WaypointType =
  | "pickup"
  | "delivery"
  | "fuel"
  | "rest"
  | "parking"
  | "checkpoint";

export interface Waypoint {
  id: string;
  name: string;
  type: WaypointType;
  latitude: number;
  longitude: number;
  address: string;
  arrivalTime?: string;
  departureTime?: string;
}