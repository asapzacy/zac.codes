import { scrollToTop } from './utils'

export default function runAboutPage() {

  (function() {

    // set up scroll to top arrow function
    // TODO: only show arrow if needed [height > 100% viewport]
    const arrow = document.querySelector('.js_top__arrow')
    arrow.addEventListener('click', function() {
      scrollToTop(this.parentNode)
    })

  })()
}
