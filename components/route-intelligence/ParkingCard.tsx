import { Card } from "@/components/ui/Card";

export function ParkingCard() {
  return (
    <Card>
      <p className="text-sm font-semibold text-blue-400">Truck Parking</p>
      <h3 className="mt-2 text-xl font-bold text-white">Overnight Parking Found</h3>
      <p className="mt-2 text-slate-300">Safe parking available near the route.</p>
      <p className="mt-4 text-sm text-slate-400">Reservation recommended before 7 PM.</p>
    </Card>
  );
}
