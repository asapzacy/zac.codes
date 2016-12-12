(() => {

  'use strict'

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
      const preview = document.querySelectorAll('.js_preview')
      const previewSize = preview.length
      for (let i = 0; i < previewSize; i++) {
        preview[i].addEventListener('click', function(e) {
          e.preventDefault()
          const figure = preview[i].querySelector('figure')
          const caption = preview[i].querySelector('figcaption')
          const img = preview[i].querySelector('img')
          if (!preview[i].classList.contains('fullscreen') && e.target === img) {
            preview[i].classList.add('fullscreen')
            menuBtn.style.display = 'none'
            fade(figure, true, 40)
          }
          if (preview[i].classList.contains('fullscreen') && (e.target !== img && e.target !== caption && e.target !== figure)) {
            preview[i].classList.remove('fullscreen')
            menuBtn.style.display = 'block'
          }
        })

      }

      const expand = document.querySelectorAll('.js_expand ')
      const details = document.querySelectorAll('.js_details')
      const expandSize = expand.length
      for (let i = 0; i < expandSize; i++) {
        expand[i].addEventListener('click', function(e) {
          e.preventDefault()
          if (expand[i].classList.contains('expanded')) {
            expand[i].classList.remove('expanded')
            details[i].style.maxHeight = 0
            return
          }
          if (!expand[i].classList.contains('expanded')) {
            expand[i].classList.add('expanded')
            details[i].style.maxHeight = `${details[i].scrollHeight}px`
            return
          }
        })
      }

    })()
  }

  // run functions specific to their page
  window.addEventListener('load', specificPage)
  function specificPage() {
    const path = location.pathname
    if (path === '/' || path === '/index.html') {
    } else if (path.startsWith('/about')) {

    } else if (path.startsWith('/projects')) {
      runProjects()
    } else {
      console.log('wut')
    }
  }

  // scroll to top
  const arrow = document.querySelector('.top')
  if (arrow) {
    arrow.addEventListener('click', function() {
      scrollToTop(this.parentNode)
    })
  }
  function scrollToTop(el) {
    if (el.scrollTop !== 0) {
      setTimeout(function() {
        el.scrollTop = el.scrollTop - 25
        scrollToTop(el)
      },0)
    }
  }
  function x(el) {
    const ex = topArrow
    const diff = ex.parentNode.scrollHeight - ex.parentNode.scrollTop
    const q = ex.getBoundingClientRect().bottom
    ex.classList.add('hide')
    ex.classList.remove('show')
    if (diff <= 475) {
      ex.classList.add('show')
      ex.classList.remove('hide')
    }
  }
  const page = document.querySelector('.about')
  page && page.addEventListener('scroll', x)

})()
