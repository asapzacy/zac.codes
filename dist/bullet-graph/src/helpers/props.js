
import { getBarWidth, getBarHeight, getXPosition, getYPosition } from './utils'

//  return props object for quartile <Bar />'s  --> [good, average, poor]
export const quartileProps = (width, maxWidth, maxHeight, fill) => {
  return {
    x: 0,
    y: 0,
    width: getBarWidth(width, maxWidth),
    height: getBarHeight(maxHeight, 1),
    fill
  }
}

//  return props object for actual <Bar />  --> [actual]
export const actualValueProps = (width, maxWidth, maxHeight, fill) => {
  const barHeight = getBarHeight(maxHeight, 0.25)
  return {
    x: 0,
    y: getYPosition(barHeight, maxHeight),
    width: getBarWidth(width, maxWidth),
    height: barHeight,
    fill
  }
}

//  return props object for target <Bar />  --> [target]
export const targetValueProps = (width, maxWidth, maxHeight, fill) => {
  const barHeight = getBarHeight(maxHeight, 0.7)
  return {
    x: getXPosition(width, maxWidth),
    y: getYPosition(barHeight, maxHeight),
    width: 5,
    height: barHeight,
    fill
  }
}

//  return props object for axis interval <Line />  --> [step]
export const lineProps = (width, height, step) => {
  const xPosition = getXPosition(step, width)
  return {
    x: xPosition,
    y1: height,
    x2: xPosition,
    y2: height + 15,
    strokeWidth: 2,
    stroke: 'black'
  }
}

//  return props object for axis interval <Text />  --> [step]
export const textProps = (width, height, step, percentage) => {
  const xPosition = getXPosition(step, width)
  return {
    x: xPosition,
    y: height + 35,
    text: step.toLocaleString(),
    textAnchor: 'middle',
    percentage
  }
}
