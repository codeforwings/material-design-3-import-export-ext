/**
 * For running in the browser. and rolling up
 * oh... it only allows json? an dno js?
 */
import puppeteer from "puppeteer";
import {Browser,Page} from "puppeteer";
// /** @type {Browser} */
// let browser;
import {runPuppeteerWithBrowser} from "##/src/import-material-theme-pup.mjs";
import {sampleCoreColorsTheme} from "##/lib/materialDesignThemeConstants.mjs";
// import {sampleCoreColorsTheme} from "##/lib/materialDesignThemeConstants.mjs";

// runPuppeteerWithBrowser(sampleCoreColorsTheme,browser);
async function main(){

  const browser = await puppeteer.launch();
  await runPuppeteerWithBrowser(sampleCoreColorsTheme,browser);
  // await browser.close();

}
main();