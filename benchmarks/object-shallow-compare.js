
const nObjects = 64

const generateKey   = process.argv[4] === 'same-shape'  ? (index) => index : () => Math.random()
const generateValue = process.argv[4] === 'same-values' ? (index) => index : () => Math.random()

function generateMono(nKeys) {
  return Array.from({ length: nObjects }).map(() =>
    Array.from({ length: nKeys }).reduce((acc, curr, index) => {
      acc['key' + generateKey(index)] = generateValue(index)
      return acc
    }, {})
  )
}

const nKeys = process.argv[3] ? +process.argv[3] : 15

const inputs = generateMono(nKeys)


function shallowDiffers(a, b) {
  for (let i in a) if (i !== '__source' && !(i in b)) return true;
  for (let i in b) if (i !== '__source' && a[i] !== b[i]) return true;
  return false;
}

function shallowDiffers_reverse(a, b) {
	for (let i in a) if (i !== '__source' && a[i] !== b[i]) return true;
	for (let i in b) if (i !== '__source' && !(i in a)) return true;
	return false;
}

function fastObjectShallowEqual(a, b) {
  let aLength = 0;
  let bLength = 0;

  for (const key in a) {
    if (key === '__source') { continue }

    aLength += 1;

    if (a[key] !== b[key]) {
      return false;
    }
    if (!(key in b)) {
      return false;
    }
  }

  for (const key in b) {
    if (key === '__source') { continue }
    bLength += 1;
  }
  return aLength === bLength;
}

export default {
  blocks: [
    {
      id: 'shallowDiffers',
      setup: () => {
        const a = inputs[0]

        return () => {
          let result = 0

          for (let i = 0; i < inputs.length - 1; i++) {
            const b = inputs[i]
            if (!shallowDiffers(a, b)) {
              result += 1
            }
          }

          return result
        }
      }
    },
    {
      id: 'shallowDiffers_reverse',
      setup: () => {
        const a = inputs[0]

        return () => {
          let result = 0

          for (let i = 0; i < inputs.length - 1; i++) {
            const b = inputs[i]
            if (!shallowDiffers_reverse(a, b)) {
              result += 1
            }
          }

          return result
        }
      }
    },
    // {
    //   id: 'fastObjectShallowEqual',
    //   setup: () => {
    //     const a = inputs[0]
    //
    //     return () => {
    //       let result = 0
    //
    //       for (let i = 0; i < inputs.length - 1; i++) {
    //         const b = inputs[i]
    //         if (fastObjectShallowEqual(a, b)) {
    //           result += 1
    //         }
    //       }
    //
    //       return result
    //     }
    //   }
    // },
  ]
}
