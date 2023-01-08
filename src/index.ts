import { Bucket } from "@miniplex/bucket";

export type EventListener<
  A = void,
  B = void,
  C = void,
  D = void,
  E = void,
  F = void,
  G = void
> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => void;

export class EventDispatcher<
  A = void,
  B = void,
  C = void,
  D = void,
  E = void,
  F = void,
  G = void
> extends Bucket<EventListener<A, B, C, D, E, F, G>> {
  emit(...args: [A, B, C, D, E, F, G]) {
    for (const listener of this.entities) {
      listener(...args);
    }
  }

  emitAsync(...args: [A, B, C, D, E, F, G]) {
    return Promise.all(
      Array.from(this.entities).map((listener) => listener(...args))
    );
  }
}
