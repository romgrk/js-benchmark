/*
 * test-object-without-props-loose.js
 */

const exclude = ["b", "c"];
const o1 = { a: 1, b: 2, c: 3, d: 4, e: 5 }
const o2 = { f: 1, b: 2, c: 3, d: 4, e: 5 }
const o3 = { g: 1, b: 2, c: 3, d: 4, e: 5 }
const o4 = { h: 1, b: 2, c: 3, d: 4, e: 5 };
const o5 = { i: 1, b: 2, c: 3, d: 4, e: 5 };

const N = 1_000

export default {
  blocks: [
    {
      id: 'initial',
      setup: () => {
        function _clone__keys(source, excluded) {
          if (source == null)
            return {};
          var target = {};
          var sourceKeys = Object.keys(source);
          var key, i2;
          for (i2 = 0; i2 < sourceKeys.length; i2++) {
            key = sourceKeys[i2];
            if (excluded.indexOf(key) >= 0)
              continue;
            target[key] = source[key];
          }
          return target;
        }

        return () => {
          let o = null
          for (let i = 0; i < N; i++) {
            o=_clone__keys(o1, exclude)
            o=_clone__keys(o2, exclude)
            o=_clone__keys(o3, exclude)
            o=_clone__keys(o4, exclude)
            o=_clone__keys(o5, exclude)
          }
          return o
        }
      }
    },
    {
      id: 'updated',
      setup: () => {
        function _clone__noKeys(source, excluded) {
          if (source === null)
            return {};
          var target = {};
          for (const key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              if (excluded.indexOf(key) === -1) {
                target[key] = source[key]
              }
            }
          }
          return target;
        }

        return () => {
          let o = null
          for (let i = 0; i < N; i++) {
            o=_clone__noKeys(o1, exclude)
            o=_clone__noKeys(o2, exclude)
            o=_clone__noKeys(o3, exclude)
            o=_clone__noKeys(o4, exclude)
            o=_clone__noKeys(o5, exclude)
          }
          return o
        }
      }
    }
  ]
}
