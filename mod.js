import { JsonHigh } from "@xtao-org/jsonhilo"

export const JsonStrum = ({
  object,
  array,
  level = 0
} = {}) => {
  const ancestors = []
  let parent = null
  let current = null
  const path = []
  let currentLevel = 0

  const close = () => {
    --currentLevel
    path.pop()
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
        parent[path.at(-1)] = current
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
        path.push(-1)
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
        path.push("")
      }
    },
    closeArray: close,
    closeObject: close,
    key: (k) => { 
      if (currentLevel > level) {
        path[path.length - 1] = k
      }
    },
    value: (value) => {
      if (currentLevel > level) {
        if (Array.isArray(current)) {
          current.push(value)
        } else {
          current[path.at(-1)] = value
        }
      }
    },
  })
}
