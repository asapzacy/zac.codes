import WebFont from 'webfontloader'

export const loadFonts = () => {
  WebFont.load({
    custom: {
      families: ['Yellowtail'],
      urls: ['/assets/fonts/font.css']
    },
    classes: false,
    active() {
      const app = document.getElementById('app')
      app.querySelector('footer').style.transform = 'translateY(0)'
      setTimeout(() => app.classList.add('ready'), 440)
    },
    inactive() {
      this.active()
    }
  })
}
