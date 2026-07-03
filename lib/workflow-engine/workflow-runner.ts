import { eventBus } from "../events";
import { createWorkflowState, updateWorkflowState } from "../workflow-state";
import type { WorkflowState } from "../workflow-state";
import type { WorkflowDefinition } from "./workflow-registry";

export async function runWorkflow(
  workflow: WorkflowDefinition,
  metadata?: Record<string, unknown>
): Promise<WorkflowState> {
  let state = createWorkflowState(workflow.name, metadata);

  await eventBus.publish({
    id: crypto.randomUUID(),
    type: "workflow.started",
    timestamp: new Date().toISOString(),
    source: "workflow-runner",
    payload: {
      workflowName: workflow.name,
      title: workflow.title,
      state,
    },
  });

  state = updateWorkflowState(state, {
    status: workflow.requiresApproval ? "waiting_for_approval" : "completed",
    currentStep: workflow.requiresApproval ? "approval" : "completed",
  });

  await eventBus.publish({
    id: crypto.randomUUID(),
    type: workflow.requiresApproval
      ? "workflow.approval_required"
      : "workflow.completed",
    timestamp: new Date().toISOString(),
    source: "workflow-runner",
    payload: {
      workflowName: workflow.name,
      title: workflow.title,
      state,
    },
  });

  return state;
}