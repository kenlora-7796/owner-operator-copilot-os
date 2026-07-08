import { Card } from "@/components/ui/Card";

export function RoutePlannerCard() {
  return (
    <Card>
      <p className="text-sm font-semibold text-emerald-400">AI Route Planner</p>
      <h2 className="mt-2 text-2xl font-bold text-white">Jackson, MS to Dallas, TX</h2>
      <p className="mt-2 text-slate-300">
        Truck-safe route planning with fuel, weather, traffic, parking, hazmat, and bridge awareness.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-slate-950 p-4">
          <p className="text-sm text-slate-400">Origin</p>
          <p className="font-semibold text-white">Jackson, MS</p>
        </div>

        <div className="rounded-xl bg-slate-950 p-4">
          <p className="text-sm text-slate-400">Destination</p>
          <p className="font-semibold text-white">Dallas, TX</p>
        </div>
      </div>
    </Card>
  );
}
