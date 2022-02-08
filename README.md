NOTE: THIS IS A SKETCH

# JsonStrum.js

A high-level wrapper over [JsonHilo](https://github.com/xtao-org/jsonhilo) which emits fully parsed objects and arrays.

## Quickstart

### Deno or the browser

```js
// see also quickstart.js
// replace vx.y.z below with latest/desired version
import {JsonStrum} from 'https://cdn.jsdelivr.net/gh/xtao-org/jsonstrum@v0.2.0/mod.js'

const s = JsonStrum({
  object: (object) => console.log('object', object),
  array: (array) => console.log('array', array),
  // will only parse and emit objects at this level of nesting 
  level: 1,
})

s.push(`
[
  {"name": "Alice", "color": "red", "count": 5},
  {"name": "Bob", "color": "blue", "count": 4},
]
`)
/* OUTPUT:
object { name: "Alice", color: "red", count: 5 }
object { name: "Bob", color: "blue", count: 4 }
*/
```