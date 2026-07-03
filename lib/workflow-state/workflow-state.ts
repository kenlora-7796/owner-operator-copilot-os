export type WorkflowStatus =
  | "pending"
  | "running"
  | "waiting_for_approval"
  | "approved"
  | "completed"
  | "failed"
  | "cancelled";

export interface WorkflowState {
  id: string;
  workflowName: string;
  status: WorkflowStatus;
  currentStep: string;
  createdAt: string;
  updatedAt: string;
  metadata?: Record<string, unknown>;
}

export function createWorkflowState(
  workflowName: string,
  metadata?: Record<string, unknown>
): WorkflowState {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    workflowName,
    status: "pending",
    currentStep: "created",
    createdAt: now,
    updatedAt: now,
    metadata,
  };
}

export function updateWorkflowState(
  state: WorkflowState,
  updates: Partial<Omit<WorkflowState, "id" | "createdAt">>
): WorkflowState {
  return {
    ...state,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
}