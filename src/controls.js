const imageContainer = document.getElementsByClassName('imageList')[0]
const stats = document.getElementById('stats')
const name = document.getElementById('name')

// controls

const axiom = document.getElementById('axiom')
const rules = document.getElementById('rules')
const canvasColor = document.getElementById('canvasColor')
const colorize = document.getElementById('colorizeShape')

const shapesNamesList = Object.keys(SHAPES)
shapesNamesList.forEach((element, i) => {
  const image = document.createElement('img')
  const id = SHAPES[element].id
  image.setAttribute('src', `src/img/${id}.png`)
  image.setAttribute('class', 'shapePreview')
  image.setAttribute('data-id', id)
  imageContainer.appendChild(image) 
});

const previews = document.getElementsByClassName('shapePreview')
const previewsArr = Array.from(previews)

previewsArr.forEach(preview => {
  preview.addEventListener('click', e => {
    previewsArr.forEach(el => el.classList.remove('active'))
    preview.classList.toggle('active')
    updateDraw(preview, state)
  })
})