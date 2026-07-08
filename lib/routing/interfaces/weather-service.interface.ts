import type { WeatherAlert } from "../models/weather";

export interface IWeatherService {
  getHighRiskWeatherAlerts(alerts: WeatherAlert[]): WeatherAlert[];
  hasCriticalWeather(alerts: WeatherAlert[]): boolean;
}