(function(window, document) {
  'use strict'
  const {
    compose,
    rotateFromO,
    translate } = require('./modules/geometry')
  const params = {
    bpm: 30,
    cx: 120,
    cy: 120,
    hightlightClass: 'highlighted',
    subdivision: 4,
  }

  const SVG_NS='http://www.w3.org/2000/svg'
  const box = document.querySelector('#box')
  box.innerHTML = 'hola'
  const appRoot = document.querySelector('#time-divider')
  const circle = createSvgElement('circle', {
    r: 100,
    cx: params.cx,
    cy: params.cy,
    stroke: 'red',
    fill: 'none'
  })

  appRoot.appendChild(circle)

  const radius = createRadius(120, 20)
  appRoot.appendChild(radius)

  // Create subdivisions
  for (let i = 1; i < params.subdivision; i++) {
    const rad = createRadiusByIndex(120, 20, i, params.subdivision)
    appRoot.appendChild(rad)
  }

  // Create animation
  const lines = appRoot.querySelectorAll('line')
  var counter = 0;
  const delay = calculateDelay(params.bpm, params.subdivision) * 1000
  console.log(delay)
  const loop = setInterval(() => {
    counter = counter % params.subdivision
    // javascript modulo sucks
    const prev = (params.subdivision + counter - 1) % params.subdivision
    lines[prev].setAttribute('class', '')
    lines[counter].setAttribute('class', params.hightlightClass)
    counter++;
  }, delay)


  function calculateDelay(bpm, sudivision = 4) {
    const cycleDuration = 60 / bpm
    return cycleDuration / sudivision
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

    const point = compose([
      translateFrom0,
      rotateAngle,
      translateTo0,
    ], { x, y })

    return createRadius(point.x, point.y)
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
    for (let key in attributes) {
      svgElt.setAttribute(key, attributes[key])
    }
    return svgElt
  }

})(window, document)