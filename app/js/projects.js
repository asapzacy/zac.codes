
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
  const projects = document.querySelectorAll('.js-project')
  projects.forEach(item => {
    const icon = item.querySelector('.project__expandIcon')
    icon.addEventListener('click', expandDetails, false)
  })
  projects.forEach(item => {
    const icon = item.querySelector('.project__closeIcon')
    icon.addEventListener('click', closeDetails, false)
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



    // click on image + full screen modal
    // const preview = document.querySelectorAll('.js-preview')
    // const menuBtn = document.querySelector('.js-menu__btn')
    // for (let i = 0; i < preview.length; i++) {
    //   preview[i].addEventListener('click', function(e) {
    //     e.preventDefault()
    //     const figure = preview[i].querySelector('figure')
    //     const caption = preview[i].querySelector('figcaption')
    //     const img = preview[i].querySelector('img')
    //   if (!preview[i].classList.contains('fullscreen') && e.target === img) {
    //       preview[i].classList.add('fullscreen')
    //       menuBtn.style.display = 'none'
    //       fade(figure, true, 40)
    //     }
    //     if (preview[i].classList.contains('fullscreen') && (e.target !== img && e.target !== caption && e.target !== figure)) {
    //       preview[i].classList.remove('fullscreen')
    //       menuBtn.style.display = 'block'
    //     }
    //   })
    // }

}
