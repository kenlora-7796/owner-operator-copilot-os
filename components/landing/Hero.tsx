import Link from "next/link";

const workspaceMetrics = [
  {
    label: "Load Revenue",
    value: "$2,850",
  },
  {
    label: "Net Profit",
    value: "$1,570",
  },
  {
    label: "Profit Margin",
    value: "55.09%",
  },
  {
    label: "Profit Per Mile",
    value: "$1.52",
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.16),transparent_42%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-20 lg:px-8 lg:pb-28 lg:pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Closed Alpha v0.1
          </span>

          <h1 className="mt-8 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            LoraOS
          </h1>

          <p className="mt-5 text-xl font-medium text-slate-200 sm:text-2xl">
            The AI operating system for independent trucking businesses.
          </p>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
            Analyze every load, understand your true operating costs, automate
            paperwork, and make stronger business decisions from one
            intelligent workspace.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/route-intelligence/workspace"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-400 px-7 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300"
            >
              Enter Closed Alpha
            </Link>

            <a
              href="#features"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-700 px-7 py-3 font-semibold text-white transition hover:border-emerald-400 hover:bg-white/[0.03]"
            >
              Explore LoraOS
            </a>
          </div>

          <p className="mt-6 text-sm text-slate-500">
            Built by Tierra AI Labs
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-6xl rounded-3xl border border-white/10 bg-white/[0.04] p-3 shadow-2xl shadow-emerald-950/30 backdrop-blur sm:p-5">
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-400 font-bold text-slate-950">
                  L
                </div>

                <div>
                  <p className="text-sm font-semibold">LoraOS</p>
                  <p className="text-xs text-slate-500">
                    Route Intelligence Workspace
                  </p>
                </div>
              </div>

              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                Services operational
              </span>
            </div>

            <div className="grid gap-5 p-5 lg:grid-cols-[1fr_320px]">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                <div className="flex flex-col gap-4 border-b border-slate-800 pb-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                      Active load analysis
                    </p>

                    <h2 className="mt-2 text-xl font-semibold">
                      Jackson, MS → Atlanta, GA
                    </h2>
                  </div>

                  <span className="w-fit rounded-lg bg-emerald-400 px-3 py-2 text-xs font-bold text-slate-950">
                    Analyze Load
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 py-5 sm:grid-cols-4">
                  {workspaceMetrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-xl border border-slate-800 bg-slate-950 p-4"
                    >
                      <p className="text-xs text-slate-500">{metric.label}</p>
                      <p className="mt-2 text-lg font-semibold">
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <PreviewField label="Loaded Miles" value="920" />
                  <PreviewField label="Deadhead Miles" value="110" />
                  <PreviewField label="Target Margin" value="20%" />
                </div>
              </div>

              <aside className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] p-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                    AI CFO
                  </p>

                  <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-bold text-emerald-300">
                    Accept
                  </span>
                </div>

                <h3 className="mt-5 text-2xl font-semibold">
                  Accept this load
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-300">
                  This load exceeds the target profit margin and supports the
                  owner&apos;s current financial goals.
                </p>

                <div className="mt-6 rounded-xl border border-slate-700/80 bg-slate-950/60 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">AI confidence</span>
                    <span className="font-semibold text-white">96%</span>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full w-[96%] rounded-full bg-emerald-400" />
                  </div>
                </div>

                <ul className="mt-5 space-y-3 text-sm text-slate-300">
                  <li className="flex gap-3">
                    <span className="font-bold text-emerald-300">1</span>
                    Accept the load.
                  </li>

                  <li className="flex gap-3">
                    <span className="font-bold text-emerald-300">2</span>
                    Monitor fuel costs.
                  </li>

                  <li className="flex gap-3">
                    <span className="font-bold text-emerald-300">3</span>
                    Track actual profit after delivery.
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type PreviewFieldProps = {
  label: string;
  value: string;
};

function PreviewField({ label, value }: PreviewFieldProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-2 font-semibold text-slate-200">{value}</p>
    </div>
  );
}