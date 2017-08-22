const canvas = document.getElementById('canvas')
const cx = canvas.getContext('2d')

// constants

const cHeight = cx.canvas.height
const cWidth = cx.canvas.width

const SHAPES = {
  'koch line': {
    axiom: 'F',
    rules: [
      {
        F: 'F-F++F-F'
      }
    ],
    angle: Math.PI / 3,
    stepLength: 5,
    center: {
      x: 0,
      y: 10
    },
    iterations: 5
  },
  'quadratic snowflake': {
    axiom: 'F',
    rules: [
      {
        F: 'F-F+F+F-F'
      }
    ],
    angle: Math.PI / 2,
    stepLength: 5,
    center: {
      x: 0,
      y: 10
    },
    iterations: 5
  },
  'box fractal': {
    axiom: 'F-F-F-F',
    rules: [
      {
        F: 'F-F+F+F-F'
      }
    ],
    angle: Math.PI / 2,
    stepLength: 11,
    center: {
      x: 3,
      y: 3
    },
    iterations: 4
  },
  'koch snowflake': {
    axiom: 'F++F++F',
    rules: [
      {
        F: 'F-F++F-F'
      }
    ],
    angle: Math.PI / 3,
    stepLength: 2,
    center: {
      x: cWidth / 4,
      y: cHeight / 1.6
    },
    iterations: 5
  },
  'Bourke Triangle': {
    axiom: 'F+F+F',
    rules: [
      {
        F: 'F-F+F'
      }
    ],
    angle: 2 * Math.PI / 3,
    stepLength: 15,
    center: {
      x: cWidth / 1.5,
      y: cHeight / 1.85
    },
    iterations: 7
  }
}
