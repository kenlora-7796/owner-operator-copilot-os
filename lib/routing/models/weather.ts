export type WeatherSeverity = "low" | "moderate" | "high" | "critical";

export interface WeatherAlert {
  id: string;
  location: string;
  condition: string;
  severity: WeatherSeverity;
  startTime: string;
  endTime?: string;
  impactOnRoute: string;
}