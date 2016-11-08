(() => {

  // require('es6-promise').polyfill()
  // require('isomorphic-fetch')

  // pixels + findArea function
  const findArea = () => {
    const code = document.querySelector('.js_pixels')
    if (code && code.textContent !== null) {
      let area = window.innerWidth * window.innerHeight
      area = String(area).replace(/(?=(?:\d{3})+\b)(?!\b)/g,',')
      code.textContent = area
    }
  }
  window.addEventListener('load', findArea, { passive: true })
  window.addEventListener('resize', findArea, { passive: true })

  // menu button + navigation
  const header = document.querySelector('header')
  const menuBtn = document.querySelector('.js_menu-btn')
  menuBtn.addEventListener('click', function() {
    header.classList.toggle('menu-open')
  })

  // state + page navigation
  const navItems = document.querySelectorAll('.menu-nav a')
  for (let i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener('click', function(e) {
      e.preventDefault()
      header.classList.remove('menu-open')
      if (e.currentTarget.pathname !== location.pathname) {
        history.pushState(null, null, e.currentTarget.pathname)
        updatePage()
      }
    })
  }

  window.addEventListener('popstate', updatePage)

  const main = document.querySelector('main')
  function updatePage() {
    const url = window.location.href
    loadPage(url).then((responseText) => {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = responseText
      const oldPage = document.querySelector('.page')
      const newPage = wrapper.querySelector('.page')
      document.title = wrapper.getElementsByTagName('title')[0].innerHTML
      main.removeChild(oldPage)
      main.appendChild(newPage)
      fade(newPage,true)
      specificPage()
      if (location.pathname === '/' || location.pathname === '/index.html') {
        findArea()
      }
    })
  }

  // fade any element in + out
  function fade(el, dir, speed=60) {
    dir ? el.style.opacity = 0 : el.style.opacity = 1
    dir ? fadeIn() : fadeOut()
    function fadeIn() {
      if (el.style.opacity < 1) {
        setTimeout(function() {
          el.style.opacity = +el.style.opacity + 0.05
          fadeIn()
        },speed)
      }
    }
    function fadeOut() {
      if (el.style.opacity > 0) {
        setTimeout(function() {
          el.style.opacity = +el.style.opacity - 0.05
          fadeOut()
        },speed)
      }
    }
  }

  // fetch get + load + cache new url
  const cache = {}
  function loadPage(url) {
    if (cache[url]) {
      return Promise.resolve(cache[url])
    }
    return fetch(url)
      .then((response) => {
        if (response.ok) {
          cache[url] = response.text()
          return cache[url]
        } else {
          console.log('network response was not ok.')
        }
      })
      .catch((err) => console.log(`there has been an error requesting (${url}): ${err.message}`))
  }


  // projects page specific functions
  function runProjects() {
    (function() {

      // click on image + full screen modal
      const preview = document.querySelector('.js_preview')
      const img = preview.querySelector('img')
      const figure = preview.querySelector('figure')
      preview.addEventListener('click', function(e) {
        e.preventDefault()
        const caption = preview.querySelector('figcaption')
        const img = preview.querySelector('img')
        const x = preview.querySelector('.x')
        let expanded = false
        console.log(e.target)
        if (!preview.classList.contains('fullscreen') && e.target === img) {
          preview.classList.add('fullscreen')
          menuBtn.style.display = 'none'
          fade(figure, true, 40)
        }
        if (preview.classList.contains('fullscreen') && (e.target !== img && e.target !== caption && e.target !== figure)) {
          preview.classList.remove('fullscreen')
          menuBtn.style.display = 'block'
        }
      })

    })()
  }


  window.addEventListener('load', specificPage)

  function specificPage() {
    const path = location.pathname
    if (path === '/' || path === '/index.html') {
      console.log('home')
    } else if (path.startsWith('/about')) {
      console.log('about')
    } else if (path.startsWith('/projects')) {
      runProjects()
      console.log('projects')
    } else {
      console.log('wut')
    }
  }




  // scroll to top
  // const arrow = document.querySelector('.top')
  // if (arrow) {
  //   arrow.addEventListener('click', function() {
  //     scrollToTop(this.parentNode)
  //   })
  // }
  // function scrollToTop(el) {
  //   if (el.scrollTop !== 0) {
  //     setTimeout(function() {
  //       el.scrollTop = el.scrollTop - 25
  //       scrollToTop(el)
  //     },0)
  //   }
  // }
  //
  // function x(el) {
  //   const ex = topArrow
  //   const diff = ex.parentNode.scrollHeight - ex.parentNode.scrollTop
  //   const q = ex.getBoundingClientRect().bottom
  //   // console.log(diff)
  //   ex.classList.add('hide')
  //   ex.classList.remove('show')
  //   if (diff <= 475) {
  //     ex.classList.add('show')
  //     ex.classList.remove('hide')
  //   }
  // }
  // const page = document.querySelector('.about')
  // page.addEventListener('scroll', x)

})()
