import Link from "next/link";

type Feature = {
  title: string;
  description: string;
  status: "Available" | "Sprint 8";
  href: string | null;
};

const features: Feature[] = [
  {
    title: "Route Intelligence",
    description:
      "Evaluate mileage, deadhead, fuel costs, and projected load profitability before accepting freight.",
    status: "Available",
    href: "/route-intelligence/workspace",
  },
  {
    title: "AI CFO",
    description:
      "Receive financial recommendations based on operating expenses, profit targets, and business goals.",
    status: "Available",
    href: "/route-intelligence/workspace",
  },
  {
    title: "Financial Intelligence",
    description:
      "Track profit per mile, operating ratio, break-even points, and overall financial performance.",
    status: "Available",
    href: "/route-intelligence/workspace",
  },
  {
    title: "Business Health",
    description:
      "Monitor the financial condition of your trucking business from one intelligent workspace.",
    status: "Available",
    href: "/route-intelligence/workspace",
  },
  {
    title: "Document Intelligence",
    description:
      "Extract data from rate confirmations, bills of lading, and fuel receipts using OCR and AI.",
    status: "Sprint 8",
    href: null,
  },
  {
    title: "Smart Document Inbox",
    description:
      "Turn uploaded trucking documents into organized records, loads, expenses, and operational actions.",
    status: "Sprint 8",
    href: null,
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="border-y border-white/10 bg-slate-900/50 text-white"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
            Intelligent trucking operations
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            One operating system for the entire business.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            LoraOS connects route, financial, business, and document
            intelligence so owner-operators can make decisions from one trusted
            source of truth.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) =>
            feature.href ? (
              <Link
                key={feature.title}
                href={feature.href}
                className="group flex min-h-64 flex-col rounded-2xl border border-white/10 bg-slate-950/70 p-7 transition duration-200 hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-slate-950 hover:shadow-xl hover:shadow-emerald-950/20"
              >
                <FeatureHeader feature={feature} />

                <h3 className="mt-7 text-xl font-semibold">{feature.title}</h3>

                <p className="mt-3 leading-7 text-slate-400">
                  {feature.description}
                </p>

                <div className="mt-auto pt-7">
                  <p className="mb-4 text-sm font-semibold text-emerald-300 transition group-hover:translate-x-1">
                    Open workspace →
                  </p>

                  <div className="h-px bg-gradient-to-r from-emerald-400/40 to-transparent" />
                </div>
              </Link>
            ) : (
              <article
                key={feature.title}
                className="flex min-h-64 flex-col rounded-2xl border border-white/10 bg-slate-950/70 p-7 opacity-80"
              >
                <FeatureHeader feature={feature} />

                <h3 className="mt-7 text-xl font-semibold">{feature.title}</h3>

                <p className="mt-3 leading-7 text-slate-400">
                  {feature.description}
                </p>

                <div className="mt-auto pt-7">
                  <p className="mb-4 text-sm font-semibold text-slate-500">
                    Coming soon
                  </p>

                  <div className="h-px bg-gradient-to-r from-emerald-400/20 to-transparent" />
                </div>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

type FeatureHeaderProps = {
  feature: Feature;
};

function FeatureHeader({ feature }: FeatureHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 font-bold text-emerald-300">
        AI
      </div>

      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-400">
        {feature.status}
      </span>
    </div>
  );
}