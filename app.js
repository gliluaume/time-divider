(function(window, document) {
  'use strict'
  const params = {
    subdivision: 20,
    cx: 120,
    cy: 120
  }

  const SVG_NS="http://www.w3.org/2000/svg"
  const box = document.querySelector('#box')
  box.innerHTML = "hola"
  const appRoot = document.querySelector('#time-divider')
  const circle = createSvgElement('circle', {
    r: 100,
    cx: params.cx,
    cy: params.cy,
    stroke: "red",
    fill: "none"
  })

  appRoot.appendChild(circle)

  const radius = createRadius(120, 20)
  appRoot.appendChild(radius)

  // Create subdivisions
  for (let i = 1; i < params.subdivision; i++) {
    const rad = createRadiusByIndex(120, 20, i, params.subdivision)
    console.log(rad)
    appRoot.appendChild(rad)
  }

  /**
   * Create coordinates of a point on circle describing the n-th radius
   * @param {number} x x-coordinate of first point on circle
   * @param {number} y y-coordinate of first point on circle
   * @param {integer} index number of the radius
   * @param {integer} sudivisions total number of subdivision to draw
   * @returns {object} a {x, y} object representing coordinate of point on cicrle
   */
  function createRadiusByIndex(x, y, index, sudivisions) {
    // calculate rotation angle
    const baseAngle = 2 * Math.PI / sudivisions
    const angle = index * baseAngle

    const translateTo0 = translate.bind(null, { a: -params.cx, b: -params.cy })
    const translateFrom0 = translate.bind(null, { a: params.cx, b: params.cy })
    const rotateAngle = rotateFromO.bind(null, angle)

    const point = composeTransformations([
      translateFrom0,
      rotateAngle,
      translateTo0,
    ], { x, y })

    return createRadius(point.x, point.y)
  }

  /**
   * Apply a mathematical composition of functions on a point
   * @param {Array<function>} functions
   * @param {object} point as { x, y }
   */
  function composeTransformations(functions, point) {
    console.log(functions)
    return functions
      .reverse()
      .reduce((acc, item) => item(acc), point)
  }

  function translate({a, b}, {x, y}) {

    return { x: x + a, y: y + b }
  }

  function rotateFromO(angle, {x, y}) {
    return {
      x: x * Math.cos(angle) - y * Math.sin(angle),
      y: x * Math.sin(angle) + y * Math.cos(angle)
    }
  }

  /**
   * Create a SVG line as a radius of the main circle for a given point on the circle
   * @param {number} x2 x coordinate of a point on the circle
   * @param {number} y2 y coordinate of a point on the circle
   */
  function createRadius(x, y) {
    const prms = {
      x1: params.cx,
      y1: params.cy,
      x2: x,
      y2: y,
      stroke: 'black'
    }
    return createSvgElement('line', prms)
  }

  function createSvgElement(tag, attributes) {
    const svgElt = document.createElementNS(SVG_NS, tag)
    for (key in attributes) {
      svgElt.setAttribute(key, attributes[key]);
    }
    return svgElt;
  }

})(window, document);