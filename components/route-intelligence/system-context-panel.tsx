import { AppCard } from "@/components/ui";

interface SystemStatusRowProps {
  label: string;
  value: string;
  tone: "ready" | "warning";
  showDivider?: boolean;
}

function getStatusStyles(
  tone: SystemStatusRowProps["tone"],
): string {
  if (tone === "ready") {
    return "text-emerald-300";
  }

  return "text-amber-300";
}

function SystemStatusRow({
  label,
  value,
  tone,
  showDivider = true,
}: SystemStatusRowProps) {
  return (
    <div
      className={[
        "flex items-center justify-between gap-4 pb-4",
        showDivider
          ? "border-b border-white/10"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="text-sm text-slate-400">
        {label}
      </span>

      <span
        className={`text-sm font-semibold ${getStatusStyles(
          tone,
        )}`}
      >
        {value}
      </span>
    </div>
  );
}

export function SystemContextPanel() {
  return (
    <AppCard>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        System Context
      </p>

      <div className="mt-5 space-y-4">
        <SystemStatusRow
          label="Routes service"
          value="Ready"
          tone="ready"
        />

        <SystemStatusRow
          label="Finance engines"
          value="Active"
          tone="ready"
        />

        <SystemStatusRow
          label="Owner preferences"
          value="Default"
          tone="warning"
          showDivider={false}
        />
      </div>
    </AppCard>
  );
}