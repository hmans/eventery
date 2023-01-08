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
  emit(a: A, b: B, c: C, d: D, e: E, f: F, g: G) {
    for (const listener of this.entities) {
      listener(a, b, c, d, e, f, g);
    }
  }

  emitAsync(a: A, b: B, c: C, d: D, e: E, f: F, g: G) {
    return Promise.all(
      Array.from(this.entities).map((listener) => listener(a, b, c, d, e, f, g))
    );
  }
}
