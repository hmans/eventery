# Eventery

A tiny publish-subscribe library for JavaScript, specifically tailored for use in games.

```ts
import { Event } from "eventery";

/*
Create an event. The generic type is the type of the argument passed to the subscribers.
*/
const event = new Event<number>();

/* Create a callback and add it as a subscriber. */
function callback(value: number) {
  console.log(value);
}

event.subscribe(callback);

/* Publish an event. The subscribers will be invoked synchronously. */
event.publish(123);

/* Unsubscribe the callback. */
event.unsubscribe(callback);

/* Clear all subscribers. */
event.clear();
```
