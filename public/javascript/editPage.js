const toolbar = document.querySelector('.button-area')
const editWindow = document.querySelector('.edit-window')
const panel = document.querySelector('.edit-panel')
const menu = document.querySelector('.menu')
const cards = Array.from(document.querySelectorAll('.card')) 



toolbar.addEventListener('click', e => {
  const target = e.target

  if (target.checked) {
    document.querySelector('.de-btn-state').textContent = '編輯'
    document.querySelector('.edit-mode').textContent = '刪除模式'
    cards.forEach(each => each.classList.add('delete-card'))
  } else {
    document.querySelector('.de-btn-state').textContent = '刪除'
    document.querySelector('.edit-mode').textContent = '編輯模式'
    cards.forEach(each => each.classList.remove('delete-card'))
  }

  if (target.classList.contains('add-something')){
    panel.innerHTML = `
    <form action="/addsomedata" method="post" enctype="multipart/form-data">
      <select class="something-selector" name="option">
        <option value="category">新增產品分類</option>
        <option value="material">新增食材物料</option>
        <option value="property">新增屬性icon</option>
      </select>
      <div class="here-something" type="submit">
        <input class="something-input" name="category" type="text" placeholder="輸入分類名稱" required>
      </div>
      <button class="general-button">確認新增</button>
    </form>`

    editWindow.style = "visibility: visible;"
  }
})

menu.addEventListener('click', e => {
  const target = e.target
  
  if (target.classList.contains('delete-card')){
    e.preventDefault()
    panel.innerHTML = `
    <h3>確定要刪除${target.dataset.name}?</h3>
    <button class="general-button delete-submit" data-id="${target.dataset.id}">確定</button>
    `
    editWindow.style = "visibility: visible;"
  }
})

editWindow.addEventListener('click', e => {
  const target = e.target
  
  if (target.classList.contains('edit-window')){
    editWindow.style = "visibility: hidden;"
    panel.innerHTML = ''
  }

  if (target.classList.contains('delete-submit')){
    fetch('/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: target.dataset.id })
    })
    .then(res => {return res.json()})
    .then(data => {
      if (data === true) {
        alert('移除成功')
        document.getElementById(`${target.dataset.id}`).remove()
      } else {
        alert('移除失敗')
      }
      editWindow.style = "visibility: hidden;"
      panel.innerHTML = ''
    })
  }
})

panel.addEventListener('input', e => {
  const target = e.target


  if (target.classList.contains('something-selector')){
    const sendHTML = document.querySelector('.here-something')
    switch (target.value){
      case 'cetagory':
      sendHTML.innerHTML = '<input class="something-input" name="category" type="text" placeholder="輸入分類名稱" required>'
      break;
      case 'material':
      sendHTML.innerHTML = '<input class="something-input" name="material" type="text" placeholder="輸入物料名稱" required>'
      break;
      case 'property':
      sendHTML.innerHTML = '<input class="something-input" name="property" type="file" required>'
      break;
    }
  }
})