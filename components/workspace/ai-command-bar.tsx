export function AiCommandBar() {
  return (
<div className="px-0">
  <div className="flex w-full items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900 p-3 shadow-2xl">
        <span className="text-xl">🤖</span>

        <input
          className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          placeholder="Ask your AI Office..."
        />

        <button className="rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-300">
          📎
        </button>

        <button className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-bold text-slate-950">
          ➤
        </button>
      </div>
    </div>
  );
}