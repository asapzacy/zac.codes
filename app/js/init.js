import WebFont from 'webfontloader'

export const loadFonts = () => {
  WebFont.load({
    google: {
      families: [ 'Yellowtail' ],
      text: 'Welcome'
    },
    classes: false,
    active() { document.getElementById('app').classList.add('ready') }
  })
}
