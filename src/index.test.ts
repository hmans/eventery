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
      event.add(listener);
      expect(event.subscribers.size).toBe(1);
    });
  });

  describe("remove", () => {
    it("removes a listener from the event", () => {
      const event = new Event();
      const listener = jest.fn();
      event.add(listener);
      expect(event.subscribers.size).toBe(1);
      event.remove(listener);
      expect(event.subscribers.size).toBe(0);
    });
  });

  describe("emit", () => {
    it("emits an event", () => {
      const event = new Event<string, number>();
      const listener = jest.fn();
      event.add(listener);
      event.emit("test", 123);
      expect(listener).toHaveBeenCalledWith("test", 123);
    });
  });

  describe("emitAsync", () => {
    it("emits an event asynchronously", async () => {
      const event = new Event<string, number>();
      const listener = jest.fn();
      event.add(listener);
      await event.emitAsync("test", 123);
      expect(listener).toHaveBeenCalledWith("test", 123);
    });
  });

  describe("clear", () => {
    it("clears all listeners from the event", () => {
      const event = new Event();
      const listener = jest.fn();
      event.add(listener);
      expect(event.subscribers.size).toBe(1);
      event.clear();
      expect(event.subscribers.size).toBe(0);
    });
  });
});
