// Allow to calculate the clamp() css function to help with the responsiveness
// https://css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport/

function clamp(minFontSize, maxFontSize, minScreenSize, maxScreenSize){
    let minWidthRem = minScreenSize / 16;
    let maxWidthRem = maxScreenSize / 16;
    let slope = (maxFontSize - minFontSize) / (maxWidthRem - minWidthRem);
    let yAxis = -minWidthRem * slope + minFontSize;
    let output = {yAxis: yAxis, slopeVw: slope * 100}
    console.log(output)
    // return output
}

export default clamp