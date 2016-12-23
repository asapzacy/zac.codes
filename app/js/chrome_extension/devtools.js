// chrome dev tools
window.z = {
  phones: {
    iphone5: { w:320,h:568 },
    galaxy: { w:360,h:640 },
    iphone6: { w:375,h:667 },
    iphone6plus: { w:414,h:736 }
  },
  tablets: {
    surface2: { w:720,h:1280 },
    ipad: { w:768,h:1024 },
    galaxy: { w:800,h:1280 },
    ipadpro: { w:1024,h:1366 },
    surface3: { w:1024,h:1440 }
  },
  widths: {
    100: { w:100 },
    200: { w:200 },
    300: { w:300 },
    400: { w:400 },
    500: { w:500 },
    600: { w:600 },
    700: { w:700 },
    800: { w:800 },
    900: { w:900 },
    1000: { w:1000 },
    1100: { w:1100 },
    1200: { w:1200 },
    1300: { w:1300 },
    1400: { w:1400 },
    1500: { w:1500 },
    1600: { w:1600 },
    1700: { w:1700 },
    1800: { w:1800 },
    1900: { w:1900 },
    2000: { w: 2000 }
  },
  heights: {
    100: { h:100 },
    200: { h:200 },
    300: { h:300 },
    400: { h:400 },
    500: { h:500 },
    600: { h:600 },
    700: { h:700 },
    800: { h:800 },
    900: { h:900 },
    1000: { h:1000 },
    1100: { h:1100 },
    1200: { h:1200 }
  },
  basic: {
    iphone: { w:375,h:667 }
  },
  open(w=375,h=667) {
    const windowLeft = (window.screen.availWidth - w) / 2
    const windowTop = (window.screen.availHeight - h) / 2
    window.open(location.href,'window',`directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=${w},height=${h},left=${windowLeft},top=${windowTop}`)
  },
  resize(obj={w:375,h:667}, portrait=true) {
    const offset = window.outerHeight - window.innerHeight
    portrait ? window.resizeTo(obj.w, obj.h+offset) : window.resizeTo(obj.h, obj.w+offset)
  },
  play(obj, speed=1) {
    let i = 0
    for (let item in obj) {
      if (obj.hasOwnProperty(item)) {
        i++
        obj[item].w = obj[item].w || window.screen.availWidth
        obj[item].h = obj[item].h || window.screen.availHeight
        const windowLeft = (window.screen.availWidth - obj[item].w) / 2
        const windowTop = (window.screen.availHeight - obj[item].h) / 2
        setTimeout(function() {
          console.log(`width: ${obj[item].w}${' '.repeat(12 - String(obj[item].w).length)}|${' '.repeat(9)}height: ${obj[item].h}${' '.repeat(12 - String(obj[item].h).length)}|${' '.repeat(9)}${item}`)
          window.resizeTo(obj[item].w,obj[item].h)
          window.moveTo(windowLeft, windowTop)
        }, i * (speed * 1000))
      }
    }
  },
  reset() {
    this.resize({ w:375,h:667 })
  },
  test(obj) {
    const name = obj.iphone
    let width = name.w
    let height = name.h
    const screenWidth = screen.availWidth
    const screenHeight = screen.availHeight
    let i = 0
    while (width < screenWidth || height < screenHeight) {
      i++
      width += 20
      height += 20
      const windowLeft = (screenWidth - width) / 2
      const windowTop = (screenHeight - height) / 2
      const defaultSpace = ' '.repeat(10)
      const widthSpace = ' '.repeat(12 - String(width).length)
      const heightSpace = ' '.repeat(12 - String(height).length)
      setTimeout(function() {
        console.log(`width: ${width}${widthSpace}|${defaultSpace}height: ${height}${heightSpace}|${defaultSpace}${name}`)
        window.moveTo(windowLeft, windowTop)
        window.resizeBy(width,height)
      }, i * 500)
    }
  }
}

const play = document.createElement('span')
play.textContent = 'z'
play.setAttribute('style','position:fixed;bottom:0;right:0;color:white;background:mediumseagreen;cursor:pointer;font-size:16px;padding:8px 24px;z-index:999')
document.body.appendChild(play)
play.addEventListener('click', function() { z.play(z.widths) })
