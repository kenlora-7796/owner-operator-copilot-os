import { environmentValidator } from "../environment";
import { httpClient } from "../http";
import { integrationManager } from "../services/integration-manager";
import { googleRoutesService } from "../services/google";

export class ServiceContainer {
  readonly httpClient = httpClient;
  readonly integrationManager = integrationManager;
  readonly environmentValidator = environmentValidator;
  readonly googleRoutesService = googleRoutesService;
}

export const services = new ServiceContainer();