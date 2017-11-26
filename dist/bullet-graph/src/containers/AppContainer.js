import React, { Component } from 'react'
import Header from '../components/Header'
import Bullet from '../components/Bullet'
import ColorMenu from '../components/ColorMenu'
import { financials } from '../helpers/data.js'
import { colors } from '../helpers/fills.js'
import '../styles/main.css'

class AppContainer extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      fills: [],
      color: '',
      height: 0
     }
     this.switchColor = this.switchColor.bind(this)
     this.pickRandomColor = this.pickRandomColor.bind(this)
  }
  componentDidMount() {
    const randomColor = this.pickRandomColor(financials)
    this.setState({
      data: financials,
      fills: colors[randomColor],
      color: randomColor,
      height: 50
    })
  }
  pickRandomColor(obj) {
    const randomKey = Math.floor(Math.random() * Object.keys(colors).length)
    return Object.keys(colors)[randomKey]
  }
  switchColor(newColor) {
    this.setState({
      fills: colors[newColor],
      color: newColor
    })
  }
  render() {
    return (
      <div className='appContainer'>
        <Header />
        <ul className='bulletList'>
          { this.state.data.map(item => <Bullet {...item} fills={this.state.fills}  height={this.state.height} key={item.id} />) }
        </ul>
        <ColorMenu switchColor={this.switchColor} pickRandomColor={this.pickRandomColor} color={this.state.color} fills={this.state.fills} />
    </div>
    )
  }
}

export default AppContainer
