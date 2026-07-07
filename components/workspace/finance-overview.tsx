export function FinanceOverview() {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-4">
      <h3 className="text-lg font-bold text-white">Finance</h3>
      <p className="mt-1 text-sm text-slate-400">Revenue and paperwork.</p>

      <div className="mt-4 rounded-2xl bg-slate-950 p-4">
        <p className="text-sm text-slate-400">Projected Revenue</p>
        <p className="mt-2 text-3xl font-bold text-white">$4,750</p>
        <p className="mt-1 text-sm text-emerald-400">1 invoice prepared</p>
      </div>
    </section>
  );
}