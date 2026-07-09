import { services } from "@/lib/container";

const statusColor: Record<string, string> = {
  connected: "bg-green-500",
  not_configured: "bg-yellow-500",
  error: "bg-red-500",
};

export default function ServiceHealthPage() {
  const integrations = services.integrationManager.getIntegrations();

  return (
    <main className="p-6 space-y-6">
      <section>
        <p className="text-sm text-slate-500">Sprint 5 Diagnostics</p>

        <h1 className="text-3xl font-bold">
          Service Health Dashboard
        </h1>

        <p className="text-slate-600 mt-2">
          Monitor every integration used by Owner Operator Copilot OS.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {integrations.map((service) => (
          <div
            key={service.provider}
            className="rounded-xl border bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-semibold capitalize">
                {service.provider.replaceAll("_", " ")}
              </h2>

              <div
                className={`h-3 w-3 rounded-full ${
                  statusColor[service.status]
                }`}
              />
            </div>

            <p className="mt-3 text-sm text-slate-600">
              {service.message}
            </p>

            <p className="mt-4 text-xs font-medium uppercase text-slate-500">
              Status: {service.status}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}