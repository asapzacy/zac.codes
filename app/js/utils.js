// timing functions [ from github -- https://gist.github.com/gre/1650294 ]
const linear = (t) => t
const easeInQuad = (t) => t*t
const easeOutQuad = (t) => t*(2-t)
const easeInOutQuad = (t) => t<.5 ? (2*t*t) : (-1+(4-2*t)*t)
const easeInCubic = (t) => t*t*t
const easeOutCubic = (t) => (--t)*t*t+1
const easeInOutCubic = (t) => t<.5 ? (4*t*t*t) : ((t-1)*(2*t-2)*(2*t-2)+1)
const easeInQuart = (t) => t*t*t*t
const easeOutQuart = (t) => 1-(--t)*t*t*t
const easeInOutQuart = (t) => t<.5 ? (8*t*t*t*t) : (1-8*(--t)*t*t*t)

// scroll-to-top of element.
export const scrollToTop = (el, duration = 1200) => {
  const bottom = el.scrollHeight
  const start = Date.now()
  const scroll = () => {
    const now = Date.now()
    const time = (now - start) / duration
     const easing = easeOutQuart(time)
    el.scrollTop = (easing * (0 - bottom)) + bottom
    if (el.scrollTop === 0) return
    requestAnimationFrame(scroll)
  }
  scroll()
}

// fade-in element
export const fadeIn = (el, duration = 1200) => {
  el.style.opacity = 0
  const bottom = 1
  const start = Date.now()
  const fade = () => {
    const now = Date.now()
    const time = (now - start) / duration
    const easing = easeInQuart(time)
    el.style.opacity = easing
    if (el.style.opacity > 0.995) {
      el.style.opacity = 1
      return
    }
    requestAnimationFrame(fade)
  }
  fade()
}

// fade-out element
export const fadeOut = (el, duration = 1200) => {
  el.style.opacity = 1
  const start = Date.now()
  const fade = () => {
    const now = Date.now()
    const time = 1 - ((now - start) / duration)
    const easing = easeOutQuart(time)
    el.style.opacity = easing
    if (el.style.opacity < 0.005) {
      el.style.opacity = 0
      return
    }
    requestAnimationFrame(fade)
  }
  fade()
}

export const findArea = () => {
  const code = document.querySelector('.js-pixels')
  const pixels = () => {
    if (code && code.textContent !== null) {
      let area = window.innerWidth * window.innerHeight
      code.textContent = area.toLocaleString()
    }
  }
  requestAnimationFrame(pixels)
}
