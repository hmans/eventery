import { Event } from "../src";

describe("EventDispatcher", () => {
  it("creates a new event", () => {
    const event = new Event();
    expect(event).toBeDefined();
  });

  it("creates a new event with an anonymous typed payload", () => {
    const event = new Event<[number, string?]>();
    expect(event).toBeDefined();
    event.emit(0.01);
  });

  it("creates a new event with a typed payload", () => {
    const event = new Event<[deltaTime: number]>();
    expect(event).toBeDefined();
    event.emit(0.01);
  });

  it("creates a new event with a typed payload with multiple arguments", () => {
    const event = new Event<[deltaTime: number, context: string]>();
    expect(event).toBeDefined();
    event.emit(0.01, "test");
  });

  it("creates a new event with a typed payload with multiple arguments, some of them optional", () => {
    const event = new Event<[deltaTime: number, context?: string]>();
    expect(event).toBeDefined();
    event.emit(0.01);
  });

  it("creates a new event with a typed, variadic payload", () => {
    const event = new Event<[context: string, ...rest: number[]]>();
    expect(event).toBeDefined();
    event.emit("test", 1, 2, 3);
  });

  describe("subscribe", () => {
    it("adds a listener to the event", () => {
      const event = new Event();

      const listener = jest.fn();
      event.subscribe(listener);

      expect(event.subscribers.size).toBe(1);
    });

    it("emits the onSubscribe event", () => {
      const event = new Event();

      const listener = jest.fn();
      event.onSubscribe.subscribe(listener);

      const callback = jest.fn();
      event.subscribe(callback);

      expect(listener).toHaveBeenCalledWith(callback);
    });
  });

  describe("unsubscribe", () => {
    it("removes a listener from the event", () => {
      const event = new Event();

      const listener = jest.fn();
      event.subscribe(listener);
      expect(event.subscribers.size).toBe(1);

      event.unsubscribe(listener);
      expect(event.subscribers.size).toBe(0);
    });

    it("emits the onUnsubscribe event", () => {
      const event = new Event();
      const listener = jest.fn();
      event.onUnsubscribe.subscribe(listener);

      const callback = jest.fn();
      event.subscribe(callback);
      event.unsubscribe(callback);

      expect(listener).toHaveBeenCalledWith(callback);
    });
  });

  describe("emit", () => {
    it("emits an event", () => {
      const event = new Event<[message: string, count: number]>();
      const listener = jest.fn();
      event.subscribe(listener);
      event.emit("test", 123);
      expect(listener).toHaveBeenCalledWith("test", 123);
    });
  });

  describe("emitAsync", () => {
    it("emits an event asynchronously", async () => {
      const event = new Event<[name: string, count: number]>();
      const listener = jest.fn();
      event.subscribe(listener);
      await event.emitAsync("test", 123);
      expect(listener).toHaveBeenCalledWith("test", 123);
    });
  });

  describe("clear", () => {
    it("clears all listeners from the event", () => {
      const event = new Event();
      const listener = jest.fn();
      event.subscribe(listener);
      expect(event.subscribers.size).toBe(1);
      event.clear();
      expect(event.subscribers.size).toBe(0);
    });

    it("emite the onUnsubscribe event for each registered subscriber", () => {
      const event = new Event();
      const listener = jest.fn();
      event.onUnsubscribe.subscribe(listener);

      event.subscribe(jest.fn());
      event.subscribe(jest.fn());
      event.clear();

      expect(listener).toHaveBeenCalledTimes(2);
    });
  });
});
