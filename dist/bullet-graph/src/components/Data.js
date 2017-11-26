import React from 'react'
import Bar from './Bar'
import { quartileProps, actualValueProps, targetValueProps } from '../helpers/props'

export default function Data({ good, average, poor, actual, target, height, fills }) {
  return (
    <g>
      <Bar {...quartileProps(good, good, height, fills[0])} />
      <Bar {...quartileProps(average, good, height, fills[1])} />
      <Bar {...quartileProps(poor, good, height, fills[2])} />
      <Bar {...actualValueProps(actual, good, height, fills[4])} />
      <Bar {...targetValueProps(target, good, height, fills[4])} />
    </g>
  )
}
