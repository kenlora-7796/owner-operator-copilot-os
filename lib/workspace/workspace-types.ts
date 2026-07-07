export interface WorkspaceMetric {
  id: string;
  title: string;
  value: string;
  subtitle: string;
}

export interface AIEmployee {
  id: string;
  name: string;
  role: string;
  status: "working" | "waiting" | "idle";
  summary: string;
}

export interface WorkQueueItem {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}

export interface WorkspaceDocument {
  id: string;
  name: string;
  status: string;
  icon: string;
}

export interface WorkspaceLoad {
  id: string;
  lane: string;
  rate: string;
  status: string;
}

export interface ComplianceItem {
  id: string;
  label: string;
  status: string;
  color: string;
}

export interface WorkspaceData {
  metrics: WorkspaceMetric[];
  employees: AIEmployee[];
  workQueue: WorkQueueItem[];
  documents: WorkspaceDocument[];
  loads: WorkspaceLoad[];
  compliance: ComplianceItem[];
}