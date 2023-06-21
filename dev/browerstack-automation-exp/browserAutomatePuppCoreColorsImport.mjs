/**
 * Duckduck go example from browserstack
 * with updated to windows. and using env vars for secret
 * refactoring. confirmed this worked
 */
// import puppeteer from "puppeteer";
import {connect} from "puppeteer";
import {config} from "dotenv";
import {expect} from "chai";
import {PuppeteerRunnerExtension} from "@puppeteer/replay";
import { createRunner, parse} from '@puppeteer/replay';
import fs from 'node:fs';
import {generatePuppeteerJSON} from "#src/generate-pupp-json.mjs";
import {sampleCoreColorsTheme} from "##/lib/materialDesignThemeConstants.mjs";
import {runPuppeteerWithBrowser} from "#src/import-material-theme-pup.mjs";
config();
export const DefaultProjectBrowerStackCaps = {
  'browser': 'chrome',  // You can choose `chrome`, `edge` or `firefox` in this capability
  'browser_version': 'latest',  // We support v83 and above. You can choose `latest`, `latest-beta`, `latest-1`, `latest-2` and so on, in this capability
  'os': 'os x',
  'os_version': 'Ventura',
  //https://www.browserstack.com/automate/capabilities
  // "os" : "Windows",
  // "osVersion" : "11",
  "tz": "America/New_York",
  //https://www.browserstack.com/docs/automate/puppeteer/change-screen-resolution
  "resolution": "1920x1080",//leaving this one alone
  'build': 'material-design-3-import-export-ext-build-1',
  'name': 'Import CoreColors From JSON',  // The name of your test and build. See browserstack.com/docs/automate/puppeteer/organize tests for more details
  // 'browserstack.username': process.env.BROWSERSTACK_USERNAME,
  // 'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY,
  'browserstack.username': process.env.BROWSERSTACK_USERNAME,
  'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY,
};

/**
 * Refactored from their duck duck go example from cjs to mjs
 * @param browserStackCaps
 * @return {Promise<void>}
 */
export async function demoDuckDuckGo(browserStackCaps = DefaultProjectBrowerStackCaps){
// The BrowserStack CDP endpoint gives you a `browser` instance based on the `caps` that you specified
  const browserWSEndpoint
    = `wss://cdp.browserstack.com/puppeteer?caps=${encodeURIComponent(JSON.stringify(browserStackCaps))}`;
  // const browser = await puppeteer.connect({browserWSEndpoint});
  const browser = await connect({browserWSEndpoint});
  /*
  *  The BrowserStack specific code ends here. Following this line is your test script.
  *  Here, we have a simple script that opens duckduckgo.com, searches for the word BrowserStack and asserts the result.
  */
  const page = await browser.newPage();
  await page.goto('https://www.duckduckgo.com');
  const element = await page.$('[name="q"]');
  await element.click();
  await element.type('BrowserStack');
  await element.press('Enter');
  await page.waitForNavigation();
  const title = await page.title('');
  console.log(title);
  try {
    expect(title).to.equal("BrowserStack at DuckDuckGo", 'Expected page title is incorrect!');
    // following line of code is responsible for marking the status of the test on BrowserStack as 'passed'. You can use this code in your after hook after each test
    await page.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'Title matched'}})}`);
  } catch {
    await page.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: 'Title did not match'}})}`);
  }
  await browser.close();
}

/**
 * Main Function for importing core colors from json. and automating using browserstack
 * Only the json for now... no screenshots / yet
 * @param jsonFilePath {string}
 * @param browserStackCaps {object}
 * @return {Promise<void>}
 */
export async function importJsonCoreColors(jsonFilePath='docs/src/public/puppJsonReplay/import-colors.json',browserStackCaps = DefaultProjectBrowerStackCaps){
  const browserWSEndpoint
    = `wss://cdp.browserstack.com/puppeteer?caps=${encodeURIComponent(JSON.stringify(browserStackCaps))}`;
  // const browser = await puppeteer.connect({browserWSEndpoint});
  const browser = await connect({browserWSEndpoint});
  /*
   *  The BrowserStack specific code ends here. Following this line is your test script.
   *  Here, we have a simple script that opens duckduckgo.com, searches for the word BrowserStack and asserts the result.
   */
  const page = await browser.newPage();
  const ext = new PuppeteerRunnerExtension(browser, page,{timeout: 5000});
  // /** @type {string} - JSON */
  // const recordingText = fs.readFileSync(jsonFilePath, 'utf8').toString();
  // Validate & parse the file.
  // /** @type {UserFlow} - JSON recording */
  // const recording = parse(JSON.parse(recordingText));
  const viewPorts = {
    //arg viewport. fix when done

    width: 1920, height: 1080, deviceScaleFactor: 1,//higher density, looks odd though
    // width: 1024, height: 728, deviceScaleFactor: 1,//higher density, looks odd though
    // width: 3840, height: 2400, deviceScaleFactor: 2,//higher density, looks odd though
  }
  const jsonStepsTitle = generatePuppeteerJSON(sampleCoreColorsTheme,viewPorts)
  const recording = parse(jsonStepsTitle);
  // Create a runner and execute the script.
  const runner = await createRunner(recording,ext);
  const didStepsAllExecute = await runner.run();
  if(didStepsAllExecute){
    //quick and dirty
    await page.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'All steps executed'}})}`);
  }else{
    await page.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: 'Failed to execute all steps'}})}`);
  }
  //look at screenshots
  await browser.close();
}

/**
 * Trying to see if performance increases....
 * 36 seconds... which makes a lot more sense
 * @param browserStackCaps
 * @return {Promise<void>}
 */
export async function puppDirectly(browserStackCaps = DefaultProjectBrowerStackCaps){
  const browserWSEndpoint
    = `wss://cdp.browserstack.com/puppeteer?caps=${encodeURIComponent(JSON.stringify(browserStackCaps))}`;
  // const browser = await puppeteer.connect({browserWSEndpoint});
  const browser = await connect({browserWSEndpoint});
  // const [page] = browser.pages();//i get a feeling this aint puppeteer
  const page = await browser.newPage();

  const viewPorts = {
    //arg viewport. fix when done

    width: 1920, height: 1080, deviceScaleFactor: 1,//higher density, looks odd though
    // width: 1024, height: 728, deviceScaleFactor: 1,//higher density, looks odd though
    // width: 3840, height: 2400, deviceScaleFactor: 2,//higher density, looks odd though
  }
  try{
    let pagef = await runPuppeteerWithBrowser(sampleCoreColorsTheme,browser,viewPorts)
    await page.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'All steps executed'}})}`);

  }catch (e) {
    await page.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: 'Failed to execute all steps'}})}`);

  }finally {
    await browser.close();
  }


}
