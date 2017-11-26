import React from 'react'

export default function Bar({ x, y, width, height, fill }) {
  return (
    <rect className='bar' x={x} y={y} width={width} height={height} fill={fill} />
  )
}
