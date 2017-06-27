import { scrollToTop, lazyLoad } from '../utils'

// projects page - specific functions
export default function runProjectsPage() {

  // set up arrow + scroll to top function
  // TODO: only show arrow if needed [height > 100% viewport]
  const topArrow = document.querySelector('.js-page__arrow--top')
  topArrow && topArrow.addEventListener('click', function() {
    scrollToTop(this.parentNode)
  })

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
    const projectImages = Array.from(document.querySelectorAll('.js-project__image'))
    lazyLoad(projectImages)
  }

  fadeInImages()

}
