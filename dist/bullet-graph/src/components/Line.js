import React from 'react'

export default function Line({ x, y1, x2, y2, strokeWidth, stroke }) {
  return (
      <line x1={x} y1={y1} x2={x} y2={y2} strokeWidth={strokeWidth} stroke={stroke} />
  )
}
