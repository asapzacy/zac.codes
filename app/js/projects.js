import { scrollToTop } from './utils'

// projects page - specific functions
export default function runProjectsPage() {

  // set up scroll to top arrow function
  // TODO: only show arrow if needed [height > 100% viewport]
  const arrow = document.querySelector('.js_top__arrow')
  scrollToTop()

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




    // click on image + full screen modal
    const preview = document.querySelectorAll('.js_preview')
    const menuBtn = document.querySelector('.js_menu__btn')
    for (let i = 0; i < preview.length; i++) {
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

}
