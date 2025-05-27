/*
 * regex.js
 */


const inputs = [
  // "label:ButtonBase;display:inline-flex;align-items:center;justify-content:center;position:relative;box-sizing:border-box;-webkit-tap-highlight-color:transparent;background-color:transparent;outline:0;border:0;margin:0;border-radius:0;padding:0;cursor:pointer;user-select:none;vertical-align:middle;-moz-appearance:none;-webkit-appearance:none;text-decoration:none;color:inherit;&::-moz-focus-inner{border-style:none;}&.Mui-disabled{pointer-events:none;cursor:default;}@media print{color-adjust:exact;};box-sizing:border-box;transition:all 100ms ease-in;&:focus-visible{outline:3px solid hsla(210, 98%, 48%, 0.5);outline-offset:2px;}text-align:center;flex:0 0 auto;font-size:1.5rem;padding:8px;border-radius:50%;label:Button;color:rgba(0, 0, 0, 0.54);transition:background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;;;&:hover{background-color:#0000000a;@media (hover: none){background-color:transparent;}};;&.Mui-disabled{background-color:transparent;color:rgba(0, 0, 0, 0.26);};;padding:5px;font-size:1.125rem;;;box-shadow:none;border-radius:8px;text-transform:none;font-weight:500;letter-spacing:0;color:hsl(220, 30%, 6%);border:1px solid ;border-color:hsl(220, 20%, 88%);background-color:hsla(220, 35%, 97%, 0.3);&:hover{background-color:hsl(220, 30%, 94%);border-color:hsl(220, 20%, 80%);}&:active{background-color:hsl(220, 20%, 88%);}variants{props{size:small;}style{width:2.25rem;height:2.25rem;padding:0.25rem;& .MuiSvgIcon-root{font-size:1rem;}};props{size:medium;}style{width:2.5rem;height:2.5rem;};};width:2.25rem;height:2.25rem;padding:0.25rem;& .MuiSvgIcon-root{font-size:1rem;};;;;;;",
  "display:inline-flex;align-items:center;justify-content:center;position:relative;box-sizing:border-box;-webkit-tap-highlight-color:transparent;background-color:transparent;outline:0;border:0;margin:0;border-radius:0;padding:0;cursor:pointer;user-select:none;vertical-align:middle;-moz-appearance:none;-webkit-appearance:none;text-decoration:none;color:inherit;&::-moz-focus-inner{border-style:none;}&.Mui-disabled{pointer-events:none;cursor:default;}@media print{color-adjust:exact;};box-sizing:border-box;transition:all 100ms ease-in;&:focus-visible{outline:3px solid hsla(210, 98%, 48%, 0.5);outline-offset:2px;}text-align:center;flex:0 0 auto;font-size:1.5rem;padding:8px;border-radius:50%;color:rgba(0, 0, 0, 0.54);transition:background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;;;&:hover{background-color:#0000000a;@media (hover: none){background-color:transparent;}};;&.Mui-disabled{background-color:transparent;color:rgba(0, 0, 0, 0.26);};;padding:5px;font-size:1.125rem;;;box-shadow:none;border-radius:8px;text-transform:none;font-weight:500;letter-spacing:0;color:hsl(220, 30%, 6%);border:1px solid ;border-color:hsl(220, 20%, 88%);background-color:hsla(220, 35%, 97%, 0.3);&:hover{background-color:hsl(220, 30%, 94%);border-color:hsl(220, 20%, 80%);}&:active{background-color:hsl(220, 20%, 88%);}variants{props{size:small;}style{width:2.25rem;height:2.25rem;padding:0.25rem;& .MuiSvgIcon-root{font-size:1rem;}};props{size:medium;}style{width:2.5rem;height:2.5rem;};};width:2.25rem;height:2.25rem;padding:0.25rem;& .MuiSvgIcon-root{font-size:1rem;};;;;;;",
]

let labelPattern = /label:\s*([^\s;{]+)\s*(;|$)/g

function findRegex(styles) {
  // using a global regex with .exec is stateful so lastIndex has to be reset each time
  labelPattern.lastIndex = 0
  let identifierName = ''

  let match
  // https://esbench.com/bench/5b809c2cf2949800a0f61fb5
  while ((match = labelPattern.exec(styles)) !== null) {
    identifierName += '-' + match[1]
  }

  return identifierName
}


const startPattern = /label:/
const namePattern  = /([^\s;{]+)\s*(;|$)/g

function findIndexOf(styles) {
  let identifierName = ''

  if (styles.indexOf('label:') !== -1) {
    const matches = styles.match(labelPattern)

    for (let i = 0; i < matches.length; i++) {
      let match = matches[i]
      identifierName += '-' + match.substring(6, match.length - 1)
    }
  }

  // let index = 0
  // while ((index = styles.search(startPattern, index)) !== -1) {
  //   namePattern.lastIndex = index
  //   const match = namePattern.exec(styles)
  //   if (!match) {
  //     break
  //   }
  //   identifierName += '-' + match[1]
  //   index = match.index + match[1].length
  // }

  return identifierName
}


export default {
  blocks: [
    {
      id: 'regex',
      setup: () => {
        return () => {
          let result = 0
          for (let i = 0; i < inputs.length; i++) {
            result += findRegex(inputs[i]).length
          }
          return result
        }
      }
    },
    {
      id: 'other',
      setup: () => {
        return () => {
          let result = 0
          for (let i = 0; i < inputs.length; i++) {
            result += findIndexOf(inputs[i]).length
          }
          return result
        }
      }
    },
  ]
}
