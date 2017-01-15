import runLandingPage from './landing'
import runAboutPage from './about'
import runProjectsPage from './projects'
import { fadeIn } from './utils'

// fetch polyfill for mobile devices
require('es6-promise').polyfill()
require('isomorphic-fetch')

// run functions specific to page
// TODO: removeEventListener('resize', findArea) when not on landing page
export const runNewFunctions = () => {
  const path = window.location.pathname
  if (path === '/' || path === '/index.html') {
    runLandingPage()
  } else if (path.startsWith('/about')) {
    runAboutPage()
  } else if (path.startsWith('/projects')) {
    runProjectsPage()
  } else {
    console.log('fix me')
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
    fadeIn(newPage)
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
        console.log('network response was not ok.')
      }
    })
    .catch((err) => console.log(`there has been an error requesting (${url}): ${err.message}`))
}

// update page anytime history api is changed
window.addEventListener('popstate', updatePage)
