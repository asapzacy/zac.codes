
// landing page functions
export default function runLandingPage() {
  (function() {

    // pixels^2 + findArea function
    const findArea = () => {
      const code = document.querySelector('.js_pixels')
      const pixels = () => {
        if (code && code.textContent !== null) {
          let area = window.innerWidth * window.innerHeight
          code.textContent = area.toLocaleString()
        }
      }
      requestAnimationFrame(pixels)
    }

    findArea()
    window.addEventListener('resize', findArea)

  })()
}
