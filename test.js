import test from 'node:test'
import assert from 'node:assert';

import {JsonStrum} from './mod.js'

test('basic', () => {
  const acc = []
  const s = JsonStrum({
    object: (object) => acc.push('object', object),
    array: (array) => acc.push('array', array),
  })
  
  s.chunk(`
  {
    "name": "me", 
    "sub": {"color": "blue"},
    "nil": null
  `)
  
  s.chunk(`,
  "bool": false
  }
  {"name": "you"}
  [1, 2, 3]`)

  assert.deepEqual(acc, [
    'object', { name: 'me', sub: { color: 'blue' }, nil: null, bool: false },
    'object', { name: 'you' },
    'array', [ 1, 2, 3 ]
  ])
})

test('level 1', () => {
  const acc = []
  const s2 = JsonStrum({
    object: (object) => acc.push('object', object),
    array: (array) => acc.push('array', array),
    level: 1,
  })

  s2.chunk(`[
    {
      "name": "me", 
      "sub": {"color": "blue"},
      "nil": null,
      "bool": false
    },
    {"name": "you"},
    [1, 2, 3]
  ]`)

  assert.deepEqual(acc, [
    'object', { name: 'me', sub: { color: 'blue' }, nil: null, bool: false },
    'object', { name: 'you' },
    'array', [ 1, 2, 3 ]
  ])
})

test('level 3', () => {
  const acc = []
  const s3 = JsonStrum({
    object: (object) => acc.push('object', object),
    array: (array) => acc.push('array', array),
    level: 3,
  })

  s3.chunk(`
  [[
    [99, 22, [33, 44]],
    {"name": "Alice", "color": "red", "count": 5},
    {"name": "Bob", "color": "blue", "count": 4},
  ]]
  `)

  assert.deepEqual(acc, [
    'array', [ 33, 44 ]
  ])
})