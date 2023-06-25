/**
 yarn add mocha -D

 package.json
 "imports": {
    "##/*": {
      "default": "./*"
    },
  },
 "type": "module",

 jsconfig.json
 {
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "##/*": ["./*"]
    }
  },
  "exclude": ["node_modules", ".nuxt", "dist"]
}



 */
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// const assert = require('assert');
// const {describe,it} = require('mocha');
import assert from 'node:assert';
import { describe, it} from 'mocha';
/*
1.
yarn add mocha @babel/polyfill @babel/register @babel/preset-env babel-plugin-module-resolver --dev
yarn add @babel/core --dev
2.
-r @babel/register -r babel-plugin-module-resolver

3.
.babelrc
{

  "presets": ["@babel/preset-env"],
  "plugins": [
    ["module-resolver", {
      "root": ["./src"],
      "alias": {
        "test": "./test",
        "underscore": "lodash",

        "~": "./"
      }
    }]
  ]

}
test specific timeout
this.timeout(500);//500ms
*/
/**
 * Should put this somewhere safe
 * todo filepath needs to be initialized as well...
 * @param fileName .json
 * @param data will automatically be changed
 */
import fs from 'node:fs';
import {
  createBrowserForScreenshot,
  CreateScreenshots, DefaultsCreateScreenshots, DefaultViewPort,
  getCoreColorFromFileNames
} from "#src/create-screenshots/create-screenshots.mjs";
import {ViewPort1080p, ViewPort8k} from "##/lib/pupp-consts/viewPortsConstants.mjs";
import {DefaultCoreColors, sampleCoreColorsTheme} from "##/lib/materialDesignThemeColorConstants.mjs";
import {rmAllFilesFromDir} from "##/lib/node-file-utils/index.mjs";
import {initBrowserForPuppeteerCore} from "##/lib/import-material-theme-pup.test.utils.mjs";
import {runPuppeteerWithBrowser} from "#src/import-material-theme-pup.mjs";
import puppeteer from "puppeteer";
import {CoreColorsScreenShotList} from "##/lib/MaterialDesignThemeColorsList.mjs";
import {generateScreenshotsFileNames} from "#src/create-screenshots/generateScreenshotsFileNames.js";
function writeToFile(fileName,data,space=2){
  const sFileName = /\./.test(fileName) ? fileName : fileName + '.json';
  const filePath = `dev/pbs/test/${sFileName}`
  fs.writeFileSync(filePath,
    typeof data === 'string' ? data :JSON.stringify(data,null,+space)
  );
}
/**
 * Main Runner
 * Clears out the folder first
 * doesn't cache yet
 */
describe('create-screenshots.test.mjs - Main Runner', function(){
  /* Inputs */
  let coreColors=[DefaultCoreColors];
  coreColors = CoreColorsScreenShotList
  // coreColors=[sampleCoreColorsTheme,DefaultCoreColors];
  let browser;
  //--
  const outFolderPath = DefaultsCreateScreenshots.outFolderPath;
  let createScreenshots;
  let headless = 'new';
  // headless = false;
  before(async function(){
    this.timeout(10000);
    //rm all files from dir: /temp/create-screenshots
    fs.mkdirSync(outFolderPath, { recursive: true});
    rmAllFilesFromDir(outFolderPath);
    createScreenshots = new CreateScreenshots(coreColors,browser);

  });
  /**
   * Outputs three files
   * <prefix>.dark.png
   * <prefix>.light.png
   * <prefix>.json
   */
  it('runAllInitAndScreenshotsJSON', async function(){
    this.timeout(100000);
    await CreateScreenshots.runAllInitAndScreenshotsJSON(createScreenshots,headless)
    browser = createScreenshots.browser;
    //assert the titles
  });
  /** can skip this */
  it('runInitAndScreenshotsJSON', async function(){
    return true;
    this.timeout(100000);
    await CreateScreenshots.runInitAndScreenshotsJSON(createScreenshots,headless)
    browser = createScreenshots.browser;
    //assert the titles
  });
    /** can skip this */
  it('Single CreateScreenshots init and takeScreenshots', async function(){
    return true;
    this.timeout(100000);
    await CreateScreenshots.runInitAndScreenshots(createScreenshots,headless)
    browser = createScreenshots.browser;
    //assert the titles
  });
  /** can skip this? i dont think it'll be the same */
  it('Multi runAllInitAndScreenshots', async function(){
    return true;
    this.timeout(100000);
    await CreateScreenshots.runAllInitAndScreenshots(createScreenshots,headless)
    browser = createScreenshots.browser;
    //assert the titles
  });
  after(async function(){
    if(browser.close){
      await browser.close();
    }
  });
});

