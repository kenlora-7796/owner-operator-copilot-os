import Link from "next/link";

interface NavItemProps {
  href: string;
  label: string;
  icon: string;
  isActive?: boolean;
}

export function NavItem({ href, label, icon, isActive = false }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${
        isActive
          ? "bg-emerald-500 text-slate-950"
          : "text-slate-300 hover:bg-slate-800 hover:text-white"
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
