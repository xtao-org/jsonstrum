# JsonStrum.js

A high-level wrapper over [JsonHilo](https://github.com/xtao-org/jsonhilo) which emits fully parsed objects and arrays.

Should work in any modern JavaScript runtime: Node.js, Bun, Deno, the browser.

## Install

### Node.js and Bun

An [npm package](https://www.npmjs.com/package/@xtao-org/jsonstrum) is available:

```
npm i @xtao-org/jsonstrum
```

### Deno or the browser

Import modules directly from a CDN such as [jsDelivr](https://www.jsdelivr.com/):

```js
import {JsonHigh} from 'https://cdn.jsdelivr.net/gh/xtao-org/jsonstrum@v0.2.3/mod.js'
```

Alternatively in Deno you can also import the npm package:

```js
import {JsonStrum} from 'npm:@xtao-org/jsonstrum'
```

## Quickstart

```js
// if using Deno import from 'npm:@xtao-org/jsonstrum'
import {JsonStrum} from '@xtao-org/jsonstrum'

const s = JsonStrum({
  object: (object) => console.log('object', object),
  array: (array) => console.log('array', array),
  // will only parse and emit objects at this level of nesting 
  level: 1,
})

s.chunk(`
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