/**
 * Very similar to import-material-theme-pup.test.mjs
 *
 * mkdir temp/create-screenshots
 * mkdir -p temp/create-screenshots
 */
describe('create-screenshots.test.mjs - debug', function(){
  /* Inputs */
  let coreColors=[DefaultCoreColors];
  let browser;
  /*-*/
  let headless = 'new';//new persists? is that why
  // headless = false;
  const outFolderPath = DefaultsCreateScreenshots.outFolderPath;
  let viewPort = DefaultViewPort;
  // viewPort ={
  //   width: 1920,height: 1080, deviceScaleFactor:1,
  // }
  const timeout = 5000;
  let createScreenshots;
  let page;
  before(async function(){
    this.timeout(10000);
    //rm all files from dir: /temp/create-screenshots
    fs.mkdirSync(outFolderPath, { recursive: true});
    rmAllFilesFromDir(outFolderPath);
    //
    // browser =
    // browser = await initBrowserForPuppeteerCore(headless,viewPort);//generaly dont need for screenshots
    // browser = await initBrowserForPuppeteerCore(headless);
    browser = await createBrowserForScreenshot(headless);
    const pages = await browser.pages();
    if(pages.length > 0){
      page = pages[0];
      //mk when it's not 1
      console.assert(pages.length === 1,'pages length: ' +pages.length);

    }else{
      console.debug("new page");
      page = await browser.newPage();
    }
    // page = await browser.newPage();
    // if(headless !== false){
    //   const pages = await browser.pages();
    //   page = pages[0];
    // }else{
    //   //wait what... im so confused
    //   console.log('new page');
    //   // page = await browser.newPage();
    // }
    // await page.goto('https://m3.material.io/theme-builder#/custom?primary=#cba642');
    // await page.waitForNavigation({timeout})
    // const title = await page.title()
    // assert.strictEqual(title, 'Material Design');//maybe surround with try catch

    //---
    // createScreenshots = new CreateScreenshots(coreColors,browser,viewPort);
    createScreenshots = new CreateScreenshots(coreColors);
  });
  it('CreateScreenshots validate before()', async function(){
    this.timeout(-1);
    // const [pageFirst] = await browser.pages();//add
    // const title = await page.title();
    // assert.strictEqual(title, 'Material Design');
    // console.log(ViewPort8k);
  });
  it('CreateScreenshots viewport', async function(){
    this.timeout(100000);
    if(headless !== false){
      return assert.ok(true)
    }
    return assert.ok(true);//add env variable
    // await page.goto("file:///C:/Users/Jason/WebstormProjects/material-design-3-import-export-ext/dev/shadow-dom-exp/shadow-dom-playground.html")
    await page.goto("https://m3.material.io/theme-builder#/custom?primary=#cba642");
    page.screenshot({path: 'temp/screenshot.png',fullPage: true });//this looks funny
    page.screenshot({path: 'temp/create-screenshot.png',fullPage: false });//this is good
    console.log('CreateScreenshots debug viewport');
    // await new Promise(resolve => setTimeout(resolve, 500000));
    //so this functions creates a new page...
    // const targetPage = await runPuppeteerWithBrowser(DefaultCoreColors,browser);
    // await targetPage.screenshot({path: 'temp/create-screenshot.png',fullPage: true });
  });
  /**
   * basically i think it's
   * puppeteer.launch without anything except headless new and other args
   * fullPage: false
   */
  it('CreateScreenshots single validate', async function(){
    this.timeout(100000);
    //so this functions creates a new page...
    // const targetPage = await runPuppeteerWithBrowser(DefaultCoreColors,browser,viewPort);
    const targetPage = await runPuppeteerWithBrowser(DefaultCoreColors,browser);
    await targetPage.screenshot({path: 'temp/create-screenshot.dark.png',fullPage: false });
    const toggleBtn = await targetPage.waitForSelector(
      [
        'body > mio-root > mio-theme-builder > theme-builder',
        'main > root-page',
        'main > header > div.row.section.header-right > mwc-icon-button:nth-child(2)',
        'button'
      ]
        .join('>>>'),//for pupp... need to use >>>?
      // .join(','),
      {timeout:5000});
    // console.log("click",toggleBtn);
    await toggleBtn.click();
    await targetPage.screenshot({path: 'temp/create-screenshot.light.png',fullPage: false });
  });
  it('CreateScreenshots init and takeScreenshots', async function(){
    this.timeout(100000);
    //so this functions creates a new page...
    // const targetPage = await runPuppeteerWithBrowser(DefaultCoreColors,browser,viewPort);
    await CreateScreenshots.runInitAndScreenshots(createScreenshots,headless)
    //assert the titles
  });
  it('saveJSONAfterScreenshot', async function(){
    this.timeout(100000);
    const prefix = 'themeM3-#6750A4-#958DA5-#B58392-#939094';
    assert.ok(prefix);
    const jsonStringify = {
      space:0
    }
    jsonStringify.space = 0;
    jsonStringify.space = 2;
    // await createScreenshots.saveJSONAfterScreenshot(DefaultCoreColors)
    // await createScreenshots.saveJSONAfterScreenshot(DefaultCoreColors,'themeM3-#6750A4-#958DA5-#B58392-#939094')
    await createScreenshots.saveJSONAfterScreenshot(DefaultCoreColors,{prefix,jsonStringify})
  });
  after(async function(){
    if(browser.close){
      await browser.close();
    }
  });
});

