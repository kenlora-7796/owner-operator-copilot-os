import type { ITrafficService } from "../interfaces/traffic-service.interface";
import type { TrafficIncident } from "../models/traffic";

export class TrafficService implements ITrafficService {
  getMajorTrafficIncidents(incidents: TrafficIncident[]): TrafficIncident[] {
    return incidents.filter(
      (incident) =>
        incident.severity === "major" || incident.severity === "closed",
    );
  }

  estimateTotalDelayMinutes(incidents: TrafficIncident[]): number {
    return incidents.reduce(
      (totalDelay, incident) => totalDelay + incident.delayMinutes,
      0,
    );
  }
}