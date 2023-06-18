// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// import assert from 'node:assert';
import { describe, it} from 'mocha';
import fs from 'node:fs';
function writeToFile(fileName,data,space=2){
  const sFileName = /\./.test(fileName) ? fileName : fileName + '.json';
  const filePath = `dev/pbs/test/${sFileName}`
  fs.writeFileSync(filePath,
    typeof data === 'string' ? data :JSON.stringify(data,null,+space)
  );
}
import puppeteer from "puppeteer-core";
import {runPuppeteerWithBrowser} from "../src/import-material-theme-pup.mjs";

import { Browser, Page } from 'puppeteer-core';
import {sampleCoreColorsTheme} from "../lib/materialDesignThemeConstants.mjs";

/**
 * Runs Puppeteer with a specific version of Chrome.
 * Hardcoded for now. used for testing
 * @returns {Promise<Browser>}
 */
async function initBrowserForPuppeteerCore(headless=false){

  let browser;
  let executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  if (process.platform === 'win32') {
    executablePath = "/Program\ Files/Google/Chrome/Application/chrome.exe"//works..
  }
  browser = await puppeteer.launch({
    // headless: false,
    headless,
    executablePath,
    userDataDir: "/c/selenium/ChromeProfile",
    profileDirectory: "Profile 1",
    ignoreDefaultArgs: ["--disable-extensions"],//this seems to be good. not sure what --enable-automation is though
    args: [
      "--load-extension=/selenium/ChromeProfile/Profile\ 1/Extensions/cjpalhdlnbpafiamejdnhcphjbkeiagm/1.48.4_0",
    ]
  });
  return browser;


}
describe('import-material-theme-pup.test.mjs', function(){
  it('runPuppeteerWithBrowser', async function(){
    this.timeout(10000);
      try{

        // const browser = await initBrowserForPuppeteerCore();
        const browser = await initBrowserForPuppeteerCore('new');
        /**
         * @type {Page}
         */
        let page = await runPuppeteerWithBrowser(sampleCoreColorsTheme,browser);
        await page.screenshot({path: 'temp/screenshot.png'});
        console.log('screenshot');
        await new Promise(resolve => setTimeout(resolve, 5000));
        await browser.close();

      }catch (err) {
        // console.error(err);
        // process.exit(1);
        throw err;
      }
  });
});