describe('create-screenshots.test.mjs - single', function(){
  /* Inputs */
  let coreColors=[DefaultCoreColors];
  let browser;
  //--
  const outFolderPath = DefaultsCreateScreenshots.outFolderPath;
  let createScreenshots;
  let headless = 'new';
  before(async function(){
    this.timeout(10000);
    //rm all files from dir: /temp/create-screenshots
    fs.mkdirSync(outFolderPath, { recursive: true});
    rmAllFilesFromDir(outFolderPath);
    createScreenshots = new CreateScreenshots(coreColors);
  });
  it('CreateScreenshots init and takeScreenshots', async function(){
    this.timeout(100000);
    await CreateScreenshots.runInitAndScreenshots(createScreenshots,headless)
    //assert the titles
  });
  after(async function(){
    if(browser.close){
      await browser.close();
    }
  });
});

/**
 * Just Testing and checking default settings needed
 */
describe('create-screenshots.test.mjs constructor', function(){
  it('CreateScreenshots defaults', async function(){
    //this.timeout(500);
    const createScreenshots = new CreateScreenshots([],null)
    assert.deepStrictEqual(createScreenshots.viewPort, ViewPort8k);
    console.log(createScreenshots);
  });
  it('CreateScreenshots viewport 1080p', async function(){
    //this.timeout(500);
    const inputViewPort = ViewPort1080p;
    const createScreenshots = new CreateScreenshots([],null, inputViewPort)
    assert.deepStrictEqual(createScreenshots.viewPort, inputViewPort);
  });
});
describe('create-screenshots.test.mjs generic tests', function(){

  /**
   * based on color scheme... have dark mode and light mode
   */
  it('generateScreenshotsFileNames', function(){
    //this.timeout(500);
    let inputColor = DefaultCoreColors
    let expected = {
      light:'themeM3-#6750A4-#958DA5-#B58392-#939094.light.png',
      dark:'themeM3-#6750A4-#958DA5-#B58392-#939094.dark.png',
    };
    const actual = generateScreenshotsFileNames(inputColor);
    assert.deepStrictEqual(actual, expected);

  });
  it('generateScreenshotsFileNames custom', function(){
    //this.timeout(500);
    let inputColor = sampleCoreColorsTheme;
    let expected = {
      light:'themeM3-#6750A4-#958DA5-#B58392-#939094.light.png',
      dark:'themeM3-#6750A4-#958DA5-#B58392-#939094.dark.png',
    };
    const actual = generateScreenshotsFileNames(inputColor);
    //lazy assert
    assert.notDeepStrictEqual(actual, expected);

  });
  it('getCoreColorFromFileNames', function(){
    //this.timeout(500);
    let inputObj = {
      light:'themeM3-#6750A4-#958DA5-#B58392-#939094.light.png',
      dark:'themeM3-#6750A4-#958DA5-#B58392-#939094.dark.png',
    };
    const expected = DefaultCoreColors;
    /** @type {MaterialThemeCoreColors} */
    let actual
    actual = getCoreColorFromFileNames(inputObj);
    assert.deepStrictEqual(actual, expected);
    actual = getCoreColorFromFileNames(inputObj.dark);
    assert.deepStrictEqual(actual, expected);
    actual = getCoreColorFromFileNames(inputObj.light);
    assert.deepStrictEqual(actual, expected);

  });
  it('add json', function(){
    //this.timeout(500);//todo
    const inputPath = 'temp/create-screenshot.png';
    // const fileStats = fs.fstatSync(inputPath);
    // const fileStats = fs.statSync(inputPath);//no
    // const fileStats = fs.lstatSync(inputPath);//no
    // console.log(fileStats);
  });

    it('validate png size', function(){
    //this.timeout(500);//todo
    const inputPath = 'temp/create-screenshot.png';
    // const fileStats = fs.fstatSync(inputPath);
    // const fileStats = fs.statSync(inputPath);//no
    // const fileStats = fs.lstatSync(inputPath);//no
    // console.log(fileStats);
  });

});