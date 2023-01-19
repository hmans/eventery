# Eventery

A tiny publish-subscribe library for JavaScript, specifically tailored for use in games:

- Instantiate event objects with typed arguments.
- Uses Bucketeer for optimized array performance.
- Supports events with zero, one, or multiple typed arguments; no need to create extra payload objects for events with multiple arguments.
- Events support synchronous and asynchronous publishing.

## Usage

```ts
import { Event } from "eventery";

/* Create an event. You can pass a type to describe the event's
payload arguments. These may optionally be named, like here: */
const event = new Event<[deltaTime: number]>();

/* Create a callback and add it as a subscriber. */
function callback(dt: number) {
  console.log(dt);
}

event.subscribe(callback);

/* Publish an event. The subscribers will be invoked synchronously. */
event.publish(123);

/* Unsubscribe the callback. */
event.unsubscribe(callback);

/* Clear all subscribers. */
event.clear();
```
