import React from 'react'
import Interval from './Interval'

export default function Axis({ height, width, steps, percentage }) {
  const intervals = () => {
    const arr = []
    const interval = width / (steps - 1)
    let i = 0
    while (i <= width) {
      arr.push(i)
      i += interval
    }
    return arr
  }
  return (
    <g>
      { intervals().map((item, index) => <Interval width={width} height={height} percentage={percentage} step={item} key={index} />) }
    </g>
  )
}
