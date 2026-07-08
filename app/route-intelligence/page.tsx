import { AppShell } from "@/components/layout/AppShell";
import { FuelPlannerCard } from "@/components/route-intelligence/FuelPlannerCard";
import { ParkingCard } from "@/components/route-intelligence/ParkingCard";
import { RoutePlannerCard } from "@/components/route-intelligence/RoutePlannerCard";
import { RouteSummaryCard } from "@/components/route-intelligence/RouteSummaryCard";
import { TrafficAlertsCard } from "@/components/route-intelligence/TrafficAlertsCard";
import { WeatherAlertsCard } from "@/components/route-intelligence/WeatherAlertsCard";

export default function RouteIntelligencePage() {
  return (
    <AppShell
      workspaceTitle="Route Intelligence"
      workspaceSubtitle="AI-powered routing, fuel, parking, weather, traffic, and compliance awareness."
    >
      <div className="space-y-6">
        <RoutePlannerCard />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <FuelPlannerCard />
          <WeatherAlertsCard />
          <TrafficAlertsCard />
          <ParkingCard />
          <RouteSummaryCard />
        </div>
      </div>
    </AppShell>
  );
}
