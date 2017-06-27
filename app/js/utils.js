
//  timing functions  --  source: https://gist.github.com/gre/1650294
const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
const easeOutQuart = (t) => 1 - (--t) * t * t * t
const easeInQuart = (t) => t * t * t * t

// scroll-to-top of element.
export const scrollToTop = (el, duration = 1200) => {
  const bottom = el.scrollHeight
  const start = Date.now()
  const scroll = () => {
    const now = Date.now()
    const time = (now - start) / duration
    const easing = easeInOutCubic(time)
    el.scrollTop = (easing * (0 - bottom)) + bottom
    if (el.scrollTop === 0) return
    requestAnimationFrame(scroll)
  }
  scroll()
}

// fade-in element
export const fadeIn = (el, duration = 1200, delay = 880) => {
  setTimeout(() => {
    el.style.opacity = 0
    const start = Date.now()
    const fade = () => {
      const now = Date.now()
      const time = (now - start) / duration
      const easing = easeInQuart(time)
      el.style.opacity = easing
      if (el.style.opacity > 0.9999) {
        el.style.opacity = 1
        return
      }
      requestAnimationFrame(fade)
    }
    fade()
  }, delay)
}

// fade-out element
export const fadeOut = (el, duration = 1200, delay = 0) => {
  setTimeout(() => {
    el.style.opacity = 1
    const start = Date.now()
    const fade = () => {
      const now = Date.now()
      const time = 1 - ((now - start) / duration)
      const easing = easeOutQuart(time)
      el.style.opacity = easing
      if (el.style.opacity < 0.0001) {
        el.style.opacity = 0
        return
      }
      requestAnimationFrame(fade)
    }
    fade()
  }, delay)
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

export const lazyLoad = (arr) => {
  arr.forEach(img => {
    img.setAttribute('src', img.getAttribute('data-src'))
    img.addEventListener('load', () => {
      img.removeAttribute('data-src')
    })
  })
}
