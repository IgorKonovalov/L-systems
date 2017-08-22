const stats = document.getElementById('stats')
const selectShape = document.getElementById('selectShape')
// initial settings

cx.strokeStyle = 'blue'
cx.globalAlpha = 1

// Lshape container object

function Lshape({axiom, rules, angle, stepLength, center, iterations}, name) {
  this.name = name
  this.axiom = axiom
  this.rules = rules
  this.angle = angle
  this.stepLength = stepLength
  this.center = center
  this.iterations = iterations
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

const shapeNames = Object.keys(SHAPES)
const randomShape = Math.ceil(Math.random() * shapeNames.length)
const shape = new Lshape(
  SHAPES[shapeNames[randomShape - 1]],
  shapeNames[randomShape - 1]
)

for (let item in SHAPES) {
  let option = document.createElement('option')
  option.innerHTML = item
  selectShape.appendChild(option)
}

selectShape.value = shapeNames[randomShape - 1]
selectShape.addEventListener('change', () => {
  const newShape = new Lshape(SHAPES[selectShape.value], selectShape.value)
  setInitialState()
  clearCanvas()
  draw(newShape)
})

//
// DRAW
//

const setInitialState = () => cx.resetTransform()
const clearCanvas = () => {
  cx.beginPath()
  cx.rect(0, 0, cx.canvas.width, cx.canvas.height)
  cx.fillStyle = 'white'
  cx.fill()
}

const draw = (shape, iterations = shape.iterations) => {
  const now = Date.now()
  const angle = shape.angle
  const center = shape.center
  const stepLength = shape.stepLength
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
  stats.innerHTML = `The ${shape.name} rendered in ${Date.now() - now}ms`
}

// initial draw

draw(shape)
