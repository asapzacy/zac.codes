import React from 'react'
import { render } from 'react-dom'
import App from '../containers/AppContainer'

it('renders without crashing', () => {
  const div = document.createElement('div')
  render(<AppContainer />, div)
})
