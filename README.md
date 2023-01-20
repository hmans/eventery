# Eventery

A tiny publish-subscribe library for JavaScript, specifically tailored for use in games:

- Instantiate event objects with typed arguments.
- Supports events with zero, one, or multiple typed arguments; no need to create extra payload objects for events with multiple arguments.
- Events support synchronous and asynchronous publishing.
- Uses itself to provide events that notify about new or removed subscribers.
- Zero dependencies!

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

## Event Payloads

Event payloads are typed using TypeScript's tuple syntax. For example, the following event has a payload with two arguments:

```ts
const event = new Event<[number, number]>();
```

These arguments may optionally be named:

```ts
const event = new Event<[x: number, y: number]>();
```

Payload arguments can be made optional:

```ts
const event = new Event<[dt: number, context?: string]>();
```

They can use the `...` syntax to indicate that the argument is a rest parameter:

```ts
const event = new Event<[context: string, ...deltas: number[]]>();
```

## Subscribe/Unsubscribe Notification Events

`Event` provides two events that notify about new or removed subscribers:

```ts
import { Event } from "eventery";

const event = new Event<[number]>();

/* Subscribe to the event that notifies about new subscribers. */
event.onSubscribed.subscribe((callback) => {
  console.log("New subscriber:", callback);
});

/* Subscribe to the event that notifies about removed subscribers. */
event.onUnsubscribed.subscribe((callback) => {
  console.log("Removed subscriber:", callback);
});

const callback = function (dt: number) {
  console.log(dt);
};

/* Subscribe a callback. This will trigger all `onSubscribe` callbacks. */
event.subscribe(callback);

/* Unsubscribe the callback. This will trigger all `onUnsubscribe` callbacks. */
event.unsubscribe(callback);
```
