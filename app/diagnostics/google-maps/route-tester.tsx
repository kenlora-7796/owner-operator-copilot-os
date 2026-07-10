"use client";

import { FormEvent, useState } from "react";

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

export function RouteTester() {
  const [origin, setOrigin] = useState("Jackson, MS");
  const [destination, setDestination] = useState("Memphis, TN");
  const [route, setRoute] = useState<LiveRouteResult | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
            : "The live route request failed."
        );
      }

      setRoute(data as LiveRouteResult);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "An unexpected error occurred."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">
        Live Route Test
      </h2>

      <p className="mt-2 text-sm text-slate-600">
        Submit an origin and destination to calculate real mileage and drive
        time using Google Routes.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 grid gap-4 md:grid-cols-2"
      >
        <label className="space-y-2">
          <span className="text-sm font-medium">Origin</span>

          <input
            value={origin}
            onChange={(event) => setOrigin(event.target.value)}
            className="w-full rounded-lg border px-3 py-2"
            placeholder="Jackson, MS"
            required
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium">Destination</span>

          <input
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            className="w-full rounded-lg border px-3 py-2"
            placeholder="Memphis, TN"
            required
          />
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-slate-900 px-4 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2"
        >
          {isLoading ? "Calculating live route..." : "Calculate Live Route"}
        </button>
      </form>

      {error ? (
        <div className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4">
          <p className="font-medium text-red-700">
            Route request failed
          </p>

          <p className="mt-1 text-sm text-red-600">
            {error}
          </p>
        </div>
      ) : null}

      {route ? (
        <div className="mt-6 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-slate-500">
                Live Distance
              </p>

              <p className="mt-1 text-2xl font-bold">
                {route.distanceMiles} miles
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-sm text-slate-500">
                Estimated Drive Time
              </p>

              <p className="mt-1 text-2xl font-bold">
                {formatDriveTime(
                  route.estimatedDriveTimeMinutes
                )}
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-slate-50 p-4 text-sm">
            <p>
              <strong>Origin:</strong> {route.origin}
            </p>

            <p>
              <strong>Destination:</strong> {route.destination}
            </p>

            <p>
              <strong>Provider:</strong> Google Maps
            </p>

            <p>
              <strong>Data:</strong> Live
            </p>

            <p>
              <strong>Route geometry:</strong>{" "}
              {route.encodedPolyline
                ? "Received"
                : "Not returned"}
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}