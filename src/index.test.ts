import { EventDispatcher } from "../src";

describe("EventDispatcher", () => {
  it("creates a new event", () => {
    const event = new EventDispatcher();
    expect(event).toBeDefined();
  });

  describe("add", () => {
    it("adds a listener to the event", () => {
      const event = new EventDispatcher();
      const listener = jest.fn();
      event.add(listener);
      expect(event.size).toBe(1);
    });
  });

  describe("remove", () => {
    it("removes a listener from the event", () => {
      const event = new EventDispatcher();
      const listener = jest.fn();
      event.add(listener);
      expect(event.size).toBe(1);
      event.remove(listener);
      expect(event.size).toBe(0);
    });
  });

  describe("emit", () => {
    it("emits an event", () => {
      const event = new EventDispatcher<string>();
      const listener = jest.fn();
      event.add(listener);
      event.emit("test");
      expect(listener).toHaveBeenCalledWith(
        "test",
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      );
    });
  });

  describe("emitAsync", () => {
    it("emits an event asynchronously", async () => {
      const event = new EventDispatcher<string>();
      const listener = jest.fn();
      event.add(listener);
      await event.emitAsync("test");
      expect(listener).toHaveBeenCalledWith(
        "test",
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      );
    });
  });

  describe("clear", () => {
    it("clears all listeners from the event", () => {
      const event = new EventDispatcher();
      const listener = jest.fn();
      event.add(listener);
      expect(event.size).toBe(1);
      event.clear();
      expect(event.size).toBe(0);
    });
  });
});
