// Usage: ./run.js <modulePath.js> [--gc]

const timeToRun = 1000
const pausePerBlock = 500

// const description = {
//   blocks: [
//     {
//       id: 'case-1',
//       setup: () => {
//         return () => 2 + 2
//       }
//     }
//   ]
// }

const args = typeof process !== 'undefined' ? process.argv.slice(2) : ARGV
const gc =
  typeof globalThis.gc !== 'undefined' ? globalThis.gc :
  typeof Bun !== 'undefined' ? Bun.gc : () => {};

const modulePath = args[0]
const runGC = args.includes('--gc')
await run(modulePath)

async function run(path) {
  let blocks
  try {
    blocks = await getBlocks(path)
    await runTests(blocks)
  } catch(e) {
    console.log('ERROR: ' + e.message)
  }

  const maxLength = blocks.reduce((max, block) => Math.max(max, block.id.length), 0)

  blocks.forEach(block => {
    console.log(`CASE: ${(block.id + ':').padEnd(maxLength + 1, ' ')} `
      + '#'.repeat(block.result.percent / 2).padEnd(50, '.')
      + ' ' + block.result.percent + '%'
      + ` (${block.result.amountOfRounds} ops)`
      + ` (${(block.result.runTime / block.result.amountOfRounds).toPrecision(4)} ms/op)`
      )
  })
}

async function getBlocks(path) {
  const module = await import(path)
  const blocks = module.default.blocks

  blocks.forEach((block, index) => {
    block.run = block.setup()
  })

  return blocks
}

async function runTests(blocks) {
  for (let block of blocks) {
    runTestForAmountOfTime(block, 500)
  }
  await sleep(1000)

  let timeForTest = ((timeToRun + (pausePerBlock * 2)) * blocks.length) - pausePerBlock
  let completeTestStart = Date.now()

  for (let i = 0; i < blocks.length; i++) {
    let block = blocks[i]
    await sleep(pausePerBlock)

    let testResult = runTestForAmountOfTime(block, timeToRun)
    block.result = {
      runTime: testResult.runTime,
      amountOfRounds: testResult.counter,
      percent: 0
    }
    let t = testResult.timer - completeTestStart
    let progress = Math.round((100 / timeForTest) * t)
    if (progress > 100) progress = 100

    if (i < blocks.length - 1)
      await sleep(pausePerBlock)
  }

  let f = blocks.reduce((prev, current) => (prev.result.amountOfRounds > current.result.amountOfRounds) ? prev : current)
  const maxRounds = f.result.amountOfRounds
  for (let block of blocks) {
    block.result.percent = Math.round(((100 / maxRounds) * block.result.amountOfRounds)*100)/100
  }

  return blocks
}

function runTestForAmountOfTime(block, currentTimeToRun = timeToRun) {
  let startTimer = Date.now()
  let timer = Date.now()
  let counter = 0
  do {
    block.run()
    if (runGC)
      gc()
    counter++
    timer = Date.now()
  } while(timer - startTimer < currentTimeToRun)
  return { counter, runTime: timer - startTimer, timer }
}

function sleep(n) {
  return new Promise((resolve) => {
    setTimeout(resolve, n)
  })
}

function average(xs) {
  return Math.round((xs.reduce((t, x) => t + x, 0) / (xs.length || 1)) * 100) / 100
}
function stddev(xs) {
  const n = xs.length || 1
  const mean = xs.reduce((a, b) => a + b) / n
  return Math.sqrt(xs.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
}
function map(o, fn) {
  const result = {}
  for (let key in o) {
    result[key] = fn(o[key])
  }
  return result
}

