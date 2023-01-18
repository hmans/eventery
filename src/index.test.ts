import { Event } from "../src";

describe("EventDispatcher", () => {
  it("creates a new event", () => {
    const event = new Event();
    expect(event).toBeDefined();
  });

  describe("add", () => {
    it("adds a listener to the event", () => {
      const event = new Event();
      const listener = jest.fn();
      event.subscribe(listener);
      expect(event.subscribers.size).toBe(1);
    });
  });

  describe("remove", () => {
    it("removes a listener from the event", () => {
      const event = new Event();
      const listener = jest.fn();
      event.subscribe(listener);
      expect(event.subscribers.size).toBe(1);
      event.unsubscribe(listener);
      expect(event.subscribers.size).toBe(0);
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
  });
});
