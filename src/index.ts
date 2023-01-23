export type Callback<T extends unknown[]> = (...args: T) => void;

export type SubscriptionEvent<T extends unknown[]> = Event<
  [callback: Callback<T>]
>;

export class Event<T extends unknown[] = []> {
  subscribers = new Set<Callback<T>>();

  protected _onSubscribe?: SubscriptionEvent<T>;
  protected _onUnsubscribe?: SubscriptionEvent<T>;

  /**
   * Event that is emitted when a new subscription is added.
   */
  get onSubscribe(): SubscriptionEvent<T> {
    if (!this._onSubscribe) this._onSubscribe = new Event();
    return this._onSubscribe;
  }

  /**
   * Event that is emitted when a subscription is removed.
   */
  get onUnsubscribe(): SubscriptionEvent<T> {
    if (!this._onUnsubscribe) this._onUnsubscribe = new Event();
    return this._onUnsubscribe;
  }

  /**
   * Subscribes a callback to the event.
   *
   * @param callback The callback to subscribe to the event.
   */
  subscribe(callback: Callback<T>) {
    this.subscribers.add(callback);
    this._onSubscribe?.emit(callback);
  }

  /**
   * Unsubscribes a callback from the event.
   *
   * @param callback The callback to unsubscribe from the event.
   */
  unsubscribe(callback: Callback<T>) {
    this.subscribers.delete(callback);
    this._onUnsubscribe?.emit(callback);
  }

  /**
   * Clears all existing subscriptions.
   */
  clear() {
    if (this._onUnsubscribe) {
      for (const callback of this.subscribers) {
        this._onUnsubscribe.emit(callback);
      }
    }

    this.subscribers.clear();
  }

  /**
   * Emit the event. This will invoke all stored listeners, passing the
   * given payload to each of them.
   *
   * @param args Arguments to pass to the listeners.
   */
  emit(...args: T) {
    this.subscribers.forEach((callback) => callback(...args));
  }

  /**
   * Emit the event. This will invoke all stored listeners, passing the
   * given payload to each of them. This method supports asynchronous
   * listeners and returns a promise that resolves when all listeners
   * have completed their work.
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
