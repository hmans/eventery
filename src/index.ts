import { Bucket } from "@miniplex/bucket";

export type Listener<
  A = void,
  B = void,
  C = void,
  D = void,
  E = void,
  F = void,
  G = void
> = (...args: [A, B, C, D, E, F, G]) => void;

export class Event<
  A = void,
  B = void,
  C = void,
  D = void,
  E = void,
  F = void,
  G = void
> {
  subscribers = new Bucket<Listener<A, B, C, D, E, F, G>>();

  add(listener: Listener<A, B, C, D, E, F, G>) {
    this.subscribers.add(listener);
  }

  remove(listener: Listener<A, B, C, D, E, F, G>) {
    this.subscribers.remove(listener);
  }

  clear() {
    this.subscribers.clear();
  }

  /**
   * Emit the event. This will invoke all stored listeners synchronously,
   * in the order they were added.
   *
   * @param args Arguments to pass to the listeners.
   */
  emit(...args: [A, B, C, D, E, F, G]) {
    for (const listener of this.subscribers.entities) {
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
    return Promise.all(
      this.subscribers.entities.map((listener) => listener(...args))
    );
  }
}
