import { scrollToTop } from '../utils'

export default function runAboutPage() {

  const main = document.querySelector('main')
  const arrow = main.querySelector('.js-page__arrow--top')

  arrow.addEventListener('click', () => scrollToTop(main))

}
