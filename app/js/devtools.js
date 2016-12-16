// chrome dev tools
window.phones = {
  'iphone5': { w:320,h:568 },
  'galaxy': { w:360,h:640 },
  'iphone6': { w:375,h:667 },
  'iphone6plus': { w:414,h:736 }
}
window.tabs = {
  'surface2': { w:720,h:1280 },
  'ipad': { w:768,h:1024 },
  'galaxy': { w:800,h:1280 },
  'ipadpro': { w:1024,h:1366 },
  'surface3': { w:1024,h:1440 }
}

window.updateWindow = (obj, portrait=true) => {
  portrait
    ? window.resizeTo(obj.w,obj.h+22)
    : window.resizeTo(obj.h,obj.w+22)
}
window.loopWindows = (obj, speed=1) => {
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






//
// // chrome dev tools
// window.dev = {
//   phones: {
//     'iphone5': { w:320,h:568 },
//     'galaxy': { w:360,h:640 },
//     'iphone6': { w:375,h:667 },
//     'iphone6plus': { w:414,h:736 }
//   },
//   tabs: {
//     'surface2': { w:720,h:1280 },
//     'ipad': { w:768,h:1024 },
//     'galaxy': { w:800,h:1280 },
//     'ipadpro': { w:1024,h:1366 },
//     'surface3': { w:1024,h:1440 }
//   },
//   updateWindow(obj, portrait=true) {
//     portrait
//       ? window.resizeTo(obj.w,obj.h+22)
//       : window.resizeTo(obj.h,obj.w+22)
//   },
//   loopWindows(obj, speed=1) {
//     let i = 0
//     for (let item in obj) {
//       if (obj.hasOwnProperty(item)) {
//         i++
//         setTimeout(function() {
//           console.log(`width: ${obj[item].w}    |   height: ${obj[item].h}      | ${item}`)
//           window.resizeTo(obj[item].w,obj[item].h)
//         }, i * (speed * 1000))
//       }
//     }
//   }
// }
//
