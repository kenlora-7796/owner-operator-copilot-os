"use client";

import { useState } from "react";

interface SidebarNavigationItem {
  label: string;
  shortLabel: string;
  status?: string;
  isActive?: boolean;
}

const NAVIGATION_ITEMS: SidebarNavigationItem[] = [
  {
    label: "Route Intelligence",
    shortLabel: "RI",
    isActive: true,
  },
  {
    label: "Load Workspace",
    shortLabel: "LW",
  },
  {
    label: "Business Health",
    shortLabel: "BH",
  },
  {
    label: "Documents",
    shortLabel: "DO",
    status: "Soon",
  },
  {
    label: "Activity Timeline",
    shortLabel: "AT",
  },
  {
    label: "Owner Settings",
    shortLabel: "OS",
  },
];

export function RouteIntelligenceSidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen((currentValue) => !currentValue);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <aside className="border-b border-white/10 bg-slate-950 lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r">
      <div className="flex items-center justify-between px-4 py-4 lg:block lg:px-5 lg:py-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-400">
           TIERRA AI LABS 
          </p>

          <h1 className="mt-1 text-lg font-semibold tracking-tight text-white">
            LoraOS
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
            Alpha
          </span>

          <button
            type="button"
            aria-label={
              isMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            aria-controls="route-navigation"
            onClick={toggleMenu}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 lg:hidden"
          >
            <span className="sr-only">
              {isMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"}
            </span>

            {isMenuOpen ? (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <nav
        id="route-navigation"
        aria-label="Primary navigation"
        className={[
          "border-t border-white/10 px-3 pb-4 pt-3 lg:block lg:border-t-0 lg:px-3 lg:pt-0",
          isMenuOpen ? "block" : "hidden",
        ].join(" ")}
      >
        <div className="flex flex-col gap-2">
          {NAVIGATION_ITEMS.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={closeMenu}
              className={[
                "flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition",
                item.isActive
                  ? "border-emerald-400/20 bg-emerald-400/10 text-white"
                  : "border-transparent text-slate-400 hover:border-white/10 hover:bg-white/5 hover:text-white",
              ].join(" ")}
            >
              <span
                className={[
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold",
                  item.isActive
                    ? "bg-emerald-400 text-slate-950"
                    : "bg-white/5 text-slate-400",
                ].join(" ")}
              >
                {item.shortLabel}
              </span>

              <span className="flex min-w-0 flex-1 items-center justify-between gap-3">
                <span className="whitespace-nowrap text-sm font-medium">
                  {item.label}
                </span>

                {item.status ? (
                  <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                    {item.status}
                  </span>
                ) : null}
              </span>
            </button>
          ))}
        </div>
      </nav>

      <div className="hidden px-4 pb-6 lg:block">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            System status
          </p>

          <div className="mt-3 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />

            <span className="text-sm font-medium text-slate-300">
              Services operational
            </span>
          </div>

          <p className="mt-2 text-xs leading-5 text-slate-500">
            Route, finance and AI CFO engines are available.
          </p>
        </div>
      </div>
      <div className="hidden px-5 pb-5 lg:block">
  <div className="border-t border-white/10 pt-4 text-center">
    <p className="text-xs font-semibold text-slate-500">
      LoraOS
    </p>

    <p className="mt-1 text-[11px] text-slate-600">
      Closed Alpha v0.1
    </p>

    <p className="mt-2 text-[10px] text-slate-600">
      © 2026 LoraOS Closed Alpha v0.1. All rights reserved.
    </p>
  </div>
</div>
    </aside>
  );
}