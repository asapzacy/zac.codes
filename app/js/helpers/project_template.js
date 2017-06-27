
export const formatImgFile = (img) => {
  if (img.includes(' ')) {
    return img.toLowerCase().split(' ').join('-')
  } else {
    return img
  }
}
