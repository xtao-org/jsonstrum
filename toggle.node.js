import {renameSync, existsSync} from 'fs'

if (existsSync('deps.old.js') === false) {
  renameSync('deps.js', 'deps.old.js')
  console.log('renamed deps.js -> deps.old.js')
  renameSync('deps.node.js', 'deps.js')
  console.log('renamed deps.node.js -> deps.js')
} else {
  renameSync('deps.js', 'deps.node.js')
  console.log('renamed deps.js -> deps.node.js')
  renameSync('deps.old.js', 'deps.js')
  console.log('renamed deps.old.js -> deps.js')
}