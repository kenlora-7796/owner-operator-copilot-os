import type { SystemEvent } from "./event-types";

type EventHandler = (event: SystemEvent) => void | Promise<void>;

class EventBus {
  private handlers = new Map<string, EventHandler[]>();

  subscribe(eventType: string, handler: EventHandler) {
    const existing = this.handlers.get(eventType) ?? [];

    existing.push(handler);

    this.handlers.set(eventType, existing);
  }

  async publish(event: SystemEvent) {
    const handlers = this.handlers.get(event.type) ?? [];

    for (const handler of handlers) {
      await handler(event);
    }
  }
}

export const eventBus = new EventBus();