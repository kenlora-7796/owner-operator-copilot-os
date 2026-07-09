import { services } from "@/lib/container";

export default async function IntegrationsTestPage() {
  const route = await services.integrationManager.calculateRoute({
    origin: {
      id: "origin-1",
      label: "Jackson, MS",
      address: "Jackson, MS",
    },
    destination: {
      id: "destination-1",
      label: "Memphis, TN",
      address: "Memphis, TN",
    },
  });

  return (
    <main className="space-y-6 p-6">
      <section>
        <p className="text-sm font-medium text-slate-500">
          Sprint 5 Integration Test
        </p>

        <h1 className="text-3xl font-bold tracking-tight">
          Integration Manager Route Test
        </h1>

        <p className="mt-2 max-w-2xl text-slate-600">
          This page proves that the UI can call the service container, reach the
          integration manager, use the provider factory, and receive a route
          result from the mock maps provider.
        </p>
      </section>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Mock Route Result</h2>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border p-4">
            <p className="text-sm text-slate-500">Distance</p>
            <p className="text-2xl font-bold">
              {route.summary.distanceMiles} miles
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <p className="text-sm text-slate-500">Drive Time</p>
            <p className="text-2xl font-bold">
              {route.summary.estimatedDriveTimeMinutes} min
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <p className="text-sm text-slate-500">Fuel Estimate</p>
            <p className="text-2xl font-bold">
              {route.summary.estimatedFuelGallons} gal
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm">
          <p>
            <strong>Origin:</strong> {route.request.origin.label}
          </p>
          <p>
            <strong>Destination:</strong> {route.request.destination.label}
          </p>
          <p>
            <strong>Provider:</strong> {route.provider}
          </p>
        </div>
      </section>
    </main>
  );
}