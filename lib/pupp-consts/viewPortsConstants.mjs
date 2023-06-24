/**
 * Easy reference for varous viewports
 */

/* 16 by 10 */
export const ViewPort4k =     {
  width: 3840,//this takes a while to run though...
  height: 2400,
  deviceScaleFactor: 1,
}
/**
 * 4k 16 by 10 - Pixel density 2 though...?
 * @type {{width: number, deviceScaleFactor: number, height: number}}
 */
export const ViewPort8k =     {
  ...ViewPort4k,
  deviceScaleFactor: 2,//makes it 7680x4800, pixel density?
}

/* 16 by 9 */
export const ViewPort1080p =     {
  width: 1920,//this takes a while to run though...
  height: 1080,
  deviceScaleFactor: 1,
}
export default {ViewPorts4k: ViewPort4k,ViewPorts8k: ViewPort8k,ViewPorts1080p: ViewPort1080p}