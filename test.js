import {JsonStrum} from './mod.js'

const s = JsonStrum({
  object: (object) => console.log('object', object),
  array: (array) => console.log('array', array),
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
  object: (object) => console.log('object', object),
  array: (array) => console.log('array', array),
  level: 1,
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
