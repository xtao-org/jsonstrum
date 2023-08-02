# 0.3.0

BREAKING:
* transformed the library into an npm package
* updated jsonhilo dependency to 0.3.2
* code edit required: **.push(...)** is now **.chunk(...)**

```js
const s = JsonStrum(...)

s.push(...) // this will break
// to fix, change it to:
s.chunk(...) // this will work
```