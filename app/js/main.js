(function() {

  // pixels + findArea function
  const code = document.querySelector('.js_pixels')
  const findArea = () => {
    if (code && code.textContent !== null) {
      let area = window.innerWidth * window.innerHeight
      area = String(area).replace(/(?=(?:\d{3})+\b)(?!\b)/g,',')
      code.textContent = area
    }
  }
  // window event listeners for page load + page resize
  window.addEventListener('load', findArea, { passive: true })
  window.addEventListener('resize', findArea, { passive: true })

  // menu button + navigation
  const header = document.querySelector('header')
  const menuBtn = document.querySelector('.js_menu-btn')
  menuBtn.addEventListener('click', function() {
    header.classList.toggle('menu-open')
  })

})()
