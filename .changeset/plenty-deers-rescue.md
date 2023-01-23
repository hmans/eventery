---
"eventery": patch
---

`subscribe` will now return a function that will unsubscribe the listener - useful for use in React side effects:

```ts
useEffect(() => event.subscribe(listener), []);
```
