
//  get bar width + height --> <Bar /> component
export const getBarWidth = (width, fullWidth) => (width / fullWidth) === 0 ? 0 : `${(width / fullWidth) * 100}%`
export const getBarHeight = (height, fullHeight) => fullHeight * height

//  get X + Y position --> <Bar />, <Interval />, <Line />, <Text /> components
export const getXPosition = (barWidth, fullWidth) => (barWidth / fullWidth) === 0 ? 0 : `${(barWidth / fullWidth) * 100}%`
export const getYPosition = (barHeight, fullHeight) => (fullHeight - barHeight) / 2
