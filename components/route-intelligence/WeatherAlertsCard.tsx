import { Card } from "@/components/ui/Card";

export function WeatherAlertsCard() {
  return (
    <Card>
      <p className="text-sm font-semibold text-yellow-400">Weather</p>
      <h3 className="mt-2 text-xl font-bold text-white">Moderate Risk</h3>
      <p className="mt-2 text-slate-300">Rain expected along part of the route.</p>
      <p className="mt-4 text-sm text-slate-400">AI recommendation: Review before dispatch.</p>
    </Card>
  );
}
