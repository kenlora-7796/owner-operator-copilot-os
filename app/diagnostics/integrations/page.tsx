import { services } from "@/lib/container";
import type {
  ServiceHealth,
  ServiceStatus,
} from "@/lib/services/service-health-service";

const statusStyles: Record<
  ServiceStatus,
  {
    label: string;
    dot: string;
    badge: string;
  }
> = {
  HEALTHY: {
    label: "Healthy",
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700",
  },
  NOT_CONFIGURED: {
    label: "Not Configured",
    dot: "bg-amber-500",
    badge: "bg-amber-50 text-amber-700",
  },
  UNAVAILABLE: {
    label: "Unavailable",
    dot: "bg-red-500",
    badge: "bg-red-50 text-red-700",
  },
};

const upcomingServices = [
  {
    name: "Geocoding",
    message: "Google Geocoding service is ready for live verification.",
  },
  {
    name: "Weather",
    message: "Weather provider has not been connected yet.",
  },
  {
    name: "Traffic",
    message: "Traffic provider has not been connected yet.",
  },
  {
    name: "Fuel Prices",
    message: "Fuel price provider has not been connected yet.",
  },
  {
    name: "Truck Parking",
    message: "Truck parking provider has not been connected yet.",
  },
  {
    name: "Route Optimizer",
    message: "Route optimization engine has not been connected yet.",
  },
];

function formatCheckedAt(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function HealthCard({ service }: { service: ServiceHealth }) {
  const styles = statusStyles[service.status];

  return (
    <article className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Live Integration
          </p>

          <h2 className="mt-1 text-lg font-bold text-slate-950">
            {service.name}
          </h2>
        </div>

        <span className={`mt-1 h-3 w-3 rounded-full ${styles.dot}`} />
      </div>

      <div className="mt-5">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles.badge}`}
        >
          {styles.label}
        </span>
      </div>

      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-slate-500">Configured</dt>

          <dd className="font-semibold text-slate-900">
            {service.configured ? "Yes" : "No"}
          </dd>
        </div>

        <div className="flex items-center justify-between gap-4">
          <dt className="text-slate-500">Last Checked</dt>

          <dd className="text-right font-semibold text-slate-900">
            {formatCheckedAt(service.checkedAt)}
          </dd>
        </div>
      </dl>
    </article>
  );
}

export default async function IntegrationsDiagnosticsPage() {
  const liveHealth = await services.serviceHealthService.getHealth();

  const healthyCount = liveHealth.filter(
    (service) => service.status === "HEALTHY"
  ).length;

  const unavailableCount = liveHealth.filter(
    (service) => service.status === "UNAVAILABLE"
  ).length;

  const notConfiguredCount =
    upcomingServices.length +
    liveHealth.filter(
      (service) => service.status === "NOT_CONFIGURED"
    ).length;

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <header>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Sprint 6 Diagnostics
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
            Service Health Dashboard
          </h1>

          <p className="mt-2 max-w-3xl text-slate-600">
            Monitor the live services and future integrations used by Owner
            Operator Copilot OS.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-3">
          <article className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Healthy Services</p>

            <p className="mt-2 text-3xl font-bold text-emerald-700">
              {healthyCount}
            </p>
          </article>

          <article className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Not Configured</p>

            <p className="mt-2 text-3xl font-bold text-amber-700">
              {notConfiguredCount}
            </p>
          </article>

          <article className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Unavailable</p>

            <p className="mt-2 text-3xl font-bold text-red-700">
              {unavailableCount}
            </p>
          </article>
        </section>

        <section>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-950">
              Live Services
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              These services are checked by the platform at request time.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {liveHealth.map((service) => (
              <HealthCard key={service.name} service={service} />
            ))}
          </div>
        </section>

        <section>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-950">
              Upcoming Integrations
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              These integrations will be activated in future milestones.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {upcomingServices.map((service) => (
              <article
                key={service.name}
                className="rounded-2xl border bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-bold text-slate-950">
                    {service.name}
                  </h3>

                  <span className="mt-1 h-3 w-3 rounded-full bg-amber-500" />
                </div>

                <p className="mt-3 text-sm text-slate-600">
                  {service.message}
                </p>

                <span className="mt-5 inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                  Not Configured
                </span>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}