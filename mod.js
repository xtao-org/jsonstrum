import { JsonHigh } from "./deps.js"

// todo: recursive descent, e.g. [{}, "x", {depthRange: []}, "obj"]
// depthRange: [0, 3] would be the same as ...([] | [{}] | [{}, {}] | [{}, {}, {}])
// depthRange: [] would be unbounded

// could also abstract the matcher into a module
const matchPath = (path, expr) => {
  // perhaps this should only check if prefix of path matches
  // i.e. it's enough that path.length >= expr.length
  // or maybe there should be a flag parameter which determines whether the match should be exact or just prefix
  if (path.length !== expr.length) return false
  for (let i = 0; i < expr.length; ++i) {
    const e = expr[i]
    const p = path[i]

    if (e === p) continue
    if (Array.isArray(e)) {
      if (e.length === 0) throw Error('empty alternative')
      for (const k of e) {
        if (p === k) continue
      }
      return false
    }
    // todo:
    // assume object
    const {range, regex} = e
    if (range !== undefined) {
      if (regex !== undefined) throw Error(`can't have regex & range simultaneously`)
      // assume no more than 2 elements
      // could also support step to match every nth element
      const [from, to] = e
      if (from !== undefined) {
        if (p < from) return false
      }
      if (to !== undefined) {
        if (p > to) return false
      }
    }
    if (regex !== undefined) {
      // assume match is a regex
      if (regex.test(p)) continue
      // throw Error(`must have either match or range`)
    }
    // assume empty object
    continue
  }
  return true
}

// perhaps this should also support non-object values (primitives)
export const JsonStrum = ({
  object,
  array,
  // perhaps rename to query or pathQuery or pathExpr
  path = [{}],
} = {}) => {
  const ancestors = []
  let parent = null
  let current = null
  let currentLevel = 0
  const currentPath = [-1]
  const level = path.length - 1

  const close = () => {
    --currentLevel
    currentPath.pop()
    // if currentPath matches exactly
    if (currentLevel === level && matchPath(currentPath, path)) {
      if (Array.isArray(current)) {
        array?.(current, currentPath)
      } else {
        object?.(current, currentPath)
      }
      current = null
      parent = null
    // if a prefix of currentPath matches
    } else if (currentLevel > level) {
      if (Array.isArray(parent)) {
        parent.push(current)
      } else {
        parent[currentPath.at(-1)] = current
      }
      current = parent
      parent = ancestors.pop()
    }
  }

  const incrementIndex = () => {
    const last = currentPath.at(-1)
    if (typeof last === 'number') {
      currentPath[currentPath.length - 1] += 1
    }
  }

  return JsonHigh({
    openArray: () => {
      ++currentLevel
      // if a prefix of current path matches
      if (currentLevel > level && matchPath(currentPath.slice(0, path.length), path)) {
        if (current !== null) {
          ancestors.push(parent)
          parent = current
        }
        current = []
      }
      incrementIndex()
      currentPath.push(-1)
    },
    openObject: () => {
      ++currentLevel
      // if a prefix of current path matches
      if (currentLevel > level && matchPath(currentPath.slice(0, path.length), path)) {
        if (current !== null) {
          ancestors.push(parent)
          parent = current
        }
        current = {}
      }
      incrementIndex()
      currentPath.push("")
    },
    closeArray: close,
    closeObject: close,
    key: (k) => { 
      // if (currentLevel > level && matchPath(currentPath.slice(0, path.length), path)) key = k
      currentPath[currentPath.length - 1] = k
    },
    value: (value) => {
      // if a prefix of current path matches
      if (currentLevel > level && matchPath(currentPath.slice(0, path.length), path)) {
        if (Array.isArray(current)) {
          current.push(value)
        } else {
          current[currentPath.at(-1)] = value
        }
      }
      incrementIndex()
    },
  })
}
