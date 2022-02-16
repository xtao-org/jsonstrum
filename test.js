import {JsonStrum} from './mod.js'

const s = JsonStrum({
  object: (object, p) => console.log('object', object, p),
  array: (array, p) => console.log('array', array, p),
  path: [{}, "sub"]
})

s.push(`
{
  "name": "me", 
  "sub": {"color": "blue"},
  "nil": null
`)

s.push(`,
"bool": false
}
{"name": "you"}
[1, 2, 3]`)

const s2 = JsonStrum({
  object: (object, p) => console.log('object', object, p),
  array: (array, p) => console.log('array', array, p),
  path: [{}, {}]
})

s2.push(`[
  {
    "name": "me", 
    "sub": {"color": "blue"},
    "nil": null,
    "bool": false
  },
  {"name": "you"},
  [1, 2, 3]
]`)


const s3 = JsonStrum({
  object: (object, p) => console.log('object', object, p),
  array: (array, p) => console.log('array', array, p),
  path: [{}, {}, {}, {}]
})

s3.push(`
[[
  [99, 22, [33, 44]],
  {"name": "Alice", "color": "red", "count": 5},
  {"name": "Bob", "color": "blue", "count": 4},
]]
`)