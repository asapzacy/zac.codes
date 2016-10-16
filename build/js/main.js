
(function() {

  // remove url bar
  window.addEventListener('load', function() {
    setTimeout(function() {
      window.scrollTo(0,1)
    },0)
  })

  // pixels + findArea function
  const code = document.querySelector('.js_pixels')
  const findArea = () => {
    let area = window.innerWidth * window.innerHeight
    area = String(area).replace(/(?=(?:\d{3})+\b)(?!\b)/g,',')
    code.textContent = area
  }
  findArea()
  window.addEventListener('resize', findArea, { passive: true })


  // menu button + navigation
  const header = document.querySelector('header')
  const menuBtn = document.querySelector('.js_menu-btn')
  menuBtn.addEventListener('click', function() {
    header.classList.toggle('menu-open')
  })
  const navItems = document.querySelectorAll('.menu-nav a')
  const navItemsSize = navItems.length
  for (let i = 0; i < navItemsSize; i++) {
    navItems[i].addEventListener('click', function() {
      header.classList.remove('menu-open')
    })
  }

  // display correct page
  window.addEventListener('hashchange', function(e) {
    const oldPage = document.getElementById(e.oldURL.split('#')[1] || 'landing')
    const newPage = document.getElementById(e.newURL.split('#')[1])
    if (oldPage !== newPage) {
      oldPage.classList.remove('page-shown')
      newPage.classList.add('page-shown')
    }
  })

})()
