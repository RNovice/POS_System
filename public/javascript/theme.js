const colors = JSON.parse(localStorage.getItem('color')) || {}

if (Object.keys(colors).length){
  const style = document.documentElement.style
  
  style.setProperty('--main-color', `${colors.main}`);
  style.setProperty('--main-content-color', `${colors.mainContent}`);
  style.setProperty('--sidebar-color', `${colors.sidebar}`);
  style.setProperty('--sidebar-content-color', `${colors.sidebarContent}`);
  style.setProperty('--card-color', `${colors.card}`);
  style.setProperty('--card-content-color', `${colors.cardContent}`);
}