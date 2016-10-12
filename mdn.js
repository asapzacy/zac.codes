
var e = document.getElementById('watchme')
e.addEventListener('animationstart', listener, false)
e.addEventListener('animationend', listener, false)
e.addEventListener('animationiteration', listener, false)
e.className = 'slidein'


function listener(e) {
  var l = document.createElement('li')
  switch(e.type) {
    case 'animationstart':
      l.innerHTML = `started: elapsed time is ${e.elapsedTime}`
      break
    case 'animationend':
      l.innerHTML = `ended: elapsed time is ${e.elapsedTime}`
      break
    case 'animationiteration':
      l.innerHTML = `new loop started at time ${e.elapsedTime}`
      break
  }
  document.getElementById('output').appendChild(l)
}






.slidein {
  animation-duration:3s;
  animation-name:slidein;
  animation-iteration-count:10;
  animation-direction:alternate;
}
@keyframes slidein {
  from {
    margin-left:80%;
    width:240%
  }
  to {
    margin-left:0%;
    width:80%;
  }
}


<h1 id="watchme">watch me !</h1>
<p>this shows how to make css animations <code>h1</code>. . . </p>
<p>and we output some text. . . </p>
<ul id="output"></ul>
















<div id="example">hi</div>


var start = null
var el = document.getElementById('example')
el.style.position = 'absolute'

function step(timestamp) {
  if (!start) start = timestamp
  var progress = timestamp - start
  el.style.left = `${Math.min(progress / 10, 200)}px`
  if (progress < 2000) {
    window.requestAnimationFrame(step)
  }
}

window.requestAnimationFrame(step)
