import { Bucket } from "@miniplex/bucket";

export type EventListener<
  A = void,
  B = void,
  C = void,
  D = void,
  E = void,
  F = void,
  G = void
> = (...args: [A, B, C, D, E, F, G]) => void;

export class EventDispatcher<
  A = void,
  B = void,
  C = void,
  D = void,
  E = void,
  F = void,
  G = void
> extends Bucket<EventListener<A, B, C, D, E, F, G>> {
  /**
   * Emit the event. This will invoke all stored listeners synchronously,
   * in the order they were added.
   *
   * @param args Arguments to pass to the listeners.
   */
  emit(...args: [A, B, C, D, E, F, G]) {
    for (const listener of this.entities) {
      listener(...args);
    }
  }

  /**
   * Emit the event. This will invoke all stored listeners asynchronously.
   * The order in which the listeners are invoked is not guaranteed.
   *
   * @param args Arguments to pass to the listeners.
   * @returns A promise that resolves when all listeners have been invoked.
   */
  emitAsync(...args: [A, B, C, D, E, F, G]) {
    return Promise.all(this.entities.map((listener) => listener(...args)));
  }
}
