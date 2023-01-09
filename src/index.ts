import { Bucket } from "@miniplex/bucket";

export type Callback<
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
  subscribers = new Bucket<Callback<A, B, C, D, E, F, G>>();

  /**
   * Subscribes a callback to the event.
   *
   * @param callback The callback to subscribe to the event.
   */
  subscribe(callback: Callback<A, B, C, D, E, F, G>) {
    this.subscribers.add(callback);
  }

  /**
   * Unsubscribes a callback from the event.
   *
   * @param callback The callback to unsubscribe from the event.
   */
  unsubscribe(callback: Callback<A, B, C, D, E, F, G>) {
    this.subscribers.remove(callback);
  }

  /**
   * Clears all existing subscriptions.
   */
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
    for (const callback of this.subscribers.entities) {
      callback(...args);
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
