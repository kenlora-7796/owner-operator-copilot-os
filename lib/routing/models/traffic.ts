export type TrafficSeverity = "minor" | "moderate" | "major" | "closed";

export interface TrafficIncident {
  id: string;
  location: string;
  description: string;
  severity: TrafficSeverity;
  delayMinutes: number;
  suggestedDetour?: string;
}