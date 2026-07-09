import { httpClient } from "../http";
import { integrationManager } from "../services/integration-manager";

export class ServiceContainer {
  readonly httpClient = httpClient;
  readonly integrationManager = integrationManager;
}

export const services = new ServiceContainer();