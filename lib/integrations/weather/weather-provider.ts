import type { Coordinates } from "../types";

export interface WeatherForecast {
  temperature: number;
  conditions: string;
  windSpeed: number;
}

export interface WeatherProvider {
  getForecast(location: Coordinates): Promise<WeatherForecast>;
}