const colorBoard = document.querySelector('.color-board')

const mainColor = document.getElementById('main')
const mainContent = document.getElementById('main-content')
const sidebarColor = document.getElementById('sidebar')
const sidebarContent = document.getElementById('sidebar-content')
const cardColor = document.getElementById('card')
const cardContent = document.getElementById('card-content')

const customColor = JSON.parse(localStorage.getItem('color')) || {}

if (Object.keys(customColor).length){
    mainColor.value = customColor.main
    mainContent.value = customColor.mainContent
    sidebarColor.value = customColor.sidebar
    sidebarContent.value = customColor.sidebarContent
    cardColor.value = customColor.card
    cardContent.value = customColor.cardContent
}

colorBoard.addEventListener('input', e => {
  const target = e.target

  if (target.classList.contains('color-picker')){
    document.documentElement.style.setProperty(`--${target.id}-color`, target.value);
  }

})

colorBoard.addEventListener('click', e => {
  const target = e.target

  if (target.classList.contains('customized')){
    const colorSet = {
      'main': mainColor.value,
      'mainContent': mainContent.value,
      'sidebar': sidebarColor.value,
      'sidebarContent': sidebarContent.value,
      'card': cardColor.value,
      'cardContent': cardContent.value
    }

    localStorage.setItem('color', JSON.stringify(colorSet))
  }

  if (target.classList.contains('original-color')){
    const style = document.documentElement.style

    mainColor.value = '#ffffff'
    mainContent.value = '#000000'
    sidebarColor.value = '#2222aa'
    sidebarContent.value = '#ffffff'
    cardColor.value = '#0088ff'
    cardContent.value = '#ffffff'
    
    style.setProperty('--main-color', '#fff');
    style.setProperty('--main-content-color', '#000');
    style.setProperty('--sidebar-color', '#22a');
    style.setProperty('--sidebar-content-color', '#fff');
    style.setProperty('--card-color', '#08f');
    style.setProperty('--card-content-color', '#fff');
  }
})
