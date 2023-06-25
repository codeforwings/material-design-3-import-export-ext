/**
 * Using puppeteer, create screenshots of the core colors
 */

import {ViewPort8k} from "##/lib/pupp-consts/viewPortsConstants.mjs";
import {DefaultCoreColors} from "##/lib/materialDesignThemeColorConstants.mjs";
import puppeteer from "puppeteer";
import {runPuppeteerWithBrowser} from "#src/import-material-theme-pup.mjs";
import {join} from "node:path";
import {writeFileSync} from "node:fs";
import {runPuppeteerPage} from "#src/create-screenshots/import-pupp-page.mjs";
import {generatePuppeteerJSON} from "#src/generate-pupp-json/generate-pupp-json.mjs";
import {generateScreenshotsFileNames} from "#src/create-screenshots/generateScreenshotsFileNames.mjs";
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
    timeout:5000,/* {timeout:this.options.timeout} */

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
  //i think right now browser and viewport are neglected. fix later
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
    this._currentCoreColorIndex = undefined;
  }

  incrementCoreColorIndex(){
    this._currentCoreColorIndex++;
  }
  get coreColor(){
    // if(typeof this.currentCoreColorIndex === "undefined"){
    //   this.currentCoreColorIndex = 0;
    // }
    return this.coreColors[this._currentCoreColorIndex];
  }
  async init(headless='new'){
    const browser = this.browser ?? await createBrowserForScreenshot(headless);//quick and dirt
    this.browser = browser;
    const {coreColors} = this;
    this.page = await runPuppeteerWithBrowser(coreColors[0],browser);
    this._currentCoreColorIndex = 0;
    return this.page;
  }

  /**
   *
   * @param fullPage {boolean} - Page.screenshot options
   * @return {Promise<{string}>} - FileName Prefix. i.e. themeM3-#6750A4-#958DA5-#B58392-#939094
   */
  async takeScreenshots(fullPage=true){
    //validate theme... assuming dark for now. have the function
    //also can cache a lot of these, and also currentCoreColor
    const page = this.page;
    const themeToggleBtnEle = await page.waitForSelector(ThemeBtnSelectorPuppeteer,
      {timeout:this.options.timeout});
    this.themeToggleBtnEle = themeToggleBtnEle;
    let {light,dark,prefix} = generateScreenshotsFileNames(this.coreColor);//todo, prefix by name?
    let path;
    // path = dark;
    path = join(this.options.outFolderPath, dark);
    await page.screenshot({path,fullPage });
    await themeToggleBtnEle.click();//fullPage seems to work now...? so odd
    // path = light;
    path = join(this.options.outFolderPath, light);
    await page.screenshot({path,fullPage });
    return {prefix,coreColor:this.coreColor};//filename prefix
  }

  get defaultSaveJSOnAfterScreenshotOptions(){
    return {prefix:undefined,jsonStringify:{space:0},viewPortStep:undefined}
  }
  /**
   * Assumes passed after createScreenshots.init()
   * @param coreColor {object}- can technically be generated from coreColor, can be defaulted
   * @param prefix {string} - can be generated from coreColor... make smarter later
   * @param options {object} - {viewPortStep:null}
   * @Example
   * await createScreenshots.saveJSONAfterScreenshot(coreColor,prefix)
   * await createScreenshots.saveJSONAfterScreenshot(DefaultCoreColors,'themeM3-#6750A4-#958DA5-#B58392-#939094')
   */
  saveJSONAfterScreenshot(coreColor=undefined,options={prefix:undefined,jsonStringify:{space:0},viewPortStep:undefined}){
    const actual = {...this.defaultSaveJSOnAfterScreenshotOptions,...options}
    coreColor = coreColor ?? this.coreColor;//this could almost be a static function
    const prefix = actual.prefix ?? generateScreenshotsFileNames(coreColor).prefix;
    const outPath = join(this.options.outFolderPath,`${prefix}.json`);
    const puppJSON = generatePuppeteerJSON(coreColor,actual.viewPortStep,prefix)
    // writeFileSync(outPath,JSON.stringify(puppJSON,null,2))
    writeFileSync(outPath,JSON.stringify(puppJSON,null,+actual.jsonStringify.space))

  }
  // generatePuppeteerJSON(){
  //
  // }

  /**
   * Changes the page to the coreColor by its index
   * dont want to overcomplicate this right now
   * @param index
   * @return {Promise<void>}
   */
  async setPageToColorIndex(index=this._currentCoreColorIndex){
    this._currentCoreColorIndex = index;
    //maybe have a cache / check if already have screenshot... kinda separate function imo
    await runPuppeteerPage(this.coreColor,this.page);
  }

  /**
   * Takes only the single screenshot of the first one
   * Expected to be run inside of create-screen-test.mjs
   * @param createScreenshots {CreateScreenshots}
   * @param headless {boolean|'new'}
   * @Example
   * await CreateScreenshots.runInitAndScreenshots(createScreenshots,headless)
   * create-screen-shots.test.mjs
   */
  static async runInitAndScreenshots(createScreenshots,headless='new'){
    await createScreenshots.init(headless);
    await createScreenshots.takeScreenshots();
    //close browser outside...
  }

  /**
   * Takes screenshots of all the core colors. based on the name?
   * @param createScreenshots
   * @param headless
   * @return {Promise<void>}
   */
  static async runInitAndScreenshotsJSON(createScreenshots,headless='new'){
    await createScreenshots.init(headless);
    const {coreColor,prefix} = await createScreenshots.takeScreenshots();
    createScreenshots.saveJSONAfterScreenshot(coreColor, {prefix})
    //close browser outside...
  }

  /**
   * Takes screenshots of all the core colors
   * Expected to be run inside of create-screen-test.mjs
   * @param createScreenshots
   * @param headless
   * @return {Promise<void>}
   */
  static async runAllInitAndScreenshots(createScreenshots,headless='new'){
    /* first entry */
    await createScreenshots.init(headless);
    await createScreenshots.takeScreenshots();
    await createScreenshots.themeToggleBtnEle.click();//revert back to dark theme

    createScreenshots.incrementCoreColorIndex();//quick and dirty
    for (let i = 1; i < createScreenshots.coreColors.length; i++) {
      //should probably check screenshot cache here
      await createScreenshots.setPageToColorIndex(i);
      await createScreenshots.takeScreenshots();
      await createScreenshots.themeToggleBtnEle.click();//might be okay at the start...

      createScreenshots.incrementCoreColorIndex();//quick and dirty. go to next color

    }
  }
  static async runAllInitAndScreenshotsJSON(createScreenshots,headless='new'){
    /* first entry */
    {
      await createScreenshots.init(headless);
      const {coreColor,prefix} = await createScreenshots.takeScreenshots();
      await createScreenshots.themeToggleBtnEle.click();
      createScreenshots.saveJSONAfterScreenshot(coreColor, {prefix});
    }

    createScreenshots.incrementCoreColorIndex();//quick and dirty
    for (let i = 1; i < createScreenshots.coreColors.length; i++) {
      //should probably check screenshot cache here
      await createScreenshots.setPageToColorIndex(i);
      const {coreColor,prefix} = await createScreenshots.takeScreenshots();
      await createScreenshots.themeToggleBtnEle.click();
      createScreenshots.saveJSONAfterScreenshot(coreColor, {prefix});
      createScreenshots.incrementCoreColorIndex();//quick and dirty

    }
  }
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