import { integrationRegistry } from "../integrations/registry";
import { providerFactory } from "../providers";
import type {
  RouteRequest,
  RouteResult,
} from "../integrations/types";

export class IntegrationManager {
  getIntegrations() {
    return integrationRegistry;
  }

  getIntegration(provider: string) {
    return integrationRegistry.find(
      (integration) => integration.provider === provider
    );
  }

  isConnected(provider: string): boolean {
    return (
      this.getIntegration(provider)?.status === "connected"
    );
  }

  async calculateRoute(
    request: RouteRequest
  ): Promise<RouteResult> {
    return providerFactory
      .getMapsProvider()
      .calculateRoute(request);
  }
}

export const integrationManager = new IntegrationManager();