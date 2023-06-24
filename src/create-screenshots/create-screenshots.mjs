/**
 * Using puppeteer, create screenshots of the core colors
 */

import {ViewPort8k} from "##/lib/pupp-consts/viewPortsConstants.mjs";
import {DefaultCoreColors} from "##/lib/materialDesignThemeColorConstants.mjs";
import puppeteer from "puppeteer";
import {runPuppeteerWithBrowser} from "#src/import-material-theme-pup.mjs";

/**
 * Defaults for CreateScreenshots
 * or use a getter / _defaults
 */
/**
 * todo add typedef
 * @type {{outFolderPath: string}} document.querySelector("body > mio-root > mio-theme-builder > theme-builder").shadowRoot.querySelector("main")
 */
export const DefaultsCreateScreenshots = function(){
  return {
    outFolderPath:"temp/create-screenshots",//assuming folder assists atm.


  }
}();
export const ThemeBtnSelectorArray = [
        'body > mio-root > mio-theme-builder > theme-builder',
        'main > root-page',
        'main > header > div.row.section.header-right > mwc-icon-button:nth-child(2)',
        'button'
      ]
export const ThemeBtnSelectorPuppeteer = ThemeBtnSelectorArray.join('>>>');

export const DefaultViewPort = ViewPort8k;
// viewPort:ViewPort8k,
//browser
//coreColors
// console.log(DefaultsCreateScreenshots);

/**
 * Viewport might be common to change... so
 */
export class CreateScreenshots{
  constructor(coreColors=[DefaultCoreColors], browser, viewPort={...DefaultViewPort}, options) {
    // const actual = {coreColors,browser,options}
    this.coreColors = coreColors;
    this.browser = browser;
    this.viewPort = viewPort;
    this.options = {...DefaultsCreateScreenshots,...options};
    // custom
    /** @type {object} */
    this.page = undefined
    this.themeToggleBtnEle = undefined
  }
  async init(headless='new'){
    const browser = await createBrowserForScreenshot(headless);//quick and dirt
    const {coreColors} = this;
    this.page = await runPuppeteerWithBrowser(coreColors[0],browser);
    return this.page;
  }
  async takeScreenshots(){
    //validate theme... assuming dark for now. have the function
    //also can cache a lot of these
    const page = this.page;
    const themeToggleBtnEle = await page.waitForSelector(ThemeBtnSelectorPuppeteer,
      {timeout:5000});
    this.themeToggleBtnEle = themeToggleBtnEle;
    await page.screenshot({path: 'temp/create-screenshot.dark.png',fullPage: true });
    await themeToggleBtnEle.click();//fullPage seems to do the samething now... so odd
    await page.screenshot({path: 'temp/create-screenshot.light.png',fullPage: true });


  }

  runOne(coreColor){

  }
  runAll(){

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
export async function createBrowserForScreenshot(headless){
  const browser = await puppeteer.launch({
    // headless: false,
    headless,
    // executablePath,
    // defaultViewport,
    // userDataDir: "/c/selenium/ChromeProfile",
    // profileDirectory: "Profile 1",
    // ignoreDefaultArgs: ["--disable-extensions"],//this seems to be good. not sure what --enable-automation is though
    args: [
      // "--load-extension=/selenium/ChromeProfile/Profile\ 1/Extensions/cjpalhdlnbpafiamejdnhcphjbkeiagm/1.48.4_0",
      //apparently disable some security features
      "--browser-test",
      "--hide-crash-restore-bubble",
      "--no-sandbox",
      "--disable-setuid-sandbox",
    ]
  });
  return browser;
}
export default {CreateScreenshots}