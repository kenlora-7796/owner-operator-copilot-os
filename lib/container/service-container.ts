import { environmentValidator } from "../environment";
import { httpClient } from "../http";
import { integrationManager } from "../services/integration-manager";

export class ServiceContainer {
  readonly httpClient = httpClient;
  readonly integrationManager = integrationManager;
  readonly environmentValidator = environmentValidator;
}

export const services = new ServiceContainer();