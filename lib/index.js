/**
 * Modules
 */

var isGeneratorObject = require('@micro-js/is-generator-object')
var slice = require('@micro-js/slice')

/**
 * Expose mapGen
 */

module.exports = map['default'] = map

/**
 * Map over generator
 * @param  {Function} fn
 * @param  {Generator} gen
 * @return {Generator}
 */

function map(fn, gen, ctx) {
  return function * () {
    var it = isGeneratorObject(gen) ? gen : gen.apply(null, slice(arguments))
    var next = it.next()
    var i = 0

    while (!next.done) {
      try {
        next = it.next(yield fn.call(ctx, next.value, i++))
      } catch (e) {
        next = it.throw(e)
      }
    }
    return next.value
  }
}
