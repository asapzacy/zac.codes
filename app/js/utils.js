// timing functions [ from github -- https://gist.github.com/gre/1650294 ]
// no easing, no acceleration
const linear = (t) => t
// accelerating from zero velocity
const easeInQuad = (t) => t*t
// decelerating to zero velocity
const easeOutQuad = (t) => t*(2-t)
// acceleration until halfway, then deceleration
const easeInOutQuad = (t) => t<.5 ? (2*t*t) : (-1+(4-2*t)*t)
// accelerating from zero velocity
const easeInCubic = (t) => t*t*t
// decelerating to zero velocity
const easeOutCubic = (t) => (--t)*t*t+1
// acceleration until halfway, then deceleration
const easeInOutCubic = (t) => t<.5 ? (4*t*t*t) : ((t-1)*(2*t-2)*(2*t-2)+1)
// accelerating from zero velocity
const easeInQuart = (t) => t*t*t*t
// decelerating to zero velocity
const easeOutQuart = (t) => 1-(--t)*t*t*t
// acceleration until halfway, then deceleration
const easeInOutQuart = (t) => t<.5 ? (8*t*t*t*t) : (1-8*(--t)*t*t*t)


// new scrollToTop function
export const scrollToTop = (el, duration = 600) => {
  const bottom = el.scrollTop
  const start = Date.now()
  const scroll = () => {
    const now = Date.now()
    const time = (now - start) / duration
    console.log(`time: ${time}`)
    const easing = easeOutQuart(time)
    console.log(`easing: ${easing}`)
    el.scrollTop = (easing * (0 - bottom)) + bottom
    if (el.scrollTop === 0) return
    requestAnimationFrame(scroll)
  }
  scroll()
}

// fade in any element
export const fadeIn = (el, duration = 1600) => {
  el.style.opacity = 0
  const start = Date.now()
  const fade = () => {
    const now = Date.now()
    const time = (now - start) / duration
    const easing = easeInQuart(time)
    el.style.opacity = easing
    if (el.style.opacity > 1) el.style.opacity = 1
    requestAnimationFrame(fade)
  }
  fade()
}

// fade out any element + remove node
export const fadeOut = (el, duration = 1600) => {
  el.style.opacity = 1
  const start = Date.now()
  const fade = () => {
    const now = Date.now()
    const time = (now - start) / duration
    const easing = easeOutQuart(time)
    el.style.opacity = easing
    if (el.style.opacity < 0) el.parentNode.removeChild(el)
    requestAnimationFrame(fade)
  }
  fade()
}
