import React from 'react'

export default function Text({ x, y, text, textAnchor, percentage }) {
  return (
    <text x={x} y={y} textAnchor={textAnchor}>{text}{ percentage && '%' }</text>
  )
}
