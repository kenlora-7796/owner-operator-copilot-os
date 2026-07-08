export function ParkingCard() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <p className="text-sm font-semibold text-blue-400">Truck Parking</p>
      <h3 className="mt-2 text-xl font-bold text-white">Overnight Parking Found</h3>
      <p className="mt-2 text-slate-300">Safe parking available near the route.</p>
      <p className="mt-4 text-sm text-slate-400">Reservation recommended before 7 PM.</p>
    </div>
  );
}
