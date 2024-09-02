/*
 * integers.js
 */


const inputsUnder31 = Array.from({ length: 1000 }).map(() => (2 ** 31) - 1)
const inputsOver31  = Array.from({ length: 1000 }).map(() => (2 ** 31) + 1)

export default {
  blocks: [
    {
      id: 'adding 2^31 - 1',
      setup: () => {
        return () => {
          let inputs = inputsUnder31
          let result = 0
          for (let i = 0; i < inputs.length; i++) {
            result += inputs[i] & 1
          }
          return result
        }
      }
    },
    {
      id: 'adding 2^31 + 1',
      setup: () => {
        return () => {
          let inputs = inputsOver31
          let result = 0
          for (let i = 0; i < inputs.length; i++) {
            result += inputs[i] & 1
          }
          return result
        }
      }
    },
  ]
}
