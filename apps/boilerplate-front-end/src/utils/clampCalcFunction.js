// Allow to calculate the clamp() css function to help with the responsiveness
// https://css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport/

function clamp(minFontSizeRem, maxFontSizeRem, minScreenSize, maxScreenSize) {
  let minWidthRem = minScreenSize / 16
  let maxWidthRem = maxScreenSize / 16
  let slope = (maxFontSizeRem - minFontSizeRem) / (maxWidthRem - minWidthRem)
  let yAxis = -minWidthRem * slope + minFontSizeRem
  return `clamp(${minFontSizeRem}rem, ${yAxis}rem + ${
    slope * 100
  }vw, ${maxFontSizeRem}rem);`
}

export default clamp

