import React from 'react'
import Data from './Data'
import Axis from './Axis'

export default function Graph(props) {
  return (
    <section className='graphContainer'>
      <svg className='graph' width='100%' height={props.height * 2} xmlns='http://www.w3.org/2000/svg'>
        <Data {...props} />
        <Axis {...props} width={props.good} height={props.height} />
      </svg>
    </section>
  )
}
