import type { CreateRouteInput, IRoutingService } from "../interfaces/routing-service.interface";
import type { IFuelService } from "../interfaces/fuel-service.interface";
import type { IWeatherService } from "../interfaces/weather-service.interface";
import type { IParkingService } from "../interfaces/parking-service.interface";
import type { ITrafficService } from "../interfaces/traffic-service.interface";
import type { FuelStop } from "../models/fuel-stop";
import type { Parking } from "../models/parking";
import type { RoutePlan } from "../models/route-plan";
import type { TrafficIncident } from "../models/traffic";
import type { WeatherAlert } from "../models/weather";

export interface BuildRoutePlanInput extends CreateRouteInput {
  fuelStops: FuelStop[];
  parkingOptions: Parking[];
  weatherAlerts: WeatherAlert[];
  trafficIncidents: TrafficIncident[];
  truckMpg: number;
  dieselPrice: number;
}

export class AiRoutePlanner {
  constructor(
    private readonly routingService: IRoutingService,
    private readonly fuelService: IFuelService,
    private readonly weatherService: IWeatherService,
    private readonly parkingService: IParkingService,
    private readonly trafficService: ITrafficService,
  ) {}

  buildRoutePlan(input: BuildRoutePlanInput): RoutePlan {
    const route = this.routingService.createDraftRoute(input);
    const cheapestFuelStop = this.fuelService.findCheapestFuelStop(input.fuelStops);
    const weatherAlerts = this.weatherService.getHighRiskWeatherAlerts(input.weatherAlerts);
    const trafficIncidents = this.trafficService.getMajorTrafficIncidents(input.trafficIncidents);
    const parkingOptions = this.parkingService.findOvernightParking(input.parkingOptions);

    const estimatedFuelCost = this.fuelService.estimateFuelCost(
      route.totalMiles,
      input.truckMpg,
      input.dieselPrice,
    );

    return {
      id: crypto.randomUUID(),
      route: {
        ...route,
        estimatedFuelCost,
      },
      waypoints: input.waypoints ?? [],
      fuelStops: cheapestFuelStop ? [cheapestFuelStop] : [],
      truckStops: [],
      parkingOptions,
      weatherAlerts,
      trafficIncidents,
      hazmatRestrictions: [],
      lowBridgeWarnings: [],
      aiRecommendation: this.createRecommendation(
        weatherAlerts.length,
        trafficIncidents.length,
        parkingOptions.length,
        Boolean(cheapestFuelStop),
      ),
      riskScore: this.calculateRiskScore(weatherAlerts.length, trafficIncidents.length),
      estimatedTotalCost: estimatedFuelCost,
      createdAt: new Date().toISOString(),
    };
  }

  private createRecommendation(
    weatherAlertCount: number,
    trafficIncidentCount: number,
    parkingOptionCount: number,
    hasFuelStop: boolean,
  ): string {
    if (weatherAlertCount > 0 || trafficIncidentCount > 0) {
      return "Review route before dispatch. Weather or traffic risk has been detected.";
    }

    if (!hasFuelStop) {
      return "No fuel stop selected. Add fuel planning before finalizing this route.";
    }

    if (parkingOptionCount === 0) {
      return "No overnight parking found. Add parking options before dispatch.";
    }

    return "Route plan looks ready for dispatch review.";
  }

  private calculateRiskScore(weatherAlertCount: number, trafficIncidentCount: number): number {
    return Math.min(100, weatherAlertCount * 25 + trafficIncidentCount * 20);
  }
}