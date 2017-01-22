
import { scrollToTop, fadeOut, fadeIn } from './utils'

// projects page - specific functions
export default function runProjectsPage() {

  // set up arrow + scroll to top function
  // TODO: only show arrow if needed [height > 100% viewport]
  const topArrow = document.querySelector('.js-page__arrow--top')
  topArrow.addEventListener('click', function() {
    scrollToTop(this.parentNode)
  }, false)

  //  loop over every project, add event listener to expand icon button
  const projects = Array.from(document.querySelectorAll('.js-project'))
  projects.forEach(project => {
    const expandIcon = project.querySelector('.project__expandIcon')
    expandIcon.addEventListener('click', expandDetails, false)

    const closeIcon = project.querySelector('.project__closeIcon')
    closeIcon.addEventListener('click', closeDetails, false)
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

}
