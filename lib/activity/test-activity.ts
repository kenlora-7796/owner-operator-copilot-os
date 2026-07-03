import { registerActivityListeners } from "./activity-service";
import { eventBus } from "../events";
import { getTimelineEntries } from "../timeline";
import { startWorkflow } from "../workflow-engine";

export async function testActivitySystem() {
  registerActivityListeners();

  await eventBus.publish({
    id: crypto.randomUUID(),
    type: "document.uploaded",
    timestamp: new Date().toISOString(),
    source: "test-activity",
    payload: {
      documentName: "rate-confirmation-demo.pdf",
      uploadedBy: "owner-operator",
    },
  });

  await startWorkflow("rate_confirmation_review", {
    documentName: "rate-confirmation-demo.pdf",
  });

  return getTimelineEntries();
}