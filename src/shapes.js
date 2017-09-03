const canvas = document.getElementById('canvas')
const cx = canvas.getContext('2d')

canvas.height = document.body.offsetHeight - document.getElementById('download').offsetHeight - document.getElementById('stats').offsetHeight
canvas.style.width = '900px'
// constants

const cHeight = cx.canvas.height
const cWidth = cx.canvas.width

const SHAPES = {
  'Koch Line': {
    id: 1,
    axiom: 'F',
    rules: {
      F: 'F-F++F-F'
    },
    angle: Math.PI / 3,
    stepLength: 3,
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
    rules: {
      F: 'F-F+F+F-F'
    },
    angle: Math.PI / 2,
    stepLength: 3,
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
    rules: {
      F: 'F-F+F+F-F'
    },
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
    rules: {
      F: 'F-F++F-F'
    },
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
    rules: {
      F: 'F-F+F'
    },
    angle: 2 * Math.PI / 3,
    stepLength: 15,
    center: {
      x: cWidth - 65,
      y: cHeight / 1.85
    },
    iterations: 7
  },
  Weed: {
    id: 6,
    axiom: 'F',
    rules: {
      F: 'F[+F]F[-F]F'
    },
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
    rules: {
      F: 'FF',
      X: 'F[+X]F[-X]+X'
    },
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
    rules: {
      F: 'FF+F++F+F'
    },
    angle: Math.PI / 2,
    stepLength: 10,
    center: {
      x: 50,
      y: cHeight - 50
    },
    iterations: 4
  },
  'Dragon Curve': {
    id: 9,
    axiom: 'FX',
    rules: {
      X: 'X+YF+',
      Y: '-FX-Y'
    },
    angle: Math.PI / 2,
    stepLength: 6,
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
    rules: {
      A: 'A+BF++BF-FA--FAFA-BF+',
      B: '-FA+BFBF++BF+FA--FA-B'
    },
    angle: Math.PI / 3,
    stepLength: 25,
    center: {
      x: cWidth / 2,
      y: cHeight / 2 + 230
    },
    iterations: 3,
    closePath: false
  },
  'Square Serpinsky': {
    id: 11,
    axiom: 'F+XF+F+XF',
    rules: {
      X: 'XF-F+F-XF+F+XF-F+F-X'
    },
    angle: Math.PI / 2,
    stepLength: 7,
    center: {
      x: cWidth / 2,
      y: cHeight
    },
    iterations: 5,
    closePath: false
  },
  'Hilbert Curve': {
    id: 12,
    axiom: 'X',
    rules: {
      X: '-YF+XFX+FY-',
      Y: '+XF-YFY-FX+'
    },
    angle: Math.PI / 2,
    stepLength: 14,
    center: {
      x: 10,
      y: 10
    },
    iterations: 6,
    closePath: false
  },
  Board: {
    id: 13,
    axiom: 'F+F+F+F',
    rules: {
      F: 'FF+F+F+F+FF'
    },
    angle: Math.PI / 2,
    stepLength: 10,
    center: {
      x: 50,
      y: cHeight - 50
    },
    iterations: 4,
    closePath: false
  },
  'Koch Curve': {
    id: 14,
    axiom: 'F+F+F+F',
    rules: {
      F: 'F+F-F-FF+F+F-F'
    },
    angle: Math.PI / 2,
    stepLength: 5,
    center: {
      x: cWidth / 2 - 150,
      y: cHeight / 2 + 150
    },
    iterations: 3,
    closePath: false
  },
  'Quadratic Koch Island': {
    id: 15,
    axiom: 'F+F+F+F',
    rules: {
      F: 'F+F-F-FFF+F+F-F'
    },
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
    rules: {
      F: 'F-FF+FF+F+F-F-FF+F+F-F-FF-FF+F'
    },
    angle: Math.PI / 2,
    stepLength: 13,
    center: {
      x: 200,
      y: cHeight / 2 + 250
    },
    iterations: 2,
    closePath: false
  },
  'Serpinsky ArrowHead': {
    id: 17,
    axiom: 'YF',
    rules: {
      X: 'YF+XF+Y',
      Y: 'XF-YF-X'
    },
    angle: Math.PI / 3,
    stepLength: 7,
    center: {
      x: cWidth - 10,
      y: cHeight - 30
    },
    iterations: 7,
    initialAngle: Math.PI,
    closePath: false
  },
  Cross: {
    id: 18,
    axiom: 'F+F+F+F',
    rules: {
      F: 'F+F-F+F+F'
    },
    angle: Math.PI / 2,
    stepLength: 10,
    center: {
      x: 70,
      y: cHeight / 2 + 120
    },
    iterations: 5,
    closePath: false
  },
  Rings: {
    id: 19,
    axiom: 'F+F+F+F',
    rules: {
      F: 'FF+F+F+F+F+F-F'
    },
    angle: Math.PI / 2,
    stepLength: 6,
    center: {
      x: cWidth / 2 + 180,
      y: cHeight - 100
    },
    iterations: 4,
    closePath: false
  },
  'Another Bush': {
    id: 20,
    axiom: 'Y',
    rules: {
      X: 'X[-FFF][+FFF]FX',
      Y: 'YFX[+Y][-Y]'
    },
    angle: Math.PI / 7,
    stepLength: 6,
    center: {
      x: cWidth / 2,
      y: cHeight
    },
    iterations: 6,
    initialAngle: -Math.PI / 2,
    closePath: false
  },
  'Another Bush - 2': {
    id: 21,
    axiom: 'F',
    rules: {
      F: 'FF+[+F-F-F]-[-F+F+F]'
    },
    angle: Math.PI / 8,
    stepLength: 8,
    center: {
      x: cWidth / 2,
      y: cHeight
    },
    iterations: 5,
    initialAngle: -Math.PI / 2,
    closePath: false
  },
  'Another Bush - 3': {
    id: 22,
    axiom: 'F',
    rules: {
      F: 'F[+FF][-FF]F[-F][+F]F'
    },
    angle: Math.PI / 5,
    stepLength: 8,
    center: {
      x: cWidth / 2,
      y: cHeight
    },
    iterations: 4,
    initialAngle: -Math.PI / 2,
    closePath: false
  },
  Hexagonal: {
    id: 23,
    axiom: 'FXF',
    rules: {
      F: 'FXF',
      X: '[-F+F+F]+F-F-F+'
    },
    angle: Math.PI / 3,
    stepLength: 3,
    center: {
      x: 0,
      y: cHeight / 2
    },
    iterations: 5,
    closePath: false
  },
  'Serpinsky Triangle': {
    id: 24,
    axiom: 'FXF--FF--FF',
    rules: {
      F: 'FF',
      X: '--FXF++FXF++FXF--'
    },
    angle: Math.PI / 3,
    stepLength: 4,
    center: {
      x: 0,
      y: 0
    },
    iterations: 7,
    closePath: false
  },
  'Serpinsky Carpet': {
    id: 25,
    axiom: 'F',
    rules: {
      F: 'FFF[+FFF+FFF+FFF]'
    },
    angle: Math.PI / 2,
    stepLength: 3,
    center: {
      x: 50,
      y: cHeight - 50
    },
    iterations: 5,
    closePath: false
  },
  Mosaic: {
    id: 26,
    axiom: 'F-F-F-F',
    rules: {
      F: 'F-b+FF-F-FF-Fb-FF+b-FF+F+FF+Fb+FFF',
      b: 'bbbbbb'
    },
    angle: Math.PI / 2,
    stepLength: 3,
    center: {
      x: 300,
      y: 0
    },
    iterations: 3,
    closePath: false
  },
  'Levy C Curve': {
    id: 27,
    axiom: 'F++F++F++F',
    rules: {
      F: '-F++F-'
    },
    angle: Math.PI / 4,
    stepLength: 5,
    center: {
      x: cWidth / 2 - 130,
      y: cHeight / 2 + 150
    },
    iterations: 11,
    closePath: false
  },
  Pentaplexity: {
    id: 28,
    axiom: 'F++F++F++F++F',
    rules: {
      F: 'F++F++F+++++F-F++F'
    },
    angle: Math.PI / 5,
    stepLength: 4,
    center: {
      x: 200,
      y: cHeight - 100
    },
    iterations: 5,
    closePath: false
  },
  'William McWorter Terdragon': {
    id: 29,
    axiom: 'F',
    rules: {
      F: 'F+F-F'
    },
    angle: 2 * Math.PI / 3,
    stepLength: 6,
    center: {
      x: cWidth / 2 + 100,
      y: cHeight / 2
    },
    iterations: 8,
    initialAngle: Math.PI / 2,
    closePath: false
  },
  'William McWorter  Sierpinski Carpet': {
    id: 30,
    axiom: 'F',
    rules: {
      F: 'F+F-F-F-b+F+F+F-F',
      b: 'bbb'
    },
    angle: Math.PI / 2,
    stepLength: 7,
    center: {
      x: cWidth / 2,
      y: cHeight / 2 - 250
    },
    iterations: 4,
    initialAngle: Math.PI / 2,
    closePath: false
  },
  'William McWorter Pentigree': {
    id: 31,
    axiom: 'F-F-F-F-F',
    rules: {
      F: 'F-F++F+F-F-F'
    },
    angle: 2 * Math.PI / 5,
    stepLength: 7,
    center: {
      x: cWidth / 2,
      y: cHeight - 200
    },
    iterations: 4,
    closePath: false
  },
  'Gary Teachout Hex-7-b': {
    id: 32,
    axiom: 'X',
    rules: {
      X: '-F++F-X-F--F+Y---F--F+Y+F++F-X+++F++F-X-F++F-X+++F--F+Y--',
      Y: '+F++F-X-F--F+Y+F--F+Y---F--F+Y---F++F-X+++F++F-X+++F--F+Y'
    },
    angle: Math.PI / 6,
    stepLength: 2,
    center: {
      x: cWidth / 2 + 150,
      y: 100
    },
    iterations: 5,
    closePath: false
  },
  'Gary Teachout Peano-c': {
    id: 33,
    axiom: 'FX',
    rules: {
      X: 'FX-FY-FX+FY+FX+FY+FX+FY+FX-FY-FX-FY-FX-FY-FX+FY+FX',
      Y: 'FY'
    },
    angle: Math.PI / 4,
    stepLength: 3,
    center: {
      x: 0,
      y: cHeight / 2
    },
    iterations: 4,
    closePath: false
  },
  'William McWorter Border1': {
    id: 34,
    axiom: 'XYXYXYX+​XYXYXYX+​XYXYXYX+​XYXYXYX',
    rules: {
      X: 'FX+FX+FXFY-FY-',
      Y: '+FX+FXFY-FY-FY'
    },
    angle: Math.PI / 2,
    stepLength: 10,
    center: {
      x: 50,
      y: cHeight / 2 + 100
    },
    iterations: 3,
    closePath: false
  },
  'Adrian Mariano Doily': {
    id: 35,
    axiom: 'F--F--F--F--F--F',
    rules: {
      F: '-F[--F--F]++F--F+'
    },
    angle: Math.PI / 6,
    stepLength: 8,
    center: {
      x: cWidth / 2 + 50,
      y: 100
    },
    iterations: 4
  },
  'William McWorter Maze01': {
    id: 36,
    axiom: 'F+F+F',
    rules: {
      F: 'F+FF-F'
    },
    angle: 2 * Math.PI / 3,
    stepLength: 8,
    center: {
      x: 200,
      y: cHeight / 2 + 150
    },
    iterations: 6
  },
  'William McWorter Maze&Fractal1': {
    id: 37,
    axiom: 'X',
    rules: {
      X: 'FY+FYFY-FY',
      Y: 'FX-FXFX+FX'
    },
    angle: 2 * Math.PI / 3,
    stepLength: 2,
    center: {
      x: 200,
      y: cHeight / 2 + 150
    },
    iterations: 7
  },
  'William McWorter Moore': {
    id: 38,
    axiom: 'X',
    rules: {
      X: 'FX+FX+FXFYFX+FXFY-FY-FY-',
      Y: '+FX+FX+FXFY-FYFXFY-FY-FY'
    },
    angle: Math.PI / 2,
    stepLength: 2,
    center: {
      x: cWidth / 2,
      y: cHeight / 2 + 150
    },
    iterations: 5
  },
  'William McWorter Pentan': {
    id: 39,
    axiom: 'X-X-X-X-X',
    rules: {
      X: 'FX-FX-FX+FY+FY+FX-FX',
      Y: 'FY+FY-FX-FX-FY+FY+FY'
    },
    angle: 2 * Math.PI / 5,
    stepLength: 2,
    center: {
      x: cWidth / 2 + 200,
      y: cHeight / 2 - 100
    },
    iterations: 4
  },
  'William McWorter Pentl': {
    id: 40,
    axiom: 'F-F-F-F-F',
    rules: {
      F: 'F-F-F++F+F-F'
    },
    angle: 2 * Math.PI / 5,
    stepLength: 2,
    center: {
      x: cWidth / 2,
      y: cHeight / 2 - 300
    },
    iterations: 5
  },
  'William McWorter Sierpinsk': {
    id: 41,
    axiom: 'L--F--L--F',
    rules: {
      L: '+R-F-R+',
      R: '-L+F+L-'
    },
    angle: Math.PI / 4,
    stepLength: 6,
    center: {
      x: 0,
      y: cHeight / 2
    },
    iterations: 12
  },
  'Anthony Hanmer ADH231a ': {
    id: 42,
    axiom: 'F++++F',
    rules: {
      F: 'F+F+F++++F+F+F'
    },
    angle: Math.PI / 4,
    stepLength: 6,
    center: {
      x: 0,
      y: cHeight / 2
    },
    iterations: 4
  },
  'Anthony Hanmer ADH256a': {
    id: 43,
    axiom: 'F+F+F+F++F-F-F-F',
    rules: {
      F: 'F+F++F+FF'
    },
    angle: Math.PI / 2,
    stepLength: 6,
    center: {
      x: cWidth / 2 - 300,
      y: cHeight / 2 + 200
    },
    iterations: 4
  },
  'Anthony Hanmer ADH258a': {
    id: 44,
    axiom: 'F++F++F+++F--F--F',
    rules: {
      F: 'FF++F++F++FFF'
    },
    angle: Math.PI / 3,
    stepLength: 10,
    center: {
      x: cWidth / 2 - 300,
      y: cHeight / 2 + 200
    },
    iterations: 3
  },
  SaWeed: {
    id: 45,
    axiom: 'F',
    rules: {
      F: 'F[+FF-F]F[-FF]F'
    },
    angle: Math.PI / 7,
    stepLength: 3,
    center: {
      x: cWidth / 2,
      y: cHeight
    },
    iterations: 5,
    initialAngle: -Math.PI / 2
  }
}
