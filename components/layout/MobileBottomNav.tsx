"use client";

import { usePathname } from "next/navigation";
import { NavItem } from "./NavItem";

const navItems = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/loads", label: "Loads", icon: "🚚" },
  { href: "/route-intelligence", label: "Routes", icon: "🗺️" },
  { href: "/money", label: "Money", icon: "💰" },
  { href: "/ai", label: "AI", icon: "🤖" },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-800 bg-slate-950 px-2 py-2 text-white lg:hidden">
      <div className="grid grid-cols-5 gap-1">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            {...item}
            isActive={pathname === item.href}
          />
        ))}
      </div>
    </nav>
  );
}
