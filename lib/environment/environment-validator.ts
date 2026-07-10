export interface EnvironmentCheck {
  name: string;
  configured: boolean;
}

export class EnvironmentValidator {
  check(): EnvironmentCheck[] {
    return [
      {
        name: "GOOGLE_MAPS_API_KEY",
        configured: Boolean(
          process.env.GOOGLE_MAPS_API_KEY
        ),
      },
      {
        name: "NEXT_PUBLIC_WEATHER_API_KEY",
        configured: Boolean(
          process.env.NEXT_PUBLIC_WEATHER_API_KEY
        ),
      },
      {
        name: "NEXT_PUBLIC_TRAFFIC_API_KEY",
        configured: Boolean(
          process.env.NEXT_PUBLIC_TRAFFIC_API_KEY
        ),
      },
      {
        name: "NEXT_PUBLIC_FUEL_API_KEY",
        configured: Boolean(
          process.env.NEXT_PUBLIC_FUEL_API_KEY
        ),
      },
      {
        name: "NEXT_PUBLIC_TRUCK_PARKING_API_KEY",
        configured: Boolean(
          process.env.NEXT_PUBLIC_TRUCK_PARKING_API_KEY
        ),
      },
      {
        name: "NEXT_PUBLIC_GEOCODING_API_KEY",
        configured: Boolean(
          process.env.NEXT_PUBLIC_GEOCODING_API_KEY
        ),
      },
    ];
  }
}

export const environmentValidator =
  new EnvironmentValidator();