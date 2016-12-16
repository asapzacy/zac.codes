// chrome dev tools
window.d = {
  phones: {
    iphone5: { w:320,h:568 },
    galaxy: { w:360,h:640 },
    iphone6: { w:375,h:667 },
    iphone6plus: { w:414,h:736 }
  },
  tabs: {
    surface2: { w:720,h:1280 },
    ipad: { w:768,h:1024 },
    galaxy: { w:800,h:1280 },
    ipadpro: { w:1024,h:1366 },
    surface3: { w:1024,h:1440 }
  },
  open(w=375,h=667) {
    const windowLeft = (window.screen.availWidth - w) / 4
    const windowTop = (window.screen.availHeight - h) / 2
    window.open(location.href,'window',`directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=${w},height=${h},left=${windowLeft},top=${windowTop}`)
  },
  resize(obj, portrait=true) {
    const offset = window.outerHeight - window.innerHeight
    portrait ? window.resizeTo(obj.w, obj.h+offset) : window.resizeTo(obj.h, obj.w+offset)
  },
  loop(obj, speed=1) {
    let i = 0
    for (let item in obj) {
      if (obj.hasOwnProperty(item)) {
        i++
        setTimeout(function() {
          console.log(`width: ${obj[item].w}    |   height: ${obj[item].h}      | ${item}`)
          window.resizeTo(obj[item].w,obj[item].h)
        }, i * (speed * 1000))
      }
    }
  }





}
