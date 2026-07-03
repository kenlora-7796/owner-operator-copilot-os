export type TimelineEventCategory =
  | "document"
  | "workflow"
  | "agent"
  | "notification"
  | "approval"
  | "system";

export interface TimelineEntry {
  id: string;
  title: string;
  description: string;
  category: TimelineEventCategory;
  source: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}