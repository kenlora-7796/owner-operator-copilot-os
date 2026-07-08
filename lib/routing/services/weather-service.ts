import type { IWeatherService } from "../interfaces/weather-service.interface";
import type { WeatherAlert } from "../models/weather";

export class WeatherService implements IWeatherService {
  getHighRiskWeatherAlerts(alerts: WeatherAlert[]): WeatherAlert[] {
    return alerts.filter(
      (alert) => alert.severity === "high" || alert.severity === "critical",
    );
  }

  hasCriticalWeather(alerts: WeatherAlert[]): boolean {
    return alerts.some((alert) => alert.severity === "critical");
  }
}