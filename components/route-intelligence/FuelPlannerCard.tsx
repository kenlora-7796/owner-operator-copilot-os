import { Card } from "@/components/ui/Card";

export function FuelPlannerCard() {
  return (
    <Card>
      <p className="text-sm font-semibold text-emerald-400">Fuel Planner</p>
      <h3 className="mt-2 text-xl font-bold text-white">$3.42 / gal</h3>
      <p className="mt-2 text-slate-300">Recommended fuel stop: Love&apos;s Travel Stop</p>
      <p className="mt-4 text-sm text-slate-400">Estimated fuel cost: $285.00</p>
    </Card>
  );
}
