export type AgentName =
  | "copilot"
  | "document"
  | "dispatch"
  | "billing"
  | "compliance";

export type AgentStatus =
  | "idle"
  | "thinking"
  | "needs_approval"
  | "completed"
  | "error";

export type AgentTaskType =
  | "summarize"
  | "extract"
  | "recommend"
  | "validate"
  | "create_action";

export interface AgentAction {
  id: string;
  label: string;
  description: string;
  riskLevel: "low" | "medium" | "high";
  requiresApproval: boolean;
}

export interface AgentTask {
  id: string;
  agent: AgentName;
  type: AgentTaskType;
  title: string;
  description: string;
  input: unknown;
  requiresApproval: boolean;
  createdAt: string;
}

export interface AgentResult {
  taskId: string;
  agent: AgentName;
  status: AgentStatus;
  summary: string;
  reasoning: string[];
  output: unknown;
  recommendedActions?: AgentAction[];
}