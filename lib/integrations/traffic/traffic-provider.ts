import type { Coordinates } from "../types";

export interface TrafficStatus {
  congestionLevel: "low" | "medium" | "high";
  incidents: number;
}

export interface TrafficProvider {
  getTraffic(location: Coordinates): Promise<TrafficStatus>;
}