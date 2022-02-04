import { JsonHigh } from "./deps.js"

export const JsonStrum = ({
  object,
  array,
  level = 0
} = {}) => {
  const parents = []
  let parent = null
  let current = null
  let key = null

  const close = () => {
    if (parents.length === level) {
      if (Array.isArray(current)) {
        array?.(current)
      } else {
        object?.(current)
      }
    } 
    
    if (parents.length === 0) {
      current = null
      parent = null
    } else {
      if (Array.isArray(parent)) {
        parent.push(current)
      } else {
        parent[key] = current
      }
      current = parent
      parent = parents.pop()
    }
  }

  return JsonHigh({
    openArray: () => {
      if (current !== null) {
        parents.push(parent)
        parent = current
      }
      current = []
    },
    openObject: () => {
      if (current !== null) {
        parents.push(parent)
        parent = current
      }
      current = {}
    },
    closeArray: close,
    closeObject: close,
    key: (k) => key = k,
    value: (value) => {
      if (Array.isArray(current)) {
        current.push(value)
      } else {
        current[key] = value
      }
    },
  })
}
