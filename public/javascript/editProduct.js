const material = document.querySelector('.material-grid')
const materialValues = document.getElementById('edit-material')
const materialChecked = Array.from(document.querySelectorAll('input[class="material-checkbox"]:checked'))
let materialList = []
materialChecked.forEach(e => materialList.push(e.value))

const property = document.querySelector('.edit-property')
const propertyValues = document.getElementById('edit-property-list')
const propertyChecked = Array.from(document.querySelectorAll('input[class="property-checkbox"]:checked'))
let propertyList = []
propertyChecked.forEach(e => propertyList.push(e.value))
propertyValues.value = propertyList

const custom = document.querySelector('.edit-custom')
const customList = document.querySelector('.edit-cst-list')
const existedCustom = Array.from(document.querySelectorAll('.custom-label'))


existedCustom.forEach(e => {
  
  const value = e.textContent.split(' ')
  const num = value[1].slice(0, -1)
  customList.innerHTML += `
    <div class="edit-cst-item">
      <label>項目</label>
      <input class="edit-cst-name" type="text" value="${value[0]}" required>
      <input type="hidden" name="custom" value="<input class='custom' type='checkbox' id='${value[0]}'><label class='custom-label' for='${value[0]}'>${value[0]} <span>${num}</span>$</label>">
      <label>價格</label>
      <input class="edit-cst-price" type="number" value="${Number(num)}" required>
      <div class="remove-custom">&#x2715;</div>
    </div>`
})


//食材
material.addEventListener('input', e => {
  const target = e.target

  if (target.checked) {
    materialList.push(target.value)
    materialValues.value = materialList
  } else {
    const index = materialList.indexOf(target.value.split(' ')[0])
    materialList.splice(index, 1)
    materialValues.value = materialList
  }
})

//property icon
property.addEventListener('input', e => {
  const target = e.target

  if (target.checked) {
    propertyList.push(target.value)
    propertyValues.value = propertyList
  } else {
    const index = propertyList.indexOf(target.value.split(' ')[0])
    propertyList.splice(index, 1)
    propertyValues.value = propertyList
  }
})

//客製
custom.addEventListener('click', e => {
  const target = e.target

  if (target.classList.contains('add-custom')){
    let doc = document.createElement('div')
    doc.setAttribute('class', 'edit-cst-item')
    doc.innerHTML += `
      <label>項目</label>
      <input class="edit-cst-name" type="text" required>
      <input type="hidden" name="custom">
      <label>價格</label>
      <input class="edit-cst-price" type="number" required>
      <div class="remove-custom">&#x2715;</div>`
    customList.appendChild(doc)
  }

  if (target.classList.contains('remove-custom')){
    target.parentElement.remove()
  }
})

custom.addEventListener('input', e => {
  const target = e.target

  if (target.classList.contains('edit-cst-name')){

    const num = target.nextElementSibling.nextElementSibling.nextElementSibling.value
    target.nextElementSibling.value = `<input class='custom' type='checkbox' id='${target.value}'><label class='custom-label' for='${target.value}'>${target.value} <span>${num}</span>$</label>`
  }
  
  if (target.classList.contains('edit-cst-price')){

    const name = target.previousElementSibling.previousElementSibling.previousElementSibling.value
    target.previousElementSibling.previousElementSibling.value = `<input class='custom' type='checkbox' id='${name}'><label class='custom-label' for='${name}'>${name} <span>${target.value}</span>$</label>`
  }
})