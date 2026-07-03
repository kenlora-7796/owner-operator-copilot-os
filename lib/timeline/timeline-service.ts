import type { SystemEvent } from "../events";
import { kernelStore } from "../kernel/kernel-store";
import type { TimelineEntry, TimelineEventCategory } from "./timeline-types";

function mapEventTypeToCategory(eventType: string): TimelineEventCategory {
  if (eventType.startsWith("document.")) return "document";
  if (eventType.startsWith("workflow.")) return "workflow";
  if (eventType.startsWith("agent.")) return "agent";
  if (eventType.startsWith("notification.")) return "notification";

  return "system";
}

export function createTimelineEntry(event: SystemEvent): TimelineEntry {
  const entry: TimelineEntry = {
    id: crypto.randomUUID(),
    title: event.type,
    description: `System event recorded from ${event.source}.`,
    category: mapEventTypeToCategory(event.type),
    source: event.source,
    timestamp: event.timestamp,
    metadata: {
      eventId: event.id,
      payload: event.payload,
    },
  };

  kernelStore.timeline.unshift(entry);

  return entry;
}

export function getTimelineEntries(): TimelineEntry[] {
  return kernelStore.timeline;
}

export function clearTimelineEntries() {
  kernelStore.timeline.length = 0;
}