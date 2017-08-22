// elements

const canvas = document.getElementById('canvas')
const cx = canvas.getContext('2d')

// constants

const cHeight = cx.canvas.height
const cWidth = cx.canvas.width
const stepLength = 3

// initial settings

const center = {
  y: cHeight,
  x: 0
}
cx.strokeStyle = 'red'
cx.globalAlpha = 1
// Lshape object

function Lshape(axiom, rules, angle) {
  this.axiom = axiom
  this.rules = rules
  this.angle = angle
  this.currentState = axiom
}

Lshape.prototype.step = function() {
  const arrState = this.currentState.split('')
  const nextStepArr = arrState.map(el => {
    let res = el
    this.rules.forEach(rule => {
      if (rule[el]) {
        return (res = rule[el])
      }
    })
    return res
  })
  this.currentState = nextStepArr.join('')
}

//
// l-shapes:
//

// koch shape:
const kochAxiom = 'F'
const kochRule = {
  F: 'F-F+F+F-F'
}
const kochAngle = Math.PI / 2
const kochShape = new Lshape(kochAxiom, [kochRule], kochAngle)

// box fractal
const boxAxiom = 'F-F-F-F'
const boxRule = {
  F: 'F-F+F+F-F'
}
const boxAngle = Math.PI / 2
const boxShape = new Lshape(boxAxiom, [boxRule], boxAngle)

// other box
const otherShape = new Lshape('F+F+F+F', [{F: 'FF+F+F+F+FF'}], Math.PI / 2)

const draw = (shape, center, stepLength, iterations) => {
  console.log(shape)
  const angle = shape.angle
  for (let i = 0; i < iterations; i++) {
    shape.step()
  }
  const stepsArr = shape.currentState.split('')
  cx.beginPath()
  cx.translate(center.x, center.y)
  cx.moveTo(stepLength, 0)
  stepsArr.forEach(step => {
    switch (step) {
      case '+':
        cx.rotate(-angle)
        break
      case '-':
        cx.rotate(angle)
        break
      case 'F':
        cx.lineTo(stepLength, 0)
        cx.translate(stepLength, 0)
        break
    }
  })
  cx.stroke()
}

draw(otherShape, center, 7, 5)
