"use client";

import { FormEvent, useState } from "react";
import { calculateRouteIntelligence } from "@/lib/routing/route-intelligence";

interface LiveRouteResult {
  origin: string;
  destination: string;
  distanceMiles: number;
  estimatedDriveTimeMinutes: number;
  encodedPolyline: string | null;
  provider: "google_maps";
  live: true;
}

interface RouteErrorResponse {
  error?: string;
}

function formatDriveTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `${minutes} min`;
  }

  return `${hours} hr ${minutes} min`;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function RouteIntelligenceWorkspace() {
  const [origin, setOrigin] = useState("Jackson, MS");
  const [destination, setDestination] = useState("Memphis, TN");
  const [truckMpg, setTruckMpg] = useState("6.5");
  const [dieselPrice, setDieselPrice] = useState("3.50");

  const [route, setRoute] = useState<LiveRouteResult | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const intelligence = route
    ? calculateRouteIntelligence({
        distanceMiles: route.distanceMiles,
        driveTimeMinutes: route.estimatedDriveTimeMinutes,
        truckMpg: Number(truckMpg),
        dieselPricePerGallon: Number(dieselPrice),
      })
    : null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);
    setError("");
    setRoute(null);

    try {
      const response = await fetch("/api/routes/compute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          origin,
          destination,
        }),
      });

      const data = (await response.json()) as
        | LiveRouteResult
        | RouteErrorResponse;

      if (!response.ok) {
        throw new Error(
          "error" in data && data.error
            ? data.error
            : "The route request failed."
        );
      }

      setRoute(data as LiveRouteResult);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "An unexpected route error occurred."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Live Route Planning
            </p>

            <h2 className="text-2xl font-bold text-slate-950">
              Plan Your Next Trip
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              Calculate live mileage, drive time, fuel usage, and fuel cost.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            Google Routes Connected
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-6 grid gap-4 md:grid-cols-2"
        >
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">
              Origin
            </span>

            <input
              value={origin}
              onChange={(event) => setOrigin(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
              placeholder="Jackson, MS"
              required
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">
              Destination
            </span>

            <input
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
              placeholder="Memphis, TN"
              required
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">
              Truck MPG
            </span>

            <input
              type="number"
              min="0.1"
              step="0.1"
              value={truckMpg}
              onChange={(event) => setTruckMpg(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
              required
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">
              Diesel Price per Gallon
            </span>

            <input
              type="number"
              min="0"
              step="0.01"
              value={dieselPrice}
              onChange={(event) => setDieselPrice(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
              required
            />
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2"
          >
            {isLoading
              ? "Calculating route intelligence..."
              : "Analyze Route"}
          </button>
        </form>

        {error ? (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="font-semibold text-red-700">
              Route calculation failed
            </p>

            <p className="mt-1 text-sm text-red-600">{error}</p>
          </div>
        ) : null}
      </section>

      {!route || !intelligence ? (
        <section className="rounded-2xl border border-dashed bg-slate-50 p-10 text-center">
          <h3 className="text-lg font-semibold text-slate-900">
            No route analyzed yet
          </h3>

          <p className="mt-2 text-sm text-slate-600">
            Enter your trip details above to generate live route intelligence.
          </p>
        </section>
      ) : (
        <>
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <article className="rounded-2xl border bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Live Distance</p>

              <p className="mt-2 text-3xl font-bold text-slate-950">
                {route.distanceMiles} mi
              </p>
            </article>

            <article className="rounded-2xl border bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">
                Estimated Drive Time
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-950">
                {formatDriveTime(route.estimatedDriveTimeMinutes)}
              </p>
            </article>

            <article className="rounded-2xl border bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Average Speed</p>

              <p className="mt-2 text-3xl font-bold text-slate-950">
                {intelligence.averageSpeedMph} mph
              </p>
            </article>

            <article className="rounded-2xl border bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">
                Estimated Diesel
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-950">
                {intelligence.estimatedFuelGallons} gal
              </p>
            </article>

            <article className="rounded-2xl border bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">
                Estimated Fuel Cost
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-950">
                {formatCurrency(intelligence.estimatedFuelCost)}
              </p>
            </article>

            <article className="rounded-2xl border bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">
                Fuel Cost per Mile
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-950">
                {formatCurrency(intelligence.fuelCostPerMile)}
              </p>
            </article>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
            <article className="rounded-2xl border bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Active Route
              </p>

              <h3 className="mt-1 text-2xl font-bold text-slate-950">
                {route.origin} → {route.destination}
              </h3>

              <div className="mt-6 rounded-xl bg-slate-50 p-5">
                <dl className="grid gap-4 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-slate-500">Provider</dt>
                    <dd className="font-semibold text-slate-900">
                      Google Maps
                    </dd>
                  </div>

                  <div>
                    <dt className="text-slate-500">Data Source</dt>
                    <dd className="font-semibold text-emerald-700">
                      Live
                    </dd>
                  </div>

                  <div>
                    <dt className="text-slate-500">Truck Efficiency</dt>
                    <dd className="font-semibold text-slate-900">
                      {truckMpg} MPG
                    </dd>
                  </div>

                  <div>
                    <dt className="text-slate-500">Diesel Price</dt>
                    <dd className="font-semibold text-slate-900">
                      {formatCurrency(Number(dieselPrice))}/gal
                    </dd>
                  </div>

                  <div>
                    <dt className="text-slate-500">Route Geometry</dt>
                    <dd className="font-semibold text-slate-900">
                      {route.encodedPolyline
                        ? "Received"
                        : "Unavailable"}
                    </dd>
                  </div>
                </dl>
              </div>
            </article>

            <article className="rounded-2xl border bg-slate-950 p-6 text-white shadow-sm">
              <p className="text-sm font-medium text-slate-300">
                Copilot Insight
              </p>

              <h3 className="mt-2 text-xl font-bold">
                Route analysis complete
              </h3>

              <div className="mt-5 space-y-3 text-sm text-slate-200">
                <p>
                  This trip requires approximately{" "}
                  <strong className="text-white">
                    {intelligence.estimatedFuelGallons} gallons
                  </strong>{" "}
                  of diesel.
                </p>

                <p>
                  Estimated fuel spending is{" "}
                  <strong className="text-white">
                    {formatCurrency(intelligence.estimatedFuelCost)}
                  </strong>
                  .
                </p>

                <p>
                  Fuel represents approximately{" "}
                  <strong className="text-white">
                    {formatCurrency(intelligence.fuelCostPerMile)}
                  </strong>{" "}
                  per routed mile.
                </p>

                <p className="rounded-xl bg-white/10 p-3">
                  Sprint 7 will add load revenue, deadhead, operating
                  expenses, and projected net profit.
                </p>
              </div>
            </article>
          </section>
        </>
      )}
    </div>
  );
}