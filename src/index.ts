export type Callback<T extends unknown[]> = (...args: T) => void;

export class Event<T extends unknown[]> {
  subscribers = new Set<Callback<T>>();

  /**
   * Subscribes a callback to the event.
   *
   * @param callback The callback to subscribe to the event.
   */
  subscribe(callback: Callback<T>) {
    this.subscribers.add(callback);
  }

  /**
   * Unsubscribes a callback from the event.
   *
   * @param callback The callback to unsubscribe from the event.
   */
  unsubscribe(callback: Callback<T>) {
    this.subscribers.delete(callback);
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
  emit(...args: T) {
    this.subscribers.forEach((callback) => callback(...args));
  }

  /**
   * Emit the event. This will invoke all stored listeners asynchronously.
   * The order in which the listeners are invoked is not guaranteed.
   *
   * @param args Arguments to pass to the listeners.
   * @returns A promise that resolves when all listeners have been invoked.
   */
  emitAsync(...args: T) {
    return Promise.all(
      [...this.subscribers].map((listener) => listener(...args))
    );
  }
}
