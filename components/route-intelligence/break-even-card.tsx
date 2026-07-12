import { AppCard } from "@/components/ui";

interface BreakEvenCardProps {
  breakEvenRevenue: number;
  breakEvenRatePerMile: number;
  deadheadCostImpact: number;
  revenueDifference: number;
}

interface BreakEvenMetricProps {
  label: string;
  value: string;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function BreakEvenMetric({
  label,
  value,
}: BreakEvenMetricProps) {
  return (
    <AppCard
      tone="subtle"
      padding="sm"
      className="flex min-h-20 items-center justify-between gap-4 rounded-2xl"
    >
      <span className="text-sm text-slate-400">
        {label}
      </span>

      <span className="font-semibold text-white">
        {value}
      </span>
    </AppCard>
  );
}

export function BreakEvenCard({
  breakEvenRevenue,
  breakEvenRatePerMile,
  deadheadCostImpact,
  revenueDifference,
}: BreakEvenCardProps) {
  const revenueDifferenceLabel =
    revenueDifference >= 0
      ? "Revenue above target"
      : "Revenue needed for target";

  return (
    <AppCard>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        Break-Even Intelligence
      </p>

      <h3 className="mt-2 text-xl font-semibold">
        Target analysis
      </h3>

      <div className="mt-6 space-y-4">
        <BreakEvenMetric
          label="Break-even revenue"
          value={formatCurrency(breakEvenRevenue)}
        />

        <BreakEvenMetric
          label="Break-even rate per mile"
          value={formatCurrency(breakEvenRatePerMile)}
        />

        <BreakEvenMetric
          label="Deadhead cost impact"
          value={formatCurrency(deadheadCostImpact)}
        />

        <BreakEvenMetric
          label={revenueDifferenceLabel}
          value={formatCurrency(
            Math.abs(revenueDifference),
          )}
        />
      </div>
    </AppCard>
  );
}