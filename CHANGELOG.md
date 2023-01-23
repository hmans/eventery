# eventery

## 0.0.4

### Patch Changes

- be28d45: `subscribe` will now return a function that will unsubscribe the listener - useful for use in React side effects:

  ```ts
  useEffect(() => event.subscribe(listener), []);
  ```

- 2af5aca: `Event` now provides `onSubscribe` and `onUnsubscribe` events that are emitted when new subscribers are added or removed.

## 0.0.3

### Patch Changes

- 08e74a7: Remove the dependency to `@miniplex/bucket` and use a normal `Set` instead.
- 451339b: Changed the way events are typed to use tuple types.

## 0.0.2

### Patch Changes

- ab26346: `subscribe`, `unsubscribe`, `publish`.
