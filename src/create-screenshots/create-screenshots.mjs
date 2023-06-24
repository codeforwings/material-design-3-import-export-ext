/**
 * Using puppeteer, create screenshots of the core colors
 */

import {ViewPort8k} from "##/lib/pupp-consts/viewPortsConstants.mjs";
import {DefaultCoreColors} from "##/lib/materialDesignThemeColorConstants.mjs";

/**
 * Defaults for CreateScreenshots
 * or use a getter / _defaults
 */
/**
 * todo add typedef
 * @type {{outFolderPath: string}}
 */
export const DefaultsCreateScreenshots = function(){
  return {
    outFolderPath:"temp/create-screenshots",//assuming folder assists atm.


  }
}();
// viewPort:ViewPort8k,
//browser
//coreColors
// console.log(DefaultsCreateScreenshots);

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

  /**
   *
   */
  static runSample(){

  }

}

/**
 * Converts the coreColor to a string file name
 * @param coreColor {MaterialThemeCoreColors}
 * @param fileNamePrefix {string}
 * @return {{light: string, dark: string}} - file names
 * @example
 * const inputColor = DefaultCoreColors
 * const {light,dark} = generateScreenshotsFileNames(inputColor)
 * console.log({light,dark});
 * // {
 * //   light: 'themeM3-#6750A4-#958DA5-#B58392-#939094.light.png',
 * //   dark: 'themeM3-#6750A4-#958DA5-#B58392-#939094.dark.png'
 * // }
 */
export function generateScreenshotsFileNames(coreColor,fileNamePrefix="themeM3"){
  const sJoined = Object.values(coreColor).map(val => val.toUpperCase()).join('-');
  const prefix = `${fileNamePrefix}-${sJoined}`;
  /** @type {string} */
  let light = `${prefix}.light.png`;
  /** @type {string} */
  let dark= `${prefix}.dark.png`;
  return {light,dark}
}

/**
 * Get / Extract CoreColors from the filename function above
 * @param oInputFileNames {{light:string,dark:string}|string}
 * @return {MaterialThemeCoreColors}
 */
export function getCoreColorFromFileNames(oInputFileNames){
  /* checking input is string or object */
  let fileNameToParse;
  if(typeof oInputFileNames === 'string'){
    fileNameToParse = oInputFileNames
  }else{
    fileNameToParse = oInputFileNames?.light || oInputFileNames?.dark;//todo validate
  }
  /**
   *  extract the core colors from the file name
   *  primary, secondary, tertiary, neutral
   *  i.e.
   *  input: themeM3-#6750A4-#958DA5-#B58392-#939094.light.png
   *  returns: {primary: '#6750A4', secondary: '#958DA5', tertiary: '#B58392', neutral: '#939094'}
   */
    //todo validate
    //removed the .png or .light.png, etc. then split by - to get the core colors
  const aSplit = fileNameToParse.split('.')[0].split('-');
  const aCoreColors = aSplit.slice(1,5);
  const oCoreColors = {
    primary: aCoreColors[0],
    secondary: aCoreColors[1],
    tertiary: aCoreColors[2],
    neutral: aCoreColors[3]
  }
  return oCoreColors;
}
export default {CreateScreenshots}