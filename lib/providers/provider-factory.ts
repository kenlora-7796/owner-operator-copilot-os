import type { MapsProvider } from "../integrations/maps/maps-provider";
import { MockMapsProvider } from "../integrations/maps/mock-maps-provider";

export class ProviderFactory {
  private readonly mapsProvider: MapsProvider;

  constructor() {
    this.mapsProvider = new MockMapsProvider();
  }

  getMapsProvider(): MapsProvider {
    return this.mapsProvider;
  }
}

export const providerFactory = new ProviderFactory();