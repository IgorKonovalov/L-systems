const canvas = document.getElementById('canvas')
const cx = canvas.getContext('2d')

canvas.style.height = '900px'
canvas.style.width = '1300px'
// constants

const cHeight = cx.canvas.height
const cWidth = cx.canvas.width

const SHAPES = {
  'Koch Line': {
    id: 1,
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
    iterations: 5,
    closePath: false
  },
  'Quadratic Snowflake': {
    id: 2,
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
    iterations: 5,
    closePath: false
  },
  'Box fractal': {
    id: 3,
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
  'Koch snowflake': {
    id: 4,
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
    id: 5,
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
  },
  Weed: {
    id: 6,
    axiom: 'F',
    rules: [
      {
        F: 'F[+F]F[-F]F'
      }
    ],
    angle: Math.PI / 7,
    stepLength: 1,
    center: {
      x: cWidth / 2,
      y: cHeight
    },
    iterations: 6,
    initialAngle: -Math.PI / 2
  },
  Stick: {
    id: 7,
    axiom: 'X',
    rules: [
      {
        F: 'FF',
        X: 'F[+X]F[-X]+X'
      }
    ],
    angle: Math.PI / 9,
    stepLength: 3,
    center: {
      x: cWidth / 2,
      y: cHeight
    },
    iterations: 7,
    initialAngle: -Math.PI / 2,
    closePath: false
  },
  Crystal: {
    id: 8,
    axiom: 'F+F+F+F',
    rules: [
      {
        F: 'FF+F++F+F'
      }
    ],
    angle: Math.PI / 2,
    stepLength: 10,
    center: {
      x: 20,
      y: cHeight - 20
    },
    iterations: 4
  },
  'Dragon Curve': {
    id: 9,
    axiom: 'FX',
    rules: [
      {
        X: 'X+YF+',
        Y: '-FX-Y'
      }
    ],
    angle: Math.PI / 2,
    stepLength: 4,
    center: {
      x: cWidth / 2,
      y: cHeight / 2
    },
    iterations: 12,
    closePath: false
  },
  'Hexagonal Gosper' : {
    id: 10,
    axiom: 'A',
    rules: [
      {
        A: 'A+BF++BF-FA--FAFA-BF+',
        B: '-FA+BFBF++BF+FA--FA-B'
      }
    ],
    angle: Math.PI / 3,
    stepLength: 25,
    center: {
      x: cWidth / 2 - 50,
      y: cHeight / 2 + 230
    },
    iterations: 3,
    closePath: false
  },
}
