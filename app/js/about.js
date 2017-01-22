import { scrollToTop } from './utils'

export default function runAboutPage() {

  // set up arrow + scroll to top function
  // TODO: only show arrow if needed [height > 100% viewport]
  const topArrow = document.querySelector('.js-page__arrow--top')
  topArrow.addEventListener('click', function() {
    scrollToTop(this.parentNode)
  }, false)
}
