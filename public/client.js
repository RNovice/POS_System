const menu = document.querySelector('.menu')
const orderWindow = document.querySelector('.order-window')
const amount = document.querySelector('.amount')
const orderProductPrice = document.querySelector('.order-product-price')
const orderTotal = document.querySelector('.order-total')
let orderLimit = 100
let custom = 0

function orderTotalCount(custom) {
  orderTotal.innerText = 
  (Number(orderProductPrice.innerText.slice(0, -1)) + custom) * Number(amount.innerText)
}

menu.addEventListener('click', e => {
  const target = e.target

  if (target.classList.contains('card')){
    orderWindow.style = "visibility:visible;"
  }
})

orderWindow.addEventListener('click', e => {
  const target = e.target
  
  //退出點餐視窗 exit order window
  if (target.classList.contains('order-window')){
    target.style = "visibility:hidden;"
    amount.innerText = 0
  }

  //數字鍵盤 number keyboard
  if (target.classList.contains('num-btn')){
    amount.innerText = Number(amount.innerText + target.innerText)
    if (Number(amount.innerText) > orderLimit){
      amount.innerText = orderLimit
    }
    orderTotalCount(custom)
  }

  //backspace button
  if (target.classList.contains('back-btn')){
    amount.innerText = amount.innerText.slice(0, -1)
    if (amount.innerText === "") {
      amount.innerText = 0
    }
    orderTotalCount(custom)
  }

  //custom
  if (target.classList.contains('custom')){
    if (target.checked) {
      custom += Number(target.nextElementSibling.firstElementChild.innerText)
    }
    else {
      custom -= Number(target.nextElementSibling.firstElementChild.innerText)
    }
    orderTotalCount(custom)
  }
})