// chrome dev tools 2
window.x = {
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
  reset() {
    this.resize({ w:375,h:667 })
  }
}

const play = document.createElement('span')
play.textContent = 'x'
play.setAttribute('style','position:fixed;bottom:0;right:0;color:white;background:mediumseagreen;cursor:pointer;font-size:16px;padding:8px 24px;z-index:999')
document.body.appendChild(play)
play.addEventListener('click', function() { x.reset() })
