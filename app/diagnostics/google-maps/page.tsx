import { services } from "@/lib/container";
import { RouteTester } from "./route-tester";

export default function GoogleMapsDiagnosticsPage() {
  const checks = services.environmentValidator.check();

  const googleMaps = checks.find(
    (item) => item.name === "GOOGLE_MAPS_API_KEY"
  );

  return (
    <main className="space-y-6 p-6">
      <section>
        <p className="text-sm text-slate-500">
          Sprint 6 Diagnostics
        </p>

        <h1 className="text-3xl font-bold">
          Google Maps Integration
        </h1>

        <p className="mt-2 text-slate-600">
          Validate the server configuration and test live Google route data.
        </p>
      </section>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            API Key Status
          </h2>

          <span
            className={`h-4 w-4 rounded-full ${
              googleMaps?.configured
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          />
        </div>

        <p className="mt-4 text-lg">
          {googleMaps?.configured
            ? "Google Maps server key found ✅"
            : "Google Maps server key missing ❌"}
        </p>

        <p className="mt-2 text-sm text-slate-500">
          Server-only environment variable:
          <br />
          GOOGLE_MAPS_API_KEY
        </p>
      </section>

      <RouteTester />
    </main>
  );
}