const menu = document.querySelector('.menu')
const orderWindow = document.querySelector('.order-window')
const amount = document.querySelector('.amount')
const orderProductPrice = document.querySelector('.order-product-price')
const orderTotal = document.querySelector('.order-total')
const material = document.querySelector('.material')
const customGroup = document.querySelector('.custom-group')

let orderLimit = 100
let customPrice = 0

//餐點價格計算 order price calculat
function orderTotalCount(custom) {
  orderTotal.innerText = 
  (Number(orderProductPrice.innerText.slice(0, -1)) + custom) * Number(amount.innerText)
}

//更換點餐視窗內容 chage order window content
menu.addEventListener('click', e => {
  const target = e.target

  if (target.classList.contains('card')){

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

      customGroup.innerHTML = '<h3>客製</h3>'
      data.custom.forEach(cus => customGroup.innerHTML += `<div>${cus}</div>`)
      customGroup.innerHTML += '<div><label for="note">備註</label><input type="text" id="note"></div>'

      orderWindow.style = "visibility:visible;"
    })
    .catch((err) => {console.error(err)})
  }
})

orderWindow.addEventListener('click', e => {
  const target = e.target
  
  //退出點餐視窗 exit order window
  if (target.classList.contains('order-window')){
    target.style = "visibility:hidden;"
    orderTotal.innerText = 0
    amount.innerText = 0
    customPrice = 0
  }

  //數字鍵盤 number keyboard
  if (target.classList.contains('num-btn')){
    amount.innerText = Number(amount.innerText + target.innerText)
    if (Number(amount.innerText) > orderLimit){
      amount.innerText = orderLimit
    }
    orderTotalCount(customPrice)
  }

  //backspace button
  if (target.classList.contains('back-btn')){
    amount.innerText = amount.innerText.slice(0, -1)
    if (amount.innerText === "") {
      amount.innerText = 0
    }
    orderTotalCount(customPrice)
  }

  //custom
  if (target.classList.contains('custom')){
    if (target.checked) {
      customPrice += Number(target.nextElementSibling.firstElementChild.innerText)
    }
    else {
      customPrice -= Number(target.nextElementSibling.firstElementChild.innerText)
    }
    orderTotalCount(customPrice)
  }
})