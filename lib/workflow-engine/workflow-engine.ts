import { workflowRegistry } from "./workflow-registry";
import type { WorkflowName } from "./workflow-registry";
import { runWorkflow } from "./workflow-runner";

export async function startWorkflow(
  workflowName: WorkflowName,
  metadata?: Record<string, unknown>
) {
  const workflow = workflowRegistry[workflowName];

  if (!workflow) {
    throw new Error(`Workflow not found: ${workflowName}`);
  }

  return runWorkflow(workflow, metadata);
}