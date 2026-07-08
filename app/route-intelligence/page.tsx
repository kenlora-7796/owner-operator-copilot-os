import { FuelPlannerCard } from "@/components/route-intelligence/FuelPlannerCard";
import { ParkingCard } from "@/components/route-intelligence/ParkingCard";
import { RoutePlannerCard } from "@/components/route-intelligence/RoutePlannerCard";
import { RouteSummaryCard } from "@/components/route-intelligence/RouteSummaryCard";
import { TrafficAlertsCard } from "@/components/route-intelligence/TrafficAlertsCard";
import { WeatherAlertsCard } from "@/components/route-intelligence/WeatherAlertsCard";

export default function RouteIntelligencePage() {
  return (
    <main className="min-h-screen bg-slate-950 p-6 text-white">
      <section className="mx-auto max-w-7xl space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-400">
            Sprint 4 - Route Intelligence
          </p>
          <h1 className="mt-2 text-3xl font-bold">Route Intelligence Workspace</h1>
          <p className="mt-2 max-w-3xl text-slate-300">
            Plan truck-safe routes with fuel, weather, traffic, parking, low bridge awareness, and hazmat restrictions.
          </p>
        </div>

        <RoutePlannerCard />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <FuelPlannerCard />
          <WeatherAlertsCard />
          <TrafficAlertsCard />
          <ParkingCard />
          <RouteSummaryCard />
        </div>
      </section>
    </main>
  );
}
