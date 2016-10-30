(function() {

  // pixels + findArea function
  const findArea = () => {
    const code = document.querySelector('.js_pixels')
    if (code && code.textContent !== null) {
      let area = window.innerWidth * window.innerHeight
      area = String(area).replace(/(?=(?:\d{3})+\b)(?!\b)/g,',')
      code.textContent = area
    }
  }

  // event listeners for landing page
  if (location.pathname === '/' || location.pathname === '/index.html') {
    window.addEventListener('load', findArea, { passive: true })
    window.addEventListener('resize', findArea, { passive: true })
  }

  // menu button + navigation
  const header = document.querySelector('header')
  const menuBtn = document.querySelector('.js_menu-btn')
  menuBtn.addEventListener('click', function() {
    header.classList.toggle('menu-open')
  })

  // state + page navigation
  const navItems = document.querySelectorAll('header a')
  for (let i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener('click', function(e) {
      e.preventDefault()
      header.classList.remove('menu-open')
      history.pushState(null, null, e.currentTarget.pathname)
      updatePage()
    })
  }

  window.addEventListener('popstate', updatePage)

  const main = document.querySelector('main')
  function updatePage() {
    const url = window.location.href
    loadPage(url).then(function(responseText) {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = responseText
      const oldPage = document.querySelector('.page')
      const newPage = wrapper.querySelector('.page')
      main.removeChild(oldPage)
      main.appendChild(newPage)
    })
  }

  const cache = {}
  function loadPage(url) {
    if (cache[url]) {
      return new Promise(function(resolve) {
        resolve(cache[url])
      })
    }
    return fetch(url, {
      method: 'GET'
    }).then(function(response) {
      cache[url] = response.text()
      return cache[url]
    })
  }

})()
