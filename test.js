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

test('deep', () => {
  const acc = []
  const s2 = JsonStrum({
    object: (object) => acc.push('object', object),
    array: (array) => acc.push('array', array),
    level: 1,
  })
  
  s2.chunk(`[
    {
      "id" : "1234",
      "name" : "Name",
      "key1" : {
        "deepKey1" : "Some value",
        "deepKey2" : "Some value",
        "deepKey3" : [ ]
      },
      "key2" : "123456",
      "key3" : false,
      "key4" : {
        "deepKey1" : "Test",
        "deepKey2" : "1234"
      },
      "key5" : 0,
      "address" : {
        "country" : "Sweden",
        "code" : "SE",
        "postal_code" : "1234",
        "postal_address" : "Some address",
        "address" : [ "Some stuff", "More stuff" ],
        "province" : "Stockholm",
        "comune_number" : "1234"
      }
    }
  ]`)

  assert.deepEqual(acc, [
    'object',
    {
      address: {
        address: [
          'Some stuff',
          'More stuff'
        ],
        code: 'SE',
        comune_number: '1234',
        country: 'Sweden',
        postal_address: 'Some address',
        postal_code: '1234',
        province: 'Stockholm'
      },
      id: '1234',
      name: 'Name',
      key1: {
        deepKey1: 'Some value',
        deepKey2: 'Some value',
        deepKey3: []
      },
      key2: '123456',
      key3: false,
      key4: {
        deepKey1: 'Test',
        deepKey2: '1234'
      },
      key5: 0,
    }
  ])
})
