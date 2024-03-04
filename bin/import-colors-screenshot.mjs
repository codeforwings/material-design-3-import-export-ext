/**
 * https://m3.material.io/theme-builder#/custom?primary=#cba642
 */
import {DefaultCoreColors} from "##/lib/materialDesignThemeColorConstants.mjs";
import fs from "node:fs";
import {initBrowserForPuppeteerCore} from "##/lib/import-material-theme-pup.test.utils.mjs";
import {runPuppeteerWithBrowser} from "#src/import-material-theme-pup.mjs";
function coolors_co_importer(coolorsCoUrl){
  const lines = coolorsCoUrl.split('/').pop().split('-');
  return {
    primary: '#' + lines[0],
    secondary: '#' + lines[1],
    tertiary: '#' + lines[2],
    neutral: '#' + lines[3]
  }

}
try{
  let inColors;
  // inColors = DefaultCoreColors;
  /**
   * #1E1E1E background
   * #FFFFFF text
   */
  inColors = {

    "primary": "#1e1e1e",
    "secondary": "#f5f5f5",
    "tertiary": "#e8e8e8",
    "neutral": "#ffffff"

  }
  inColors = coolors_co_importer("https://coolors.co/visualizer/1e1e1e-ffffff-e8e8e8-f5f5f5")
// #1e1e1e, #ffffff, #e8e8e8, #f5f5f5
  console.log(inColors);

  fs.mkdirSync('temp', { recursive: true});
  fs.existsSync('temp/screenshot.png')
  && fs.renameSync('temp/screenshot.png','temp/screenshot.tmp.png')
  let headless
  headless = 'new';
// headless = false;
  /** @typedef {import('puppeteer').Viewport} ViewPort */
  let viewPort8k = {
    width: 3840,//this takes a while to run though...
    height: 2400,
    deviceScaleFactor: 2,//makes it 7680x4800
  }
  viewPort8k.deviceScaleFactor = 0.5;//makes it 1920x1200
  const browser = await initBrowserForPuppeteerCore(headless);
  /**
   * @type {Page}
   */
  let page = await runPuppeteerWithBrowser(inColors,browser);
  // let page = await runPuppeteerWithBrowser(sampleCoreColorsTheme,browser);
// let page = await runPuppeteerWithBrowser(inColors,browser,viewPort8k);//not sure why background is purple
  await page.screenshot({path: 'temp/screenshot.png',fullPage: true });
  fs.existsSync('temp/screenshot.tmp.png') && fs.unlinkSync('temp/screenshot.tmp.png');
  if(headless === false){//wait for 5 seconds if not headless
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
  await browser.close();
}catch (err) {
  console.error(err);
}


const test = [
  {
    "hex": "#1e1e1e",
    "name": "Dark gray",
    "desc": "Primary text/heading color"
  },
  {
    "hex": "#f5f5f5",
    "name": "Light gray",
    "desc": "Secondary text color"
  },
  {
    "hex": "#e8e8e8",
    "name": "Medium gray",
    "desc": "Muted accent"
  },
  {
    "hex": "#ffffff",
    "name": "White",
    "desc": "Primary background color"
  }
]
