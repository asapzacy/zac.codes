import React from 'react'

export default function Title({ title, subtitle }) {
  return (
    <section className='titleContainer'>
      <h1 className='title'>{title}</h1>
      <h2 className='subtitle'>{subtitle}</h2>
    </section>
  )
}
