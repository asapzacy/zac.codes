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
    const easing = easeInOutCubic(time)
    el.scrollTop = (easing * (0 - bottom)) + bottom
    if (el.scrollTop === 0) return
    requestAnimationFrame(scroll)
  }
  scroll()
}

// old scrollToTop function
// export const scrollToTop = (el) => {
//   el.addEventListener('click', function() {
//     requestAnimationFrame(scroll)
//   })
//   const scroll = () => {
//     if (el.parentNode.scrollTop > 0) {
//       el.parentNode.scrollTop = el.parentNode.scrollTop - 10
//       requestAnimationFrame(scroll)
//     }
//   }
//   scroll()
// }

// fade out any element + remove node
export const fadeOut = (el) => {
  el.style.opacity = 1
  const fade = () => {
    if (el.style.opacity < 0) {
      el.parentNode.removeChild(el)
    } else {
      el.style.opacity = +el.style.opacity - 0.01
      requestAnimationFrame(fade)
    }
  }
  fade()
}

// fade in any element
export const fadeIn = (el) => {
  el.style.opacity = 0
  const fade = () => {
    if (el.style.opacity < 1) {
      el.style.opacity = +el.style.opacity + 0.01
      requestAnimationFrame(fade)
    }
  }
  fade()
}
