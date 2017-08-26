const stats = document.getElementById('stats')
const selectShape = document.getElementById('selectShape')
// initial settings

cx.strokeStyle = 'blue'
cx.globalAlpha = 1

// Lshape container object

function Lshape(
  {
    axiom,
    rules,
    angle,
    stepLength,
    center,
    iterations,
    initialAngle,
    closePath
  },
  name
) {
  this.name = name
  this.axiom = axiom
  this.rules = rules
  this.angle = angle
  this.stepLength = stepLength
  this.center = center
  this.iterations = iterations
  this.initialAngle = initialAngle
  this.closePath = closePath
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

Lshape.prototype.iterate = function() {
  for (let i = 0; i < this.iterations; i++) {
    this.step()
  }
}

const shapeNames = Object.keys(SHAPES)
const randomShape = Math.ceil(Math.random() * shapeNames.length)
const shape = new Lshape(
  SHAPES[shapeNames[randomShape - 1]],
  shapeNames[randomShape - 1]
)
shape.iterate()
for (let item in SHAPES) {
  let option = document.createElement('option')
  option.innerHTML = item
  selectShape.appendChild(option)
}
selectShape.value = String(shapeNames[randomShape - 1])

selectShape.addEventListener('change', () => {
  const newShape = new Lshape(SHAPES[selectShape.value], selectShape.value)
  newShape.iterate()
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

const draw = shape => {
  const now = Date.now()
  const angle = shape.angle
  const center = shape.center
  const stepLength = shape.stepLength
  const stepsArr = shape.currentState.split('')
  cx.translate(center.x, center.y)
  if (shape.initialAngle) {
    cx.rotate(shape.initialAngle)
  }
  cx.moveTo(stepLength, 0)
  stepsArr.forEach((step, i) => {
    switch (step) {
      case '+':
        cx.rotate(-angle)
        break
      case '-':
        cx.rotate(angle)
        break
      case '[':
        cx.save()
        break
      case ']':
        cx.restore()
        break
      case 'F':
        cx.beginPath()
        cx.strokeStyle = `hsl(${i / 30}, 90%, 50%)`
        cx.moveTo(0, 0)
        cx.lineTo(stepLength, 0)
        cx.translate(stepLength, 0)
        cx.stroke()
        break
      case 'f':
        cx.moveTo(stepLength, 0)
        cx.translate(stepLength, 0)
        break
      case 'b':
        cx.moveTo(stepLength, 0)
        cx.translate(stepLength, 0)
        break
    }
  })
  if (typeof shape.closePath === 'undefined') {
    cx.closePath()
  }
  cx.stroke()
  stats.innerHTML = `The ${shape.name} rendered in ${Date.now() - now}ms`
}

// initial draw

draw(shape)
