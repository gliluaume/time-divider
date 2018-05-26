'use strict'

/**
 * Apply a mathematical composition of functions on a point
 * @param {Array<function>} functions
 * @param {object} point as { x, y }
 */
function compose(functions, point) {
  return functions
    .reverse()
    .reduce((acc, item) => item(acc), point)
}

function rotateFromO(angle, {x, y}) {
  return {
    x: x * Math.cos(angle) - y * Math.sin(angle),
    y: x * Math.sin(angle) + y * Math.cos(angle)
  }
}

function translate({a, b}, {x, y}) {
  return { x: x + a, y: y + b }
}

module.exports = {
  compose,
  rotateFromO,
  translate,
}