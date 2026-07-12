import { AppCard } from "@/components/ui";

interface RouteEconomicsCardProps {
  loadedMiles: number;
  deadheadMiles: number;
  totalMiles: number;
  deadheadPercentage: number;
}

interface MetricProps {
  label: string;
  value: string;
  description: string;
}

function Metric({
  label,
  value,
  description,
}: MetricProps) {
  return (
    <AppCard
      tone="subtle"
      className="flex min-h-40 flex-col justify-between"
    >
      <div>
        <p className="text-xs uppercase tracking-widest text-slate-500">
          {label}
        </p>

        <p className="mt-3 text-2xl font-semibold text-white">
          {value}
        </p>
      </div>

      <p className="mt-4 text-xs leading-5 text-slate-500">
        {description}
      </p>
    </AppCard>
  );
}

function formatMiles(value: number) {
  return `${value.toLocaleString()} mi`;
}

function formatPercent(value: number) {
  return `${value.toFixed(2)}%`;
}

export function RouteEconomicsCard({
  loadedMiles,
  deadheadMiles,
  totalMiles,
  deadheadPercentage,
}: RouteEconomicsCardProps) {
  return (
    <AppCard>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        Route Economics
      </p>

      <h3 className="mt-2 text-xl font-semibold">
        Mileage Intelligence
      </h3>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <Metric
          label="Loaded Miles"
          value={formatMiles(loadedMiles)}
          description="Miles traveled with paid freight."
        />

        <Metric
          label="Deadhead Miles"
          value={formatMiles(deadheadMiles)}
          description="Unpaid miles connected to the load."
        />

        <Metric
          label="Total Miles"
          value={formatMiles(totalMiles)}
          description="Combined paid and unpaid mileage."
        />

        <Metric
          label="Deadhead"
          value={formatPercent(deadheadPercentage)}
          description="Percentage of total miles driven empty."
        />
      </div>
    </AppCard>
  );
}