
import { updatePage, runNewFunctions } from './spa'
import devtools from './chrome_extension/devtools'

// menu button + open navigation
const header = document.querySelector('header')
const menuBtn = document.querySelector('.js_menu__btn')
menuBtn.addEventListener('click', function() {
  header.classList.toggle('menu-open')
})
// navigation links + close menu + update page
const navItems = document.querySelectorAll('.js_menu__list a')
for (let i = 0; i < navItems.length; i++) {
  navItems[i].addEventListener('click', function(e) {
    e.preventDefault()
    header.classList.remove('menu-open')
    if (e.currentTarget.pathname !== window.location.pathname) {
      history.pushState(null, null, e.currentTarget.pathname)
      updatePage()
    }
  })
}
// landing page + initial website load
window.addEventListener('load', runNewFunctions)
