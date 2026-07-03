import type { SystemEvent } from "../events";
import { eventBus } from "../events";
import { createTimelineEntry } from "../timeline";

function recordTimelineEvent(event: SystemEvent) {
  createTimelineEntry(event);
}

export function registerActivityListeners() {
  eventBus.subscribe("document.uploaded", recordTimelineEvent);
  eventBus.subscribe("document.processed", recordTimelineEvent);
  eventBus.subscribe("document.classified", recordTimelineEvent);

  eventBus.subscribe("workflow.started", recordTimelineEvent);
  eventBus.subscribe("workflow.completed", recordTimelineEvent);
  eventBus.subscribe("workflow.failed", recordTimelineEvent);
  eventBus.subscribe("workflow.approval_required", recordTimelineEvent);

  eventBus.subscribe("agent.started", recordTimelineEvent);
  eventBus.subscribe("agent.completed", recordTimelineEvent);
  eventBus.subscribe("agent.failed", recordTimelineEvent);

  eventBus.subscribe("notification.created", recordTimelineEvent);
}