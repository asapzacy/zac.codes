import React from 'react'
import Line from './Line'
import Text from './Text'
import { lineProps, textProps } from '../helpers/props'

export default function Interval({ width, height, percentage, step }) {
  return (
    <g>
      <Line {...lineProps(width, height, step)} />
      <Text {...textProps(width, height, step, percentage)} />
    </g>
  )
}
