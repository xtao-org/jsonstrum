import {JsonStrum} from 'https://cdn.jsdelivr.net/gh/xtao-org/jsonstrum@v0.2.0/mod.js'

const s = JsonStrum({
  object: (object) => console.log('object', object),
  array: (array) => console.log('array', array),
  level: 1,
})

s.push(`
[
  {"name": "Alice", "color": "red", "count": 5},
  {"name": "Bob", "color": "blue", "count": 4},
]
`)
