import {JsonStrum} from 'https://cdn.jsdelivr.net/gh/xtao-org/jsonstrum@v0.1.0/mod.js'

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
