/**
 * Owner Operator Copilot OS
 * Event Types
 *
 * Every important system action becomes an event.
 */

export type EventType =
  | "document.uploaded"
  | "document.processed"
  | "document.classified"
  | "workflow.started"
  | "workflow.completed"
  | "workflow.failed"
  | "workflow.approval_required"
  | "agent.started"
  | "agent.completed"
  | "agent.failed"
  | "timeline.created"
  | "notification.created";

export interface SystemEvent<T = unknown> {
  id: string;
  type: EventType;
  timestamp: string;
  source: string;
  payload: T;
}