import { Card } from "@/components/ui/Card";

export function TrafficAlertsCard() {
  return (
    <Card>
      <p className="text-sm font-semibold text-orange-400">Traffic</p>
      <h3 className="mt-2 text-xl font-bold text-white">1 Major Delay</h3>
      <p className="mt-2 text-slate-300">Construction delay detected near Shreveport.</p>
      <p className="mt-4 text-sm text-slate-400">Estimated delay: 35 minutes</p>
    </Card>
  );
}
