import { updatePage, runNewFunctions } from './spa'
import { findArea, fadeIn, fadeOut } from './utils'

(() => {

  //  DOM elements
  const header = document.querySelector('header')
  const triggerMenu = document.querySelector('.js-trigger--menu')
  const menu = document.querySelector('.js-menu')
  const page = document.querySelector('.page')

  //  functions
  const toggleMenu = () => {
    if (header.classList.contains('menu-open')) {
      header.classList.remove('menu-open')
      // fadeIn(page)
    } else {
      header.classList.add('menu-open')
      // fadeOut(page,10)
    }
  }

  const changePage = (e) => {
    if (e.target && e.target.nodeName === 'A') {
      e.preventDefault()
      toggleMenu()
      if (e.target.pathname !== window.location.pathname) {
        history.pushState(null, null, e.target.pathname)
        updatePage()
      }
    }
  }

  runNewFunctions()
  triggerMenu.addEventListener('click', toggleMenu)
  menu.addEventListener('click', changePage)

})()
