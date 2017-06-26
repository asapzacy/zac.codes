import runLandingPage from './views/landing'
import runAboutPage from './views/about'
import runProjectsPage from './views/projects'
import { findArea } from './utils'

// fetch polyfill for mobile devices
require('es6-promise').polyfill()
require('isomorphic-fetch')

// run functions specific to page
export const runNewFunctions = () => {
  const path = window.location.pathname
  window.removeEventListener('resize', findArea)
  if (path === '/' || path === '/index.html') {
    runLandingPage()
  } else if (path.startsWith('/about')) {
    runAboutPage()
  } else if (path.startsWith('/projects')) {
    runProjectsPage()
  }
}

// update + fade in new page on url change
export const updatePage = () => {
  const url = window.location.href
  loadPage(url).then((responseText) => {
    const container = document.createElement('html')
    container.innerHTML = responseText
    const oldPage = document.querySelector('.page')
    const newPage = container.querySelector('.page')
    const newTitle = container.getElementsByTagName('title')[0].textContent
    const newDesc = container.getElementsByTagName('meta')['description'].content
    oldPage.parentNode.replaceChild(newPage, oldPage)
    document.title = newTitle
    document.getElementsByTagName('meta')['description'].content = newDesc
    // fadeIn(newPage)
    runNewFunctions()
  })
}

// fetch + load new url + cache new content
const cache = {}
function loadPage(url) {
  if (cache[url]) {
    return Promise.resolve(cache[url])
  }
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        cache[url] = response.text()
        return cache[url]
      } else {
        console.error('network response was not ok.')
      }
    })
    .catch((err) => console.error(`there has been an error requesting (${url}): ${err.message}`))
}

// update page anytime history api is changed
window.addEventListener('popstate', updatePage)
