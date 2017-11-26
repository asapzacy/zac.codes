import React from 'react'

export default function ColorMenu({ switchColor, pickRandomColor, color, fills }) {
  const textColor = (checkColor) => ({ color:checkColor === color ? fills[3] : 'inherit' })
  const randomColor = () => {
    let random = pickRandomColor()
    while (random === color) {
      random = pickRandomColor()
    }
    console.log(color === random)
    return random
  }
  return (
    <menu className='colorMenu'>
      <ul className='colorList'>
        <li className='colorItem' style={textColor('default')} onClick={() => switchColor('default')}>{'default'}</li>
        <li className='colorItem' style={textColor('red')} onClick={() => switchColor('red')}>{'red'}</li>
        <li className='colorItem' style={textColor('purple')} onClick={() => switchColor('purple')}>{'purple'}</li>
        <li className='colorItem' style={textColor('blue')} onClick={() => switchColor('blue')}>{'blue'}</li>
        <li className='colorItem' style={textColor('teal')} onClick={() => switchColor('teal')}>{'teal'}</li>
        <li className='colorItem' style={textColor('green')} onClick={() => switchColor('green')}>{'green'}</li>
        <li className='colorItem' style={textColor('yellow')} onClick={() => switchColor('yellow')}>{'yellow'}</li>
        <li className='colorItem' style={textColor('orange')} onClick={() => switchColor('orange')}>{'orange'}</li>
        <li className='colorItem' onClick={() => switchColor(randomColor())}>{'random'}</li>
      </ul>
    </menu>
  )
}
