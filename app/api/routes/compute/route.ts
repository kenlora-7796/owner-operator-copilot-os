import { NextResponse } from "next/server";
import { googleRoutesService } from "@/lib/services/google";

interface ComputeRouteRequest {
  origin?: string;
  destination?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ComputeRouteRequest;

    const origin = body.origin?.trim();
    const destination = body.destination?.trim();

    if (!origin || !destination) {
      return NextResponse.json(
        {
          error: "Origin and destination are required.",
        },
        {
          status: 400,
        }
      );
    }

    const route = await googleRoutesService.computeRoute({
      origin,
      destination,
    });

    return NextResponse.json(route);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "An unexpected route error occurred.";

    console.error("Route computation failed:", error);

    return NextResponse.json(
      {
        error: message,
      },
      {
        status: 500,
      }
    );
  }
}