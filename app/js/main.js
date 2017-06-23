import { updatePage, runNewFunctions } from './spa'
import { findArea } from './utils'

(function() {

  //  navigation selectors
  const header = document.querySelector('header')
  const triggerMenu = document.querySelector('.js-trigger--menu')
  const menu = document.querySelector('.js-menu')

  //  navigation methods
  function toggleMenu() {
    header.classList.toggle('menu-open')
  }
  function changePage(event) {
    if (event.target && event.target.nodeName === 'A') {
      event.preventDefault()
      toggleMenu()
      if (event.target.pathname !== window.location.pathname) {
        history.pushState(null, null, event.target.pathname)
        updatePage()
      }
    }
  }

  //  navigation event listeners + run on initial load
  runNewFunctions()
  triggerMenu.addEventListener('click', toggleMenu)
  menu.addEventListener('click', changePage)

})()
