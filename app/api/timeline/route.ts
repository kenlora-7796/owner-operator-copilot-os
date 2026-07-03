import { NextResponse } from "next/server";
import { getTimelineEntries } from "@/lib/timeline";

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Timeline entries retrieved.",
    data: getTimelineEntries(),
    timestamp: new Date().toISOString(),
  });
}