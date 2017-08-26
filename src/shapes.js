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
  'Hexagonal Gosper': {
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
  'Square Serpinsky': {
    id: 11,
    axiom: 'F+XF+F+XF',
    rules: [
      {
        X: 'XF-F+F-XF+F+XF-F+F-X'
      }
    ],
    angle: Math.PI / 2,
    stepLength: 6,
    center: {
      x: cWidth / 2 - 100,
      y: cHeight - 100
    },
    iterations: 5,
    closePath: false
  },
  'Hilbert Curve': {
    id: 12,
    axiom: 'X',
    rules: [
      {
        X: '-YF+XFX+FY-',
        Y: '+XF-YFY-FX+'
      }
    ],
    angle: Math.PI / 2,
    stepLength: 15,
    center: {
      x: cWidth / 2 - 300,
      y: cHeight / 2 - 250
    },
    iterations: 5,
    closePath: false
  },
  Board: {
    id: 13,
    axiom: 'F+F+F+F',
    rules: [
      {
        F: 'FF+F+F+F+FF'
      }
    ],
    angle: Math.PI / 2,
    stepLength: 10,
    center: {
      x: 30,
      y: cHeight - 30
    },
    iterations: 4,
    closePath: false
  },
  'Koch Curve': {
    id: 14,
    axiom: 'F+F+F+F',
    rules: [
      {
        F: 'F+F-F-FF+F+F-F'
      }
    ],
    angle: Math.PI / 2,
    stepLength: 5,
    center: {
      x: cWidth / 2 - 250,
      y: cHeight / 2 + 150
    },
    iterations: 3,
    closePath: false
  },
  'Quadratic Koch Island': {
    id: 15,
    axiom: 'F+F+F+F',
    rules: [
      {
        F: 'F+F-F-FFF+F+F-F'
      }
    ],
    angle: Math.PI / 2,
    stepLength: 5,
    center: {
      x: cWidth / 2 - 250,
      y: cHeight / 2
    },
    iterations: 3,
    closePath: false
  },
  'Quadratic Koch Island - 2': {
    id: 16,
    axiom: 'F+F+F+F',
    rules: [
      {
        F: 'F-FF+FF+F+F-F-FF+F+F-F-FF-FF+F'
      }
    ],
    angle: Math.PI / 2,
    stepLength: 13,
    center: {
      x: 250,
      y: cHeight / 2 + 250
    },
    iterations: 2,
    closePath: false
  },
  'Serpinsky ArrowHead': {
    id: 17,
    axiom: 'YF',
    rules: [
      {
        X: 'YF+XF+Y',
        Y: 'XF-YF-X'
      }
    ],
    angle: Math.PI / 3,
    stepLength: 7,
    center: {
      x: cWidth - 250,
      y: cHeight - 30
    },
    iterations: 7,
    initialAngle: Math.PI,
    closePath: false
  }
}
