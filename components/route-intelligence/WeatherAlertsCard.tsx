export function WeatherAlertsCard() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <p className="text-sm font-semibold text-yellow-400">Weather</p>
      <h3 className="mt-2 text-xl font-bold text-white">Moderate Risk</h3>
      <p className="mt-2 text-slate-300">Rain expected along part of the route.</p>
      <p className="mt-4 text-sm text-slate-400">AI recommendation: Review before dispatch.</p>
    </div>
  );
}
