import { Bucket } from "@miniplex/bucket";

export type EventListener<
  A = void,
  B = void,
  C = void,
  D = void,
  E = void,
  F = void,
  G = void
> = (...args: [A, B, C, D, E, F, G]) => void;

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
    return Promise.all(this.entities.map((listener) => listener(...args)));
  }
}
