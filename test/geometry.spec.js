'use strict'
const { compose,
  rotateFromO,
  translate } = require('../src/modules/geometry')

describe('Geometry', () => {
  it('can make translations in 2D', () => {
    const point = { x: 1, y: 4 }
    const vect = { a: 10, b: -4 }
    const expected = { x: 11, y: 0 }
    expect(translate(vect, point)).toEqual(expected)
  })
  it('can make rotation around O in 2D', () => {
    const point = { x: 0, y: 1 }
    const expected = { x: -1, y: 0 }
    const actualRaw = rotateFromO(Math.PI/2, point)
    const actualRounded = {
      x: Math.round(actualRaw.x),
      y: Math.round(actualRaw.y)
    }
    expect(actualRounded).toEqual(expected)
  })
  it('can compose transformation', () => {
    const point = { x: 1, y: 4 }
    const vectA = { a: 10, b: -4 }
    const vectB = { a: -2, b: 2 }
    const expected = { x: 9, y: 2 }

    const opA = translate.bind(null, vectA)
    const opB = translate.bind(null, vectB)

    expect(compose([opA, opB], point)).toEqual(expected)
  })
})