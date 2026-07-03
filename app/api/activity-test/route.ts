import { NextResponse } from "next/server";
import { testActivitySystem } from "@/lib/activity";

export async function GET() {
  const timeline = await testActivitySystem();

  return NextResponse.json({
    success: true,
    message: "Activity system test completed.",
    data: timeline,
    timestamp: new Date().toISOString(),
  });
}