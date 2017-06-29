import { updatePage, runNewFunctions } from './spa'
import { loadFonts, checkBrowser, loadBgImage } from './init'

(() => {

  //  DOM elements
  const header = document.querySelector('header')
  const triggerMenu = document.querySelector('.js-trigger--menu')
  const menu = document.querySelector('.js-menu')
  const main = document.querySelector('main')

  //  functions
  const toggleMenu = () => {
    header.classList.toggle('menu-open')
  }

  const changePage = (e) => {
    console.dir(e.target)
    if (e.target && e.target.nodeName === 'A') {
      e.preventDefault()
      toggleMenu()
      if (e.target.pathname !== window.location.pathname) {
        history.pushState(null, null, e.target.pathname)
        main.scrollTop = 0
        updatePage()
      }
    }
    return false
  }

  checkBrowser()
  loadBgImage()
  loadFonts()
  runNewFunctions()

  triggerMenu.addEventListener('click', toggleMenu)
  menu.addEventListener('click touchstart', changePage)

  // if ('ontouchstart' in document.documentElement) {
  //   menu.addEventListener('touchstart', changePage)
  // } else {
  //   menu.addEventListener('click', changePage)
  // }

  // menu.addEventListener('touchstart', function(e) { e.preventDefault();console.dir(e) })

})()
