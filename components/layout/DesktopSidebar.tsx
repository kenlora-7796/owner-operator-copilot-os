"use client";

import { usePathname } from "next/navigation";
import { NavItem } from "./NavItem";

const navItems = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/loads", label: "Loads", icon: "🚚" },
  { href: "/route-intelligence", label: "Routes", icon: "🗺️" },
  { href: "/money", label: "Money", icon: "💰" },
  { href: "/ai", label: "AI", icon: "🤖" },
  { href: "/more", label: "More", icon: "☰" },
];

export function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-64 border-r border-slate-800 bg-slate-950 p-4 text-white lg:block">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400">
          Owner Operator
        </p>
        <h1 className="mt-1 text-lg font-bold">Copilot OS</h1>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            {...item}
            isActive={pathname === item.href}
          />
        ))}
      </nav>
    </aside>
  );
}