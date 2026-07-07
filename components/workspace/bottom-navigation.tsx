export function BottomNavigation() {
  return (
    <nav className="fixed bottom-3 left-0 right-0 z-50 border-t border-slate-800 bg-slate-950 px-2 py-2">
      <div className="mx-auto grid max-w-4xl grid-cols-5 text-center text-xs text-slate-300">
        <button>🏠<br />Home</button>
        <button>🚚<br />Loads</button>
        <button>💰<br />Money</button>
        <button>🤖<br />AI</button>
        <button>☰<br />More</button>
      </div>
    </nav>
  );
}