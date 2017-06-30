import runLandingPage from './views/landing'
import runAboutPage from './views/about'
import runProjectsPage from './views/projects'
import { findArea, fadeIn } from './utils'

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

const removeOldPage = (el) => {
  el.removeChild(el.querySelector('.page'))
  console.log(el)
}

const createNewPage = (text) => {
  const html = document.createElement('html')
  html.innerHTML = text
  return {
    content: html.querySelector('.page'),
    meta: {
      title: html.getElementsByTagName('title')[0].textContent,
      desc: html.getElementsByTagName('meta')['description'].content
    }
  }
}

const insertNewPage = (el, child) => {
  child.style.opacity = 0
  el.appendChild(child)
  fadeIn(child, 440, 220)
}

const updatePageInfo = ({ title, desc }) => {
  document.title = title
  document.getElementsByTagName('meta')['description'].content = desc

}

// update + fade in new page on url change
export const updatePage = () => {
  const url = window.location.href
  const main = document.querySelector('main')
  removeOldPage(main)
  loadPage(url).then(responseText => {
    const newPageInfo = createNewPage(responseText)
    insertNewPage(main, newPageInfo.content)
    updatePageInfo(newPageInfo.meta)
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
    .then(response => {
      if (response.ok) {
        cache[url] = response.text()
        return cache[url]
      } else {
        console.error('network response was not ok.')
      }
    })
    .catch(err => {
      console.error(`there has been an error requesting (${url}): ${err.message}`)
    })
}

// update page anytime history api is changed
window.addEventListener('popstate', updatePage)
