import { environmentValidator } from "../environment";
import { httpClient } from "../http";
import { integrationManager } from "../services/integration-manager";
import {
  googleGeocodingService,
  googleRoutesService,
} from "../services/google";
import { serviceHealthService } from "../services/service-health-service";

export class ServiceContainer {
  readonly httpClient = httpClient;

  readonly integrationManager = integrationManager;

  readonly environmentValidator = environmentValidator;

  readonly googleRoutesService = googleRoutesService;

  readonly googleGeocodingService = googleGeocodingService;

  readonly serviceHealthService = serviceHealthService;
}

export const services = new ServiceContainer();