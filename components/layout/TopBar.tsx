interface TopBarProps {
  workspaceTitle: string;
  workspaceSubtitle?: string;
}

export function TopBar({ workspaceTitle, workspaceSubtitle }: TopBarProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 px-4 py-4 text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400">
              LoraOS • Tierra AI Labs
          </p>
          <h2 className="text-lg font-bold">{workspaceTitle}</h2>
          {workspaceSubtitle ? (
            <p className="text-sm text-slate-400">{workspaceSubtitle}</p>
          ) : null}
        </div>

        <button className="rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-200">
          🤖 Copilot
        </button>
      </div>
    </header>
  );
}
