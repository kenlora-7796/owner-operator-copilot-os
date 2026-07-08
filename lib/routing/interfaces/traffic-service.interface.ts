import type { TrafficIncident } from "../models/traffic";

export interface ITrafficService {
  getMajorTrafficIncidents(incidents: TrafficIncident[]): TrafficIncident[];
  estimateTotalDelayMinutes(incidents: TrafficIncident[]): number;
}