export type ServiceStatus =
  | "HEALTHY"
  | "NOT_CONFIGURED"
  | "UNAVAILABLE";

export interface ServiceHealth {
  name: string;
  status: ServiceStatus;
  configured: boolean;
  checkedAt: Date;
}

export class ServiceHealthService {
  async checkGoogleRoutes(): Promise<ServiceHealth> {
    const configured = Boolean(process.env.GOOGLE_MAPS_API_KEY);

    return {
      name: "Google Routes",
      configured,
      status: configured ? "HEALTHY" : "NOT_CONFIGURED",
      checkedAt: new Date(),
    };
  }

  async getHealth() {
    return [
      await this.checkGoogleRoutes(),
    ];
  }
}

export const serviceHealthService =
  new ServiceHealthService();