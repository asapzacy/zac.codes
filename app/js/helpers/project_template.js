
export const formatImgFile = (img) => {
  let result = ''
  if (img.includes(' ')) {
    result = img.toLowerCase().split(' ').join('-')
  } else {
    result = img
  }
  return result
}
