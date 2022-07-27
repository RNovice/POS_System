const stockPage = document.querySelector('.stock-grid')
const submitWindow = document.querySelector('.stock-submit-window')
const stockoutListView = document.querySelector('.stockout-list')
const stockSubmitWindow = document.querySelector('.stock-submit-window')

let stockoutList = JSON.parse(localStorage.getItem('stockout')) || []

//顯示已缺貨 show already stockout
stockoutList.forEach(each => {
  document.getElementById(each).checked = true
})


stockPage.addEventListener('click', e => {
  target = e.target

  if (target.classList.contains('stock-checkbox')){

    //將目標加入缺貨清單 add target to stockout list
    if (target.checked){
      stockoutList.push(target.nextElementSibling.innerText)
    } else {
      const index = stockoutList.indexOf(target.nextElementSibling.innerText)
      stockoutList.splice(index, 1)
    }
  }

  //缺貨再確認視窗 reconfirm stockout windows
  if (target.classList.contains('show-stockout')){
    stockoutListView.innerHTML = ''
    stockoutList.forEach(each => {
      stockoutListView.innerHTML += `<h5>${each}</h5>`
    })
      
    submitWindow.style = 'visibility: visible;'
  }
})


stockSubmitWindow.addEventListener('click', e => {
  target = e.target
  
  //退出視窗再確認 exit reconfirm window
  if (target.classList.contains('stock-submit-window')){
    submitWindow.style = 'visibility: hidden;'
  }

  //將缺貨清單加入本地儲存 add stockout list to local storage
  if (target.classList.contains('stockout-btn')){
    localStorage.setItem('stockout', JSON.stringify(stockoutList))
  }
})