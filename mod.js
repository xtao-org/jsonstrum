import { JsonHigh } from "./deps.js"

export const JsonStrum = ({
  object,
  array,
  level = 0
} = {}) => {
  const ancestors = []
  let parent = null
  let current = null
  let key = null
  let currentLevel = 0

  const close = () => {
    --currentLevel
    if (currentLevel === level) {
      if (Array.isArray(current)) {
        array?.(current)
      } else {
        object?.(current)
      }
      current = null
      parent = null
    } else if (currentLevel > level) {
      if (Array.isArray(parent)) {
        parent.push(current)
      } else {
        parent[key] = current
      }
      current = parent
      parent = ancestors.pop()
    }
  }

  return JsonHigh({
    openArray: () => {
      ++currentLevel
      if (currentLevel > level) {
        if (current !== null) {
          ancestors.push(parent)
          parent = current
        }
        current = []
      }
    },
    openObject: () => {
      ++currentLevel
      if (currentLevel > level) {
        if (current !== null) {
          ancestors.push(parent)
          parent = current
        }
        current = {}
      }
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
