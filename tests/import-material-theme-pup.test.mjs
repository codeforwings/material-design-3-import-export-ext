// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
import assert from 'node:assert';
import { describe, it} from 'mocha';
import fs from 'node:fs';
function writeToFile(fileName,data,space=2){
  const sFileName = /\./.test(fileName) ? fileName : fileName + '.json';
  const filePath = `dev/pbs/test/${sFileName}`
  fs.writeFileSync(filePath,
    typeof data === 'string' ? data :JSON.stringify(data,null,+space)
  );
}
// import puppeteer from "puppeteer-core";
import { Browser, Page } from 'puppeteer-core';
import {DefaultCoreColors, defaultFromMaterials, sampleCoreColorsTheme} from "../lib/materialDesignThemeConstants.mjs";
import {initBrowserForPuppeteerCore, testExportCoreColors} from "../lib/import-material-theme-pup.test.utils.mjs";
import {runPuppeteerWithBrowser} from "##/src/import-material-theme-pup.mjs";
import {exportCoreColorsUsingChrome} from "##/src/index.mjs";

describe('import-material-theme-pup.test.mjs', function(){
  /**
   * Also takes a screenshot... need to assert somehow
   */
  it('runPuppeteerWithBrowser headless', async function(){
    this.timeout(10000);
      try{

        // const browser = await initBrowserForPuppeteerCore();
        //screenshot stuff
        fs.mkdirSync('temp', { recursive: true});
        fs.existsSync('temp/screenshot.png')
          && fs.renameSync('temp/screenshot.png','temp/screenshot.tmp.png')
        let headless
        headless = 'new';
        const browser = await initBrowserForPuppeteerCore('new');
        /**
         * @type {Page}
         */
        let page = await runPuppeteerWithBrowser(sampleCoreColorsTheme,browser);
        await page.screenshot({path: 'temp/screenshot.png'});
        if(headless === false){//wait for 5 seconds if not headless
          await new Promise(resolve => setTimeout(resolve, 5000));
        }
        await browser.close();
        assert.ok(fs.existsSync('temp/screenshot.png'));//maybe should check if updated, also create folder
        fs.existsSync('temp/screenshot.tmp.png') && fs.unlinkSync('temp/screenshot.tmp.png');

      }catch (err) {
        // console.error(err);
        // process.exit(1);
        throw err;
      }
  });

  /**
   * @example
   * const serializedFunction = exportCoreColorsUsingChrome.toString();
   * const deserializedFunction = eval(`(${serializedFunction})`);
   */
  it('serialize / stringify function',function(){
    const actual = exportCoreColorsUsingChrome.toString()
    assert.ok(/async function exportCoreColorsUsingChrome/.test(actual));//doesnt have export... good
    // console.log(actual);

  });
  it('testExportCoreColors headless', async function(){
    this.timeout(10000);
      try{

        // const browser = await initBrowserForPuppeteerCore();
        //screenshot stuff
        fs.mkdirSync('temp', { recursive: true});
        fs.existsSync('temp/screenshot.png')
          && fs.renameSync('temp/screenshot.png','temp/screenshot.tmp.png')
        let headless
        headless = 'new';
        const browser = await initBrowserForPuppeteerCore('new');
        /**
         *
         */
        let {page,colors} = await testExportCoreColors(browser);
        assert.deepStrictEqual(colors,DefaultCoreColors);
        // console.log(colors);

        /* screenshot and close */
        await page.screenshot({path: 'temp/screenshot.png'});
        if(headless === false){//wait for 5 seconds if not headless
          await new Promise(resolve => setTimeout(resolve, 5000));
        }
        await page.close();
        await browser.close();
        assert.ok(fs.existsSync('temp/screenshot.png'));//maybe should check if updated, also create folder
        fs.existsSync('temp/screenshot.tmp.png') && fs.unlinkSync('temp/screenshot.tmp.png');

      }catch (err) {
        // console.error(err);
        // process.exit(1);
        throw err;
      }
  });

});
