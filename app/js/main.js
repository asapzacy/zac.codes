import { updatePage, runNewFunctions } from './spa'
import { loadFonts } from './init'

(() => {

  //  DOM elements
  const header = document.querySelector('header')
  const triggerMenu = document.querySelector('.js-trigger--menu')
  const menu = document.querySelector('.js-menu')

  //  functions
  const toggleMenu = () => {
    header.classList.toggle('menu-open')
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

  loadFonts()
  runNewFunctions()

  triggerMenu.addEventListener('click', toggleMenu)
  menu.addEventListener('click', changePage)

})()
