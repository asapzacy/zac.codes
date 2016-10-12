
(function() {

  // pixels + findArea function
  const code = document.querySelector('.js_pixels')
  const findArea = () => {
    let area = window.innerWidth * window.innerHeight
    area = String(area).replace(/(?=(?:\d{3})+\b)(?!\b)/g,',')
    code.textContent = area
  }
  findArea()
  window.onresize = findArea


  // menu button + navigation
  const header = document.querySelector('header')
  document.querySelector('.js_menu-btn').addEventListener('click', function() {
    header.classList.toggle('menu-open')
  })

  // display correct page
  window.addEventListener('hashchange', function() {
    header.classList.remove('menu-open')
  })

  // console.log(location.hash.substr(1))

})()
