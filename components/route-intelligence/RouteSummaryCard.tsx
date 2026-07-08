import { Card } from "@/components/ui/Card";

export function RouteSummaryCard() {
  return (
    <Card className="border-emerald-700 bg-emerald-950">
      <p className="text-sm font-semibold text-emerald-300">AI Recommendation</p>
      <h3 className="mt-2 text-xl font-bold text-white">Route Ready for Review</h3>
      <p className="mt-2 text-emerald-100">
        Take the planned route, fuel before Shreveport, monitor weather, and reserve parking before arrival.
      </p>
    </Card>
  );
}
