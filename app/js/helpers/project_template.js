export const formatImgFile = img => {
  let result = img.split(' ')
  if (result.length > 1) {
    result = result.join('-').toLowerCase()
  } else {
    result = result.join('')
  }
  return result
}
