import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";

interface AppCardProps
  extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
  tone?: "default" | "subtle" | "accent";
  interactive?: boolean;
}

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-5 sm:p-6",
  lg: "p-6 sm:p-8",
};

const toneStyles = {
  default: "border-white/10 bg-slate-900/60",
  subtle: "border-white/10 bg-slate-950/50",
  accent:
    "border-emerald-400/20 bg-gradient-to-b from-emerald-400/10 to-slate-900/60",
};

export const AppCard = forwardRef<
  HTMLElement,
  AppCardProps
>(function AppCard(
  {
    children,
    padding = "md",
    tone = "default",
    interactive = false,
    className = "",
    ...props
  },
  ref,
) {
  return (
    <section
      ref={ref}
      className={[
        "rounded-3xl border",
        toneStyles[tone],
        paddingStyles[padding],
        interactive
          ? "transition duration-200 hover:border-white/20 hover:shadow-xl hover:shadow-black/10"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </section>
  );
});