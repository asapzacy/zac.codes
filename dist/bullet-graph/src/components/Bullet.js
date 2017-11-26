import React from 'react'
import Graph from './Graph'
import Title from './Title'

export default function Bullet({ title, subtitle, ...props }) {
  return (
    <li className='bullet'>
      <Title title={title} subtitle={subtitle} />
      <Graph {...props} />
    </li>
  )
}
