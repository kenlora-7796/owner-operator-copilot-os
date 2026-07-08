import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  tone?: "success" | "warning" | "danger" | "info";
}

const toneClasses = {
  success: "bg-emerald-500/10 text-emerald-300",
  warning: "bg-yellow-500/10 text-yellow-300",
  danger: "bg-red-500/10 text-red-300",
  info: "bg-blue-500/10 text-blue-300",
};

export function Badge({ children, tone = "info" }: BadgeProps) {
  return (
    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${toneClasses[tone]}`}>
      {children}
    </span>
  );
}
