const menu = document.querySelector('.menu')

const amount = document.querySelector('.amount')
const material = document.querySelector('.material')
const orderTotal = document.querySelector('.order-total')
const orderWindow = document.querySelector('.order-window')
const checkWindow = document.querySelector('.check-window')
const customGroup = document.querySelector('.custom-group')
const orderProductPrice = document.querySelector('.order-product-price')

const totalPrice = document.querySelector('.total-price')
const lastOrder = document.querySelector('.last-order')
const finalOrder = document.querySelector('.final-order')

const orderList = document.querySelector('.order-list')
const billPrice = document.querySelector('.bill-price')

let stockoutList = JSON.parse(localStorage.getItem('stockout')) || []
let orderLimit = 100
let orderInfo = []
let customPrice = 0
let customList = []

if (stockoutList.length){
  fetch('/homePageStockout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ stockout: stockoutList })
  })
  .then((res) => {return res.json()})
  .then( (data) => {
    data.forEach(each => {
      document.getElementById(each).classList.add('stockout-card')
    })
  })
}

function orderTotalCount(custom) {
  orderTotal.innerText = 
  (Number(orderProductPrice.innerText.slice(0, -1)) + custom) * Number(amount.innerText)
}

function totalCalculator() {
  let i = 0
  orderInfo.forEach(each => i += each['price']*each['amount'])
  return i
}

function closeWindow() {
  orderWindow.style = "visibility:hidden;"
  orderTotal.innerText = 0
  amount.innerText = 0
  customPrice = 0
  customList = []
}

function renderOrderList() {
  orderList.innerHTML = ''
  orderInfo.forEach((each, i) => {
    orderList.innerHTML += `
      <tr class="up-tr" data-id="${i}">
        <td>${each['name']}</td>
        <td>
          <button class="plus-btn">&#43;</button>
          <span>${each['amount']}</span>
          <button class="minus-btn">&#8722;</button>
        </td>
        <td>${each['amount']*each['price']}$</td>
        <td class="remove-btn">&#x2715</td>
      </tr>
      <tr class="lowe-tr">
        <td>${each['custom']}</td>
      </tr>`
  })
}

document.getElementById('restock').onclick = function(){localStorage.removeItem('stockout')}


//???????????????????????? chage order window content
menu.addEventListener('click', e => {
  const target = e.target

  if (target.classList.contains('card') && !target.classList.contains('stockout-card')){

    fetch('/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: target.firstElementChild.innerText })
    })
    .then((res) => {return res.json()})
    .then( (data) => {
      orderProductPrice.innerText = data.price + '$'

      orderProductPrice.previousElementSibling.innerText = data.name

      material.innerText = data.material

      customGroup.innerHTML = '<h3>??????</h3>'
      data.custom.forEach(cus => customGroup.innerHTML += `<div>${cus}</div>`)
      customGroup.innerHTML += '<div><label for="note">??????</label><input type="text" id="note"></div>'

      orderWindow.style = "visibility:visible;"
    })
    .catch((err) => {console.error(err)})
  }
})


orderWindow.addEventListener('click', e => {
  const target = e.target
  
  //?????????????????? exit order window
  if (target.classList.contains('order-window')){
    closeWindow()
  }

  //???????????? number keyboard
  if (target.classList.contains('num-btn')){
    amount.innerText = Number(amount.innerText + target.innerText)
    if (Number(amount.innerText) > orderLimit){
      amount.innerText = orderLimit
    }
    orderTotalCount(customPrice)
  }

  //????????? backspace button
  if (target.classList.contains('back-btn')){
    amount.innerText = amount.innerText.slice(0, -1)
    if (amount.innerText === "") {
      amount.innerText = 0
    }
    orderTotalCount(customPrice)
  }

  //???????????? custom
  if (target.classList.contains('custom')){
    if (target.checked) {
      customPrice += Number(target.nextElementSibling.firstElementChild.innerText)

      customList.push(target.nextElementSibling.innerText.split(' ')[0])
    }
    else {
      customPrice -= Number(target.nextElementSibling.firstElementChild.innerText)

      const index = customList.indexOf(target.nextElementSibling.innerText.split(' ')[0])
      customList.splice(index, 1)
    }
    orderTotalCount(customPrice)
  }

  //?????? order button
  if (target.classList.contains('order-it')){
    if (Number(amount.innerText) === 0) alert('??????????????????????????????')
    else {
      const order = {
        'name': orderProductPrice.previousElementSibling.innerText,
        'amount': Number(amount.innerText),
        'price': Number(orderTotal.innerText)/Number(amount.innerText),
        'custom': [...customList, document.getElementById("note").value]
      }
      orderInfo.push(order)

      lastOrder.innerText = orderProductPrice.previousElementSibling.innerText + ' x' + amount.innerText
      totalPrice.innerText = totalCalculator()

      closeWindow()
    }
  }
})


finalOrder.addEventListener('click', e => {
  const target = e.target

  //???????????? clear order
  if (target.classList.contains('clear-btn')){
    orderInfo = []
    lastOrder.innerText = ''
    totalPrice.innerText = 0
  }

  //??????/???????????? check/edit order
  if (target.classList.contains('check-btn')){
    renderOrderList()
    billPrice.innerText = totalCalculator()
    checkWindow.style = "visibility:visible;"
  }

})


checkWindow.addEventListener('click', e => {
  const target = e.target
  
  //?????????????????? exit check window
  if (target.classList.contains('check-window')){
    totalPrice.innerText = totalCalculator()
    lastOrder.innerText = ''
    checkWindow.style = "visibility:hidden;"
  }

  //???????????? amount modify
  if (target.classList.contains('plus-btn')){
    const indexId = Number(target.parentElement.parentElement.dataset.id)

     orderInfo[indexId]['amount'] += 1
     renderOrderList()
     billPrice.innerText = totalCalculator()
  }

  if (target.classList.contains('minus-btn')){
    const indexId = Number(target.parentElement.parentElement.dataset.id)

    if (orderInfo[indexId]['amount'] > 1){
      orderInfo[indexId]['amount'] -= 1
      renderOrderList()
      billPrice.innerText = totalCalculator()
    }
  }

  //???????????? remove order
  if (target.classList.contains('remove-btn')){
    orderInfo.splice(Number(target.parentElement.dataset.id), 1)
    renderOrderList()
    billPrice.innerText = totalCalculator()
  }

  //?????????????????? generate bill
  if (target.classList.contains('bill') && orderInfo.length){
    //?????????????????? orderInfo ?????? export orderInfo data
    alert('????????????\n*??????????????? orderInfo ??????')
    orderInfo = []
    lastOrder.innerText = ''
    totalPrice.innerText = 0
    checkWindow.style = "visibility:hidden;"
  }
})