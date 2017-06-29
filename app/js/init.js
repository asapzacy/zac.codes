import WebFont from 'webfontloader'

export const loadFonts = () => {
  WebFont.load({
    custom: {
      families: [ 'Yellowtail' ],
      urls: [ '/assets/fonts/font.css' ]
    },
  // WebFont.load({
  //   google: {
  //     families: [ 'Yellowtail' ],
  //     text: 'Welcome'
  //   },
    // classes: false,
    active() {
      document.getElementById('app').classList.add('ready')
    }
  })
}

export const checkBrowser = () => {
  console.log('go')
  if ('ontouchstart' in document.documentElement) {
    console.log('hi')
    const app = document.getElementById('app')
    document.getElementById('app').style.backgroundColor = 'dodgerblue'
    // document.getElementById('app').backgroundColor = 'mediumseagreen !important'
    // document.getElementById('app').display = 'none'
    // const styles = window.getComputedStyle(document.getElementById('app'))
    // console.log(styles)
  }
}

export const loadBgImage = () => {
  const img = new Image()
  img.addEventListener('load', () => {
    setTimeout(() => {
      // document.querySelector('footer').style.transform = 'translateY(0)'
      // document.getElementById('app').classList.add('bgLoaded')
    }, 440)
  })
  img.src = '/assets/img/mountains.svg'
}
//
// export const loadBgImage = () => {
//   document.querySelector('footer').style.backgroundImage = url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjkzIiBoZWlnaHQ9IjQ5MCIgdmlld0JveD0iMCAwIDY5MyA0OTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHRpdGxlPmRpYW1vbmRzX2FuZF9iYWNrZ3JvdW5kPC90aXRsZT48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik0zNDUgNDkwTDY5Mi43NDQgMEguMDMyeiIvPjxwYXRoIGZpbGw9IiM0RjFFQ0IiIGQ9Ik01MTkgODNsLTM0IDQ4LTIzLjI4MyAzMyA1Ni44OSA4MC45OTZMNTc2LjI2NCAxNjR6Ii8+PHBhdGggZmlsbD0iIzhBNjlEQyIgZD0iTTUxOSAxMjNsLTI1IDM2LTE4LjEzMiAyNS4wMDYgNDIuNzYyIDYxLjAwN0w1NjEuOTkgMTg0eiIvPjxwYXRoIGZpbGw9IiNEOENERjMiIGQ9Ik01MTkgMTYybC0xNyAyNS0xMi4wOTIgMTcgMjguNyA0MC45N0w1NDcuNzg5IDIwNHoiLz48cGF0aCBmaWxsPSIjNEYxRUNCIiBkPSJNMTczIDgzbC0zNCA0OC0yMy4zNzIgMzMgNTcuMjE0IDgwLjkzNiA1Ny4yMTQtODAuNjA0eiIvPjxwYXRoIGZpbGw9IiM4QTY5REMiIGQ9Ik0xNzMgMTIzbC0yNSAzNi0xOC4yMiAyNSA0Mi44NTggNjAuNzA1TDIxNS45ODggMTg0eiIvPjxwYXRoIGZpbGw9IiNEOENERjMiIGQ9Ik0xNzMgMTYybC0xNyAyNS0xMi4wOTggMTcgMjguOTA2IDQwLjc5MkwyMDEuNzE0IDIwNHoiLz48cGF0aCBmaWxsPSIjNEYxRUNCIiBkPSJNMzQ2IDBMMjQ0IDE0NWwtNzEuMTk2IDEwMEwzNDUgNDkwbDE3My41NjEtMjQ1eiIvPjxwYXRoIGZpbGw9IiM4QTY5REMiIGQ9Ik0yMDkuMzc0IDI5N0wzNDUgNDkwbDEzNi42ODItMTkzTDM0NSAxMDR6Ii8+PHBhdGggZmlsbD0iI0Q4Q0RGMyIgZD0iTTM0NSAyMTJsLTk3LjY2IDEzOUwzNDUgNDkwbDk4LjM2NS0xMzl6Ii8+PC9nPjwvc3ZnPg==)
// }
