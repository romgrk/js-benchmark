/*
 * test-string-template.js
 */

const object = {
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
}
const inputs = [object]

export default {
  blocks: [
    {
      id: 'string concat',
      setup: () => {
        function convert(object) {
          let result = ''
          for (const key in object) {
            result = key + ':' + object[key] + ';'
          }
          return result
        }

        return () => {
          let result = 0
          for (let i = 0; i < inputs.length; i++) {
            result += convert(inputs[i])
          }
          return result
        }
      },
    },
    {
      id: 'string template',
      setup: () => {
        function convert(object) {
          let result = ''
          for (const key in object) {
            result += `${key}:${object[key]};`
          }
          return result
        }

        return () => {
          let result = 0
          for (let i = 0; i < inputs.length; i++) {
            result += convert(inputs[i])
          }
          return result
        }
      },
    },
  ]
}
