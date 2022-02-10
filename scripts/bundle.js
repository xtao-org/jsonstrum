const p = Deno.run({cmd: 'deno bundle mod.js dist/bundle.js'.split(' ')})

await p.status()