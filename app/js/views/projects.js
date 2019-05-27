import { scrollToTop, lazyLoad } from '../utils'

// projects page - specific functions
export default function runProjectsPage() {
  const main = document.querySelector('main')
  const arrow = main.querySelector('.js-page__arrow')
  arrow.addEventListener('click', () => scrollToTop(main))

  //  loop over every project, add event listener to expand icon button
  const projects = Array.from(document.querySelectorAll('.js-project'))
  projects.forEach(project => {
    const expandIcon = project.querySelector('.project__expandIcon')
    const closeIcon = project.querySelector('.project__closeIcon')
    if (expandIcon && closeIcon) {
      expandIcon.addEventListener('click', expandDetails)
      closeIcon.addEventListener('click', closeDetails)
    }
  })

  function closeDetails() {
    const details = this.parentNode
    const icon = details.previousElementSibling
    details.style.maxHeight = 0
    details.classList.toggle('project__details--expanded')
    icon.classList.toggle('project__expandIcon--expanded')
  }

  function expandDetails() {
    this.classList.toggle('project__expandIcon--expanded')
    const details = this.nextElementSibling
    const isExpanded = details.classList.contains('project__details--expanded')
    details.classList.toggle('project__details--expanded')
    details.style.maxHeight = isExpanded ? 0 : `${details.scrollHeight}px`
  }

  const fadeInImages = () => {
    const images = Array.from(document.querySelectorAll('.js-project__image'))
    lazyLoad(images)
  }

  fadeInImages()
}
