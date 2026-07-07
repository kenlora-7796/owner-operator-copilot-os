export function GreetingPanel() {
  return (
    <section className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-5 shadow-lg">
      <p className="text-sm font-semibold text-cyan-400">
        Good Morning, Kendra 👋
      </p>

      <h2 className="mt-3 text-3xl font-bold text-white">
        Your AI Operations Center is ready for today's work.
      </h2>

      <div className="mt-5 grid gap-3 text-sm text-slate-300 sm:grid-cols-2 lg:grid-cols-4">
        <p>✅ Reviewed 8 documents</p>
        <p>✅ Found 2 loads ready</p>
        <p>💰 Prepared 1 invoice</p>
        <p>⚠️ 3 decisions waiting</p>
      </div>
    </section>
  );
}