const data = Array.from({ length: 10_000 }).map((_, i) => i)
const set = new Set(data)

export default {
  blocks: [
    {
      id: 'for .. of',
      setup: () => {
        return () => {
          let result = 0

          for (const n of set) {
            result += n
          }

          return result
        }
      }
    },
    {
      id: '.forEach()',
      setup: () => {
        return () => {
          let result = 0

          set.forEach(n => {
            result += n
          })

          return result
        }
      }
    },
  ]
}
