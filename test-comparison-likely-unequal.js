/*
 * test-comparison-likely-unequal.js
 */

function randomValue() {
  const n = Math.random()
  if (n < 0.05) return { [String.fromCharCode(65 + ~~(Math.random() * 10)).repeat(1 + ~~(Math.random() * 10) )]: randomValue() }
  if (n < 0.1) return null
  if (n < 0.2) return undefined
  if (n < 0.4) return String.fromCharCode(65 + ~~(Math.random() * 10)).repeat(1 + ~~(Math.random() * 10) )
  if (n < 0.8) return Math.random() * 100
  if (n < 0.9) return NaN
  if (n < 0.95) return true
  if (n < 1.00) return false
}

const data = Array.from({ length: 100_000 }).map(randomValue)

export default {
  blocks: [
    {
      id: '==',
      setup: () => {
        return function compare_equals() {
          let result = 0

          for (let i = 0; i < data.length - 1; i++) {
            const a = data[i]
            const b = data[i + 1]
            if (a == b) {
              result += 1
            }
          }

          return result
        }
      }
    },
    {
      id: '===',
      setup: () => {
        return function compare_equals_strict() {
          let result = 0

          for (let i = 0; i < data.length - 1; i++) {
            const a = data[i]
            const b = data[i + 1]
            if (a === b) {
              result += 1
            }
          }

          return result
        }
      }
    },
    {
      id: 'Object.is',
      setup: () => {
        return function compare_object_is() {
          let result = 0

          for (let i = 0; i < data.length - 1; i++) {
            const a = data[i]
            const b = data[i + 1]
            if (Object.is(a, b)) {
              result += 1
            }
          }

          return result
        }
      }
    }
  ]
}
