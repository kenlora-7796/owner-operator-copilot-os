import Link from "next/link";

const benefits = [
  {
    title: "Know the profit before accepting",
    description:
      "Evaluate revenue, loaded miles, deadhead, expenses, and target margin before committing to a load.",
  },
  {
    title: "Reduce paperwork",
    description:
      "Prepare for document automation that turns trucking paperwork into organized business records.",
  },
  {
    title: "Understand the whole business",
    description:
      "See route, financial, and operational intelligence from one connected workspace.",
  },
  {
    title: "Make stronger decisions with AI",
    description:
      "Use clear recommendations instead of relying only on gross revenue or incomplete calculations.",
  },
];

export function FinalSections() {
  return (
    <>
      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8 lg:py-28">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
              Built for owner-operators
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Run the business with more clarity.
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
              LoraOS helps independent trucking businesses move beyond
              spreadsheets, scattered paperwork, and incomplete financial
              decisions.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/10 font-bold text-emerald-300">
                  ✓
                </div>

                <h3 className="mt-5 text-lg font-semibold">{benefit.title}</h3>

                <p className="mt-3 leading-7 text-slate-400">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 pb-20 text-white lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-7xl rounded-3xl border border-emerald-400/20 bg-emerald-400/[0.07] px-6 py-14 text-center sm:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
            Closed Alpha v0.1
          </p>

          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            Help shape the future of AI-powered trucking operations.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Explore the current LoraOS experience and provide feedback as
            Tierra AI Labs prepares the platform for private beta.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/route-intelligence/workspace"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-400 px-7 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300"
            >
              Launch LoraOS
            </Link>

            <a
              href="#features"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 px-7 py-3 font-semibold text-white transition hover:border-emerald-300 hover:bg-white/[0.04]"
            >
              Review Features
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <p className="font-semibold text-slate-200">LoraOS</p>
            <p className="mt-1">Built by Tierra AI Labs</p>
          </div>

          <div className="sm:text-right">
            <p>Closed Alpha v0.1</p>
            <p className="mt-1">
              © 2026 Tierra AI Labs. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}