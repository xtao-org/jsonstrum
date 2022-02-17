import {JsonStrum} from './mod.js'

const s = JsonStrum({
  object: (object, p) => console.log('object', object, p),
  array: (array, p) => console.log('array', array, p),
  path: [{}, {}],
})

s.push(`
[
  {"name": "Alice", "color": "red", "count": 5},
  {"name": "Bob", "color": "blue", "count": 4},
]
`)
