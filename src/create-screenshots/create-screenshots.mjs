/**
 * Using puppeteer, create screenshots of the core colors
 */

import {ViewPort8k} from "##/lib/pupp-consts/viewPortsConstants.mjs";

/**
 * Defaults for CreateScreenshots
 * or use a getter / _defaults
 */
export const DefaultsCreateScreenshots = function(){
  return {
    // viewPort:ViewPort8k,

  }
}();
console.log(DefaultsCreateScreenshots);

/**
 * Viewport might be common to change... so
 */
export class CreateScreenshots{
  constructor(coreColors, browser, viewPort={...ViewPort8k}, options) {
    // const actual = {coreColors,browser,options}
    this.coreColors = coreColors;
    this.browser = browser;
    this.viewPort = viewPort;
    this.options = {...DefaultsCreateScreenshots,...options};
  }

}
export default {CreateScreenshots}