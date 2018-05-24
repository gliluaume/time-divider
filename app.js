(function(window, document) {
  const params = {
    subdivision: 12,
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
    const rad = createRadiusByIndex(i, params.subdivision)
    appRoot.appendChild(rad)
  }

  function createRadiusByIndex(index, sudivisions) {
    let x1 = 120
    let y1 = 20
    // translate to (0, 0)
    x1 = x1 - params.cx
    y1 = y1 - params.cy

    // calculate rotation
    const baseAngle = 2 * Math.PI / sudivisions
    const angle = index * baseAngle
    let x2 = x1 * Math.cos(angle) - y1 * Math.sin(angle)
    let y2 = x1 * Math.sin(angle) + y1 * Math.cos(angle)

    // inverse transation of calculated
    x2 = x2 + params.cx
    y2 = y2 + params.cy

    return createRadius(x2, y2)
  }

  /**
   * Create a SVG line as a radius of the main circle for a given point on the circle
   * @param {number} x2 x coordinate of a point on the circle
   * @param {number} y2 y coordinate of a point on the circle
   */
  function createRadius(x2, y2) {
    const baseParams = {
      x1: params.cx,
      y1: params.cy,
      stroke: 'black'
    }
    return createSvgElement('line', { ...baseParams, x2, y2 })
  }

  function createSvgElement(tag, attributes) {
    const svgElt = document.createElementNS(SVG_NS, tag)
    for (key in attributes) {
      svgElt.setAttribute(key, attributes[key]);
    }
    return svgElt;
  }

})(window, document);