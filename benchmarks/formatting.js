/*
 * formatting.js
 */

const inputs = Array.from({ length: 1000 }).map(() => Math.round(Math.random() * 0x100000000))

/**
 * Map 8-bits value to its hexadecimal representation
 * ['00', '01', '02', ..., 'fe', 'ff']
 */
const FORMAT_HEX = Array.from({ length: 256 }).map((_, byte) => byte.toString(16).padStart(2, '0'));

export function format_hex(number) {
  return (
    FORMAT_HEX[get(number, 24)] +
    FORMAT_HEX[get(number, 16)] +
    FORMAT_HEX[get(number,  8)] +
    FORMAT_HEX[get(number,  0)]
  );
}

function get(n, offset) {
  return (n >>> offset) & 0xff;
}


export function format_36(number) {
  return number.toString(36)
}




export default {
  blocks: [
    {
      id: 'format_hex',
      setup: () => {
        return () => {
          let result = 0
          for (let i = 0; i < inputs.length; i++) {
            result += format_hex(inputs[i]).length
          }
          return result
        }
      }
    },
    {
      id: 'format_36',
      setup: () => {
        return () => {
          let result = 0
          for (let i = 0; i < inputs.length; i++) {
            result += format_36(inputs[i]).length
          }
          return result
        }
      }
    },
  ]
}
