export interface RouteIntelligenceInput {
  distanceMiles: number;
  driveTimeMinutes: number;
  truckMpg: number;
  dieselPricePerGallon: number;
}

export interface RouteIntelligenceResult {
  distanceMiles: number;
  driveTimeMinutes: number;
  averageSpeedMph: number;
  estimatedFuelGallons: number;
  estimatedFuelCost: number;
  fuelCostPerMile: number;
}

function round(value: number, decimals = 2): number {
  const multiplier = 10 ** decimals;

  return Math.round(value * multiplier) / multiplier;
}

export function calculateRouteIntelligence(
  input: RouteIntelligenceInput
): RouteIntelligenceResult {
  const {
    distanceMiles,
    driveTimeMinutes,
    truckMpg,
    dieselPricePerGallon,
  } = input;

  if (distanceMiles < 0 || driveTimeMinutes < 0) {
    throw new Error("Route distance and drive time cannot be negative.");
  }

  if (truckMpg <= 0) {
    throw new Error("Truck MPG must be greater than zero.");
  }

  if (dieselPricePerGallon < 0) {
    throw new Error("Diesel price cannot be negative.");
  }

  const driveTimeHours = driveTimeMinutes / 60;

  const averageSpeedMph =
    driveTimeHours > 0 ? distanceMiles / driveTimeHours : 0;

  const estimatedFuelGallons = distanceMiles / truckMpg;
  const estimatedFuelCost =
    estimatedFuelGallons * dieselPricePerGallon;

  const fuelCostPerMile =
    distanceMiles > 0 ? estimatedFuelCost / distanceMiles : 0;

  return {
    distanceMiles: round(distanceMiles, 1),
    driveTimeMinutes,
    averageSpeedMph: round(averageSpeedMph, 1),
    estimatedFuelGallons: round(estimatedFuelGallons, 1),
    estimatedFuelCost: round(estimatedFuelCost),
    fuelCostPerMile: round(fuelCostPerMile),
  };
}