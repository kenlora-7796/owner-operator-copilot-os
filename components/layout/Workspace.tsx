import type { ReactNode } from "react";

interface WorkspaceProps {
  children: ReactNode;
}

export function Workspace({ children }: WorkspaceProps) {
  return (
    <main className="flex-1 overflow-y-auto bg-slate-900">
      <div className="mx-auto max-w-7xl p-6">
        {children}
      </div>
    </main>
  );
}